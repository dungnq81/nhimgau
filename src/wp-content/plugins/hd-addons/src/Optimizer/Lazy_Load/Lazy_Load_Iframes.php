<?php

namespace Addons\Optimizer\Lazy_Load;

\defined('ABSPATH') || exit;

class Lazy_Load_Iframes extends Abstract_Lazy_Load
{
    /**
     * Regex parts for checking content
     */
    public string $regexp = '/(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/i';

    /**
     * Regex for already replaced items
     */
    public string $regex_replaced = "/class=['\"][\w\s]*(lazy)+[\w\s]*['\"]/is";

    /**
     * Search patterns.
     */
    public array $patterns = [
        '/(<iframe.*?)(src)=["|\']((?!data).*?)["|\']/i',
    ];

    /**
     * Replace patterns.
     */
    public array $replacements = [
        '$1data-$2="$3"',
    ];

    public function add_lazyload_class($element): string|array
    {
        return str_replace('<iframe', '<iframe class="lazy"', $element);
    }
}
