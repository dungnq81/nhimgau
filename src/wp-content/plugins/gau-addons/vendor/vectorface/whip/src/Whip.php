<?php

/*
The MIT License (MIT)

Copyright (c) 2015 Vectorface, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

namespace Vectorface\Whip;

use InvalidArgumentException;
use Psr\Http\Message\ServerRequestInterface;
use Vectorface\Whip\IpRange\IpWhitelist;
use Vectorface\Whip\Request\Psr7RequestAdapter;
use Vectorface\Whip\Request\RequestAdapter;
use Vectorface\Whip\Request\SuperglobalRequestAdapter;

/**
 * A class for accurately looking up a client's IP address.
 * This class checks a call time configurable list of headers in the $_SERVER
 * superglobal to determine the client's IP address.
 * @copyright Vectorface, Inc 2015
 * @author Daniel Bruce <dbruce1126@gmail.com>
 * @author Cory Darby <ckdarby@vectorface.com>
 */
class Whip
{
    /** The whitelist key for IPv4 addresses */
    const IPV4 = IpWhitelist::IPV4;

    /** The whitelist key for IPv6 addresses */
    const IPV6 = IpWhitelist::IPV6;

    /** Indicates all header methods will be used. */
    const ALL_METHODS        = 255;
    /** Indicates the REMOTE_ADDR method will be used. */
    const REMOTE_ADDR        = 1;
    /** Indicates a set of possible proxy headers will be used. */
    const PROXY_HEADERS      = 2;
    /** Indicates any CloudFlare specific headers will be used. */
    const CLOUDFLARE_HEADERS = 4;
    /** Indicates any Incapsula specific headers will be used. */
    const INCAPSULA_HEADERS  = 8;
    /** Indicates custom listed headers will be used. */
    const CUSTOM_HEADERS     = 128;

    /** The array of mapped header strings. */
    private static array $headers = [
        self::CUSTOM_HEADERS => [],
        self::INCAPSULA_HEADERS => [
            'incap-client-ip'
        ],
        self::CLOUDFLARE_HEADERS => [
            'cf-connecting-ip'
        ],
        self::PROXY_HEADERS => [
            'client-ip',
            'x-forwarded-for',
            'x-forwarded',
            'x-cluster-client-ip',
            'forwarded-for',
            'forwarded',
            'x-real-ip',
        ],
    ];

    /** the bitmask of enabled methods */
    private int $enabled;

    /** the array of IP whitelist ranges to check against */
    private array $whitelist;

    /**
     * An object holding the source of addresses we will check
     *
     * @var RequestAdapter
     */
    private RequestAdapter $source;

    /**
     * Constructor for the class.
     *
     * @param int $enabled The bitmask of enabled headers.
     * @param array $whitelists The array of IP ranges to be whitelisted.
     * @param mixed|null $source A supported source of IP data.
     */
    public function __construct(int $enabled = self::ALL_METHODS, array $whitelists = [], mixed $source = null)
    {
        $this->enabled = $enabled;
        if (isset($source)) {
            $this->setSource($source);
        }
        $this->whitelist = [];
        foreach ($whitelists as $header => $ipRanges) {
            $header = $this->normalizeHeaderName($header);
            $this->whitelist[$header] = new IpWhitelist($ipRanges);
        }
    }

    /**
     * Adds a custom header to the list.
     *
     * @param string $header The custom header to add.
     * @return static
     */
    public function addCustomHeader(string $header) : static
    {
        self::$headers[self::CUSTOM_HEADERS][] = $this->normalizeHeaderName($header);
        return $this;
    }

    /**
     * Sets the source data used to look up the addresses.
     *
     * @param mixed $source The source array.
     * @return static
     */
    public function setSource(mixed $source) : static
    {
        $this->source = $this->getRequestAdapter($source);
        return $this;
    }

