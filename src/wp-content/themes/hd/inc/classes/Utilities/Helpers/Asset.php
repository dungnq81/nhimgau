<?php

namespace HD\Utilities\Helpers;

/**
 * Collect & enqueue CSS/JS.
 * Universal asset manager for the whole theme (global and block level).
 *
 * @author Gaudev
 */
final class Asset {
	private static array $styles = [];         // Style handles queued for the current request
	private static array $scripts = [];        // Script handles queued for the current request
	private static array $localize = [];       // [handle => $data] for wp_localize_script
	private static array $inline_scripts = []; // for wp_add_inline_script

	// ----------------------------------------

	/**
	 * @param string $handle
	 * @param string $src
	 * @param array $deps
	 * @param string|bool|null $ver
	 * @param string $media
	 *
	 * @return void
	 */
	public static function queueStyle( string $handle, string $src, array $deps = [], string|bool|null $ver = null, string $media = 'all' ): void {
		if ( isset( self::$styles[ $handle ] ) ) {
			return;
		}

		self::$styles[ $handle ] = [
			'src'   => $src,
			'deps'  => $deps,
			'ver'   => $ver,
			'media' => $media,
		];
	}

	// ----------------------------------------

	/**
	 * @param string $handle
	 * @param string $src
	 * @param array $deps
	 * @param string|bool|null $ver
	 * @param bool $in_footer
	 * @param array $extra - Ex. [ 'module', 'defer' ]
	 *
	 * @return void
	 */
	public static function queueScript( string $handle, string $src, array $deps = [], string|bool|null $ver = null, bool $in_footer = true, array $extra = [] ): void {
		if ( isset( self::$scripts[ $handle ] ) ) {
			return;
		}

		self::$scripts[ $handle ] = [
			'src'       => $src,
			'deps'      => $deps,
			'ver'       => $ver,
			'in_footer' => $in_footer,
			'extra'     => $extra,
		];
	}

	// ----------------------------------------

	public static function localize( string $handle, string $object_name, array $l10n ): void {
		self::$localize[ $handle ] = [ $object_name, $l10n ];
	}

	// ----------------------------------------

	public static function inline( string $handle, string $code, string $position = 'after' ): void {
		if ( ! isset( self::$inline_scripts[ $handle ] ) ) {
			self::$inline_scripts[ $handle ] = [];
		}

		self::$inline_scripts[ $handle ][] = [ $code, $position ];
	}

	// ----------------------------------------

	/**
	 * Enqueue everything that was queued before wp_enqueue_scripts ends.
	 *
	 * @return void
	 */
	public static function enqueueAll(): void {
		// Styles
		foreach ( self::$styles as $handle => $args ) {
			wp_register_style( $handle, $args['src'], $args['deps'], $args['ver'], $args['media'] );
			wp_enqueue_style( $handle );
		}

		// Scripts
		foreach ( self::$scripts as $handle => $args ) {
			wp_register_script( $handle, $args['src'], $args['deps'], $args['ver'], $args['in_footer'] );
			wp_enqueue_script( $handle );

			if ( ! empty( $args['extra'] ) ) {
				wp_script_add_data( $handle, 'extra', $args['extra'] );
			}
		}

		// Attach localize
		foreach ( self::$localize as $handle => [$object_name, $l10n] ) {
			wp_localize_script( $handle, $object_name, $l10n );
		}

		// inline if queued
		foreach ( self::$inline_scripts as $handle => $blocks ) {
			foreach ( $blocks as [$code, $position] ) {
				wp_add_inline_script( $handle, $code, $position );
			}
		}
	}

	// ----------------------------------------

	/**
	 * Print styles that were enqueued after wp_head (prevents FOUC).
	 *
	 * @return void
	 */
	public static function printLateStyles(): void {
		wp_print_styles();
	}

	// ----------------------------------------

	/**
	 * Initialise the collector once per request.
	 *
	 * @return void
	 */
	public static function bootstrap(): void {
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueueAll' ], 30 );

		// Run early so styles appear before footer scripts
		add_action( 'wp_print_footer_scripts', [ __CLASS__, 'printLateStyles' ], 5 );
	}
}
