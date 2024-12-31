<?php

namespace Addons\Optimizer\Lazy_Load;

\defined('ABSPATH') || exit;

class Lazy_Load_Videos extends Abstract_Lazy_Load
{
    /**
     * Regex parts for checking content.
     */
    public string $regexp = '/(?:<video[^>]*)(?:(?:\/>)|(?:>.*?<\/video>))/is';

    /**
     * Regex for already replaced items.
     */
    public string $regex_replaced = "/class=['\"][\w\s]*(lazy)+[\w\s]*['\"]/is";

    /**
     * Search patterns.
     */
    public array $patterns = [
        '/(<video[^>]+)(src)=["|\']((?!data).*?)["|\']/i',
    ];

    /**
     * Replace patterns.
     */
    public array $replacements = [
        '$1data-$2="$3"',
    ];

    public function add_lazyload_class($element): string|array
    {
        return str_replace('<video', '<video class="lazy"', $element);
    }
}