    /**
     * Returns the IP address of the client using the given methods.
     *
     * @param mixed|null $source (optional) The source data. If omitted, the class
     *        will use the value passed to Whip::setSource or fallback to
     *        $_SERVER.
     * @return string|false Returns the IP address as a string or false if no
     *         IP address could be found.
     */
    public function getIpAddress(mixed $source = null) : string|false
    {
        $source = $this->getRequestAdapter($this->coalesceSources($source));
        $remoteAddr = $source->getRemoteAddr();
        $requestHeaders = $source->getHeaders();

        foreach (self::$headers as $key => $headers) {
            if (!$this->isMethodUsable($key, $remoteAddr)) {
                continue;
            }

            if ($ipAddress = $this->extractAddressFromHeaders($requestHeaders, $headers)) {
                return $ipAddress;
            }
        }

        if ($remoteAddr && ($this->enabled & self::REMOTE_ADDR)) {
            return $remoteAddr;
        }

        return false;
    }

    /**
     * Returns the valid IP address or false if no valid IP address was found.
     *
     * @param mixed|null $source (optional) The source data. If omitted, the class
     *        will use the value passed to Whip::setSource or fallback to
     *        $_SERVER.
     * @return string|false Returns the IP address (as a string) of the client or false
     *         if no valid IP address was found.
     */
    public function getValidIpAddress(mixed $source = null) : string|false
    {
        $ipAddress = $this->getIpAddress($source);
        if (false === $ipAddress || false === @inet_pton($ipAddress)) {
            return false;
        }
        return $ipAddress;
    }

    /**
     * Normalizes HTTP header name representations.
     *
     * HTTP_MY_HEADER and My-Header would be transformed to my-header.
     *
     * @param string $header The original header name.
     * @return string The normalized header name.
     */
    private function normalizeHeaderName(string $header) : string
    {
        if (str_starts_with($header, 'HTTP_')) {
            $header = str_replace('_', '-', substr($header, 5));
        }
        return strtolower($header);
    }

    /**
     * Finds the first element in $headers that is present in $_SERVER and
     * returns the IP address mapped to that value.
     * If the IP address is a list of comma separated values, the first value
     * in the list will be returned. According as directive: clientIp, proxy1, proxy2, ...
     * If no IP address is found, we return false.
     *
     * @param array $requestHeaders The request headers to pull data from.
     * @param array $headers The list of headers to check.
     * @return string|false Returns the IP address as a string or false if no IP
     *         IP address was found.
     */
    private function extractAddressFromHeaders(array $requestHeaders, array $headers) : string|false
    {
        foreach ($headers as $header) {
            if (!empty($requestHeaders[$header])) {
                $list = explode(',', $requestHeaders[$header]);
                return trim($list[0]);
            }
        }
        return false;
    }

    /**
     * Returns whether the given method is enabled and usable.
     *
     * This method checks if the method is enabled and whether the method's data
     * is usable given its IP whitelist.
     *
     * @param string $key The source key.
     * @param string|null $ipAddress The IP address.
     * @return bool Returns true if the IP address is whitelisted and false
     *         otherwise. Returns true if the source does not have a whitelist
     *         specified.
     */
    private function isMethodUsable(string $key, ?string $ipAddress) : bool
    {
        if (!($key & $this->enabled)) {
            return false;
        }
        if (!isset($this->whitelist[$key])) {
            return true;
        }
        return $this->whitelist[$key]->isIpWhitelisted($ipAddress);
    }

    /**
     * Get a source/request adapter for a given source of IP data.
     *
     * @param mixed $source A supported source of request data.
     * @return RequestAdapter A RequestAdapter implementation for the given source.
     */
    private function getRequestAdapter(mixed $source): RequestAdapter
    {
        if ($source instanceof RequestAdapter) {
            return $source;
        } elseif ($source instanceof ServerRequestInterface) {
            return new Psr7RequestAdapter($source);
        } elseif (is_array($source)) {
            return new SuperglobalRequestAdapter($source);
        }

        throw new InvalidArgumentException("Unknown IP source.");
    }

    /**
     * Given available sources, get the first available source of IP data.
     *
     * @param mixed|null $source A source data argument, if available.
     * @return mixed The best available source, after fallbacks.
     */
    private function coalesceSources(mixed $source = null) : mixed
    {
        if (isset($source)) {
            return $source;
        }

        if (isset($this->source)) {
            return $this->source;
        }

        return $_SERVER;
    }
}