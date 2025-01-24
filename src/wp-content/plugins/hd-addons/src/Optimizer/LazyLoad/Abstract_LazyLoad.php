<?php

namespace Addons\Optimizer\LazyLoad;

\defined( 'ABSPATH' ) || exit;

/**
 * @author SiteGround
 * Modified by Gaudev
 */
abstract class Abstract_LazyLoad {

	// Regex for class matching.
	public string $regex_classes = '/class=["\'](.*?)["\']/is';

	public string $regexp;
	public string $regex_replaced;
	public array $patterns;
	public array $replacements;

	// ------------------------------------------------------

	// Add class-name to the HTML element.
	abstract public function add_lazyload_class( $element );

	// ------------------------------------------------------

	/**
	 * @param $content
	 *
	 * @return bool
	 */
	public function should_process( $content ): bool {
		return empty( $content ) ||
		       is_feed() ||
		       is_admin() ||
		       wp_doing_ajax() ||
		       \Addons\Helper::isAmpEnabled( $content );
	}

	// ------------------------------------------------------

	/**
	 * @param $content
	 *
	 * @return mixed
	 */
	public function filter_html( $content ): mixed {
		// Bail if it's feed, ajax, admin, amp... or if the content is empty.
		if ( $this->should_process( $content ) ) {
			return $content;
		}

		$lazyload_exclude  = \Addons\Helper::filterSettingOptions( 'lazyload_exclude', [] );
		$optimizer_options = \Addons\Helper::getOption( 'optimizer__options' );

		// Check for items.
		preg_match_all( $this->regexp, $content, $matches );

		$search  = [];
		$replace = [];

		// Check for specific asset being excluded.
		$excluded_all = array_unique(
			array_merge(
				$lazyload_exclude ?? [],
				$optimizer_options['lazyload_exclude'] ?? []
			)
		);

		foreach ( $matches[0] as $item ) {
			// Skip already replaced item.
			if ( preg_match( $this->regex_replaced, $item ) ) {
				continue;
			}

			// Check if we have a filter for excluding specific asset from being lazily loaded.
			if ( ! empty( $excluded_all ) ) {
				// Match the url of the asset.
				preg_match( '~(?:src=")([^"]*)"~', $item, $src_match );

				// If we have a match and the array is part of the excluded assets bail from lazy loading.
				if ( ! empty( $src_match ) ) {
					$item_filename = basename( $src_match[1] );
					if ( in_array( $item_filename, $excluded_all, false ) ) {
						continue;
					}
				}
			}

			// Do some checking if there are any class matches.
			preg_match( $this->regex_classes, $item, $class_matches );

			if ( ! empty( $class_matches[1] ) ) {
				$classes = $class_matches[1];
				$item_classes = explode( ' ', $class_matches[1] );

				// Check if the item has ignored class and bail if it has.
				if ( array_intersect( $item_classes, $excluded_all ) ) {
					continue;
				}

				$orig_item = str_replace( $classes, $classes . ' lazy', $item );
			} else {
				$orig_item = $this->add_lazyload_class( $item );
			}

			// Finally, do the search/replace and return modified content.
			$new_item = preg_replace(
				$this->patterns,
				$this->replacements,
				$orig_item
			);

			$search[]  = $item;
			$replace[] = $new_item;
		}

		return str_replace( $search, $replace, $content );
	}
}
