<?php

/**
 * PrivateDomainName
 *
 * PHP version 5
 *
 * @author    Jim Wigginton <terrafrost@php.net>
 * @copyright 2016 Jim Wigginton
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @link      http://phpseclib.sourceforge.net
 */
namespace FluentSmtpLib\phpseclib3\File\ASN1\Maps;

use FluentSmtpLib\phpseclib3\File\ASN1;
/**
 * PrivateDomainName
 *
 * @author  Jim Wigginton <terrafrost@php.net>
 */
abstract class PrivateDomainName
{
    const MAP = ['type' => \FluentSmtpLib\phpseclib3\File\ASN1::TYPE_CHOICE, 'children' => ['numeric' => ['type' => \FluentSmtpLib\phpseclib3\File\ASN1::TYPE_NUMERIC_STRING], 'printable' => ['type' => \FluentSmtpLib\phpseclib3\File\ASN1::TYPE_PRINTABLE_STRING]]];
}
