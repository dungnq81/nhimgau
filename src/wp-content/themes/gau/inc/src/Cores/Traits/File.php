<?php

namespace Cores\Traits;

\defined( 'ABSPATH' ) || die;

trait File {

	// --------------------------------------------------

	/**
	 * Check if the passed content is XML.
	 *
	 * @param string $content The page content.
	 *
	 * @return bool
	 */
	public static function isXml( string $content ): bool {
		// Check for empty content
		if ( trim( $content ) === '' ) {
			return false;
		}

		// Get the first 50 chars of the content to check for XML declaration
		$xml_part = mb_substr( $content, 0, 50 );

		// Check if the content starts with an XML declaration
		if ( preg_match( '/<\?xml version="/', $xml_part ) ) {
			return true;
		}

		// Attempt to load the content as XML to ensure it is well-formed
		libxml_use_internal_errors( true );
		$xml = simplexml_load_string( $content );
		libxml_clear_errors();

		return $xml !== false;
	}

	// --------------------------------------------------

	/**
	 * @return bool
	 */
	public static function htAccess(): bool {
		global $is_apache;

		if ( $is_apache ) {
			return true;
		}

		// ?
		if ( isset( $_SERVER['HTACCESS'] ) && 'on' === $_SERVER['HTACCESS'] ) {
			return true;
		}

		return false;
	}

	// --------------------------------------------------

	/**
	 * @return mixed
	 */
	public static function wpFileSystem(): mixed {
		global $wp_filesystem;

		// Initialize the WP filesystem, no more using the 'file-put-contents' function.
		// Front-end only. In the back-end, it's already included
		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}

		return $wp_filesystem;
	}

	// --------------------------------------------------

	/**
	 * @param $path
	 *
	 * @return true
	 */
	public static function fileCreate( $path ): bool {
		// Setup wp_filesystem.
		$wp_filesystem = self::wpFileSystem();

		// Bail if the file already exists.
		if ( $wp_filesystem->is_file( $path ) ) {
			return true;
		}

		// Create the file.
		return $wp_filesystem->touch( $path );
	}

	// --------------------------------------------------

	/**
	 * Reads an entire file into a string
	 *
	 * @param string $file Name of the file to read.
	 *
	 * @return false|string|null Read data on success, false on failure.
	 */
	public static function fileRead( string $file ): false|string|null {
		// Setup wp_filesystem.
		$wp_filesystem = self::wpFileSystem();

		// Bail if we are unable to create the file.
		if ( ! self::fileCreate( $file ) ) {
			return null;
		}

		// Read `file`
		return $wp_filesystem->get_contents( $file );
	}

	// --------------------------------------------------

	/**
	 * Update a file
	 *
	 * @param string $path Full path to the file
	 * @param string $content File content
	 */
	public static function fileUpdate( string $path, string $content = '' ): void {
		// Setup wp_filesystem.
		$wp_filesystem = self::wpFileSystem();

		// Bail if we are unable to create the file.
		if ( ! self::fileCreate( $path ) ) {
			return;
		}

		// Add the new content into the file.
		$wp_filesystem->put_contents( $path, $content );
	}

	// --------------------------------------------------

	/**
	 * Lock a file and write something in it.
	 *
	 * @param string $content Content to add.
	 *
	 * @return bool True on success, false otherwise.
	 */
	public static function doLockWrite( $path, string $content = '' ): bool {
		$fp = fopen( $path, 'wb+' );

		if ( flock( $fp, LOCK_EX ) ) {
			fwrite( $fp, $content );
			flock( $fp, LOCK_UN );
			fclose( $fp );

			return true;
		}

		fclose( $fp );

		return false;
	}

	// --------------------------------------------------

	/**
	 * @param      $filename
	 * @param bool $include_dot
	 *
	 * @return string
	 */
	public static function fileExtension( $filename, bool $include_dot = false ): string {
		$dot = '';
		if ( $include_dot ) {
			$dot = '.';
		}

		return $dot . strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) );
	}

	// --------------------------------------------------

	/**
	 * @param      $filename
	 * @param bool $include_ext
	 *
	 * @return string
	 */
	public static function fileName( $filename, bool $include_ext = false ): string {
		return $include_ext
			? pathinfo( $filename, PATHINFO_FILENAME ) . self::fileExtension( $filename, true )
			: pathinfo( $filename, PATHINFO_FILENAME );
	}

	// --------------------------------------------------

	/**
	 * @param $dirname
	 *
	 * @return bool
	 */
	public static function isEmptyDir( $dirname ): bool {
		if ( ! is_dir( $dirname ) ) {
			return false;
		}

		foreach ( scandir( $dirname, SCANDIR_SORT_NONE ) as $file ) {
			if ( ! in_array( $file, [ '.', '..', '.svn', '.git' ] ) ) {
				return false;
			}
		}

		return true;
	}

	// --------------------------------------------------

	/**
	 * @param $directory
	 *
	 * @return bool
	 */
	public static function createDirectory( $directory ): bool {
		if ( ! is_writable( dirname( $directory ) ) ) {
			self::errorLog( sprintf( 'Cannot write to the parent directory: %s.', dirname( $directory ) ) );

			return false;
		}

		// Create the directory and return the result.
		$is_directory_created = wp_mkdir_p( $directory );

		// Bail if you cannot create temp dir.
		if ( ! $is_directory_created ) {
			self::errorLog( sprintf( 'Cannot create directory: %s.', $directory ) );
		}

		return $is_directory_created;
	}
}
