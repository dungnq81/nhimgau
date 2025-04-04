<?php

namespace WP_CLI\I18n;

use Gettext\Translation;
use Gettext\Translations;
use RecursiveCallbackFilterIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use SplFileInfo;
use WP_CLI;
use WP_CLI\Utils;

trait IterableCodeExtractor {

	protected static $dir = '';

	/**
	 * Extract the translations from a file.
	 *
	 * @param array|string $file_or_files A path of a file or files
	 * @param Translations $translations  The translations instance to append the new translations.
	 * @param array        $options      {
	 *     Optional. An array of options passed down to static::fromString()
	 *
	 *     @type bool  $wpExtractTemplates  Extract 'Template Name' headers in theme files. Default 'false'.
	 *     @type bool  $wpExtractPatterns   Extract 'Title' and 'Description' headers in pattern files. Default 'false'.
	 *     @type array $restrictFileNames   Skip all files which are not included in this array.
	 *     @type array $restrictDirectories Skip all directories which are not included in this array.
	 * }
	 * @return null
	 */
	public static function fromFile( $file_or_files, Translations $translations, array $options = [] ) {
		foreach ( static::getFiles( $file_or_files ) as $file ) {
			if ( ! empty( $options['restrictFileNames'] ) ) {
				$basename = Utils\basename( $file );
				if ( ! in_array( $basename, $options['restrictFileNames'], true ) ) {
					continue;
				}
			}

			$relative_file_path = ltrim( str_replace( static::$dir, '', Utils\normalize_path( $file ) ), '/' );

			// Make sure a relative file path is added as a comment.
			$options['file'] = $relative_file_path;

			if ( ! empty( $options['restrictDirectories'] ) ) {
				$top_level_dirname = explode( '/', $relative_file_path )[0];

				if ( ! in_array( $top_level_dirname, $options['restrictDirectories'], true ) ) {
					continue;
				}
			}

			$text = file_get_contents( $file );

			if ( ! $text ) {
				WP_CLI::debug(
					sprintf(
						'Could not load file %1s',
						$file
					),
					'make-pot'
				);

				continue;
			}

			if ( ! empty( $options['wpExtractTemplates'] ) ) {
				$headers = FileDataExtractor::get_file_data_from_string( $text, [ 'Template Name' => 'Template Name' ] );

				if ( ! empty( $headers['Template Name'] ) ) {
					$translation = new Translation( '', $headers['Template Name'] );
					$translation->addExtractedComment( 'Template Name of the theme' );

					$translations[] = $translation;
				}
			}

			// Patterns are only supported when in a top-level patterns/ folder.
			if ( ! empty( $options['wpExtractPatterns'] ) && 0 === strpos( $options['file'], 'patterns/' ) ) {
				$headers = FileDataExtractor::get_file_data_from_string(
					$text,
					[
						'Title'       => 'Title',
						'Description' => 'Description',
					]
				);

				if ( ! empty( $headers['Title'] ) ) {
					$translation = new Translation( 'Pattern title', $headers['Title'] );
					$translation->addReference( $options['file'] );

					$translations[] = $translation;
				}

				if ( ! empty( $headers['Description'] ) ) {
					$translation = new Translation( 'Pattern description', $headers['Description'] );
					$translation->addReference( $options['file'] );

					$translations[] = $translation;
				}
			}

			static::fromString( $text, $translations, $options );
		}
	}

	/**
	 * Extract the translations from a file.
	 *
	 * @param string $dir                Root path to start the recursive traversal in.
	 * @param Translations $translations The translations instance to append the new translations.
	 * @param array        $options      {
	 *     Optional. An array of options passed down to static::fromString()
	 *
	 *     @type bool $wpExtractTemplates Extract 'Template Name' headers in theme files. Default 'false'.
	 *     @type array $exclude           A list of path to exclude. Default [].
	 *     @type array $extensions        A list of extensions to process. Default [].
	 * }
	 * @return void
	 */
	public static function fromDirectory( $dir, Translations $translations, array $options = [] ) {
		$dir = Utils\normalize_path( $dir );

		static::$dir = $dir;

		$include = isset( $options['include'] ) ? $options['include'] : [];
		$exclude = isset( $options['exclude'] ) ? $options['exclude'] : [];

		$files = static::getFilesFromDirectory( $dir, $include, $exclude, $options['extensions'] );

		if ( ! empty( $files ) ) {
			static::fromFile( $files, $translations, $options );
		}

		static::$dir = '';
	}

	/**
	 * Determines whether a file is valid based on given matchers.
	 *
	 * @param SplFileInfo $file     File or directory.
	 * @param array       $matchers List of files and directories to match.
	 * @return int How strongly the file is matched.
	 */
	protected static function calculateMatchScore( SplFileInfo $file, array $matchers = [] ) {
		if ( empty( $matchers ) ) {
			return 0;
		}

		if ( in_array( $file->getBasename(), $matchers, true ) ) {
			return 10;
		}

		// Check for more complex paths, e.g. /some/sub/folder.
		$root_relative_path = str_replace( static::$dir, '', $file->getPathname() );

		foreach ( $matchers as $path_or_file ) {
			$pattern = preg_quote( str_replace( '*', '__wildcard__', $path_or_file ), '#' );
			$pattern = '(^|/)' . str_replace( '__wildcard__', '(.+)', $pattern );

			// Base score is the amount of nested directories, discounting wildcards.
			$base_score = count(
				array_filter(
					explode( '/', $path_or_file ),
					static function ( $component ) {
						return '*' !== $component;
					}
				)
			);
			if ( 0 === $base_score ) {
				// If the matcher is simply * it gets a score above the implicit score but below 1.
				$base_score = 0.2;
			}

			// If the matcher contains no wildcards and matches the end of the path.
			if (
				false === strpos( $path_or_file, '*' ) &&
				preg_match( '#' . $pattern . '$#', $root_relative_path )
			) {
				return $base_score * 10;
			}

			// If the matcher matches the end of the path or a full directory contained.
			if ( preg_match( '#' . $pattern . '(/|$)#', $root_relative_path ) ) {
				return $base_score;
			}
		}

		return 0;
	}

	/**
	 * Determines whether or not a directory has children that may be matched.
	 *
	 * @param SplFileInfo $dir      Directory.
	 * @param array       $matchers List of files and directories to match.
	 * @return bool Whether or not there are any matchers for children of this directory.
	 */
	protected static function containsMatchingChildren( SplFileInfo $dir, array $matchers = [] ) {
		if ( empty( $matchers ) ) {
			return false;
		}

		/** @var string $root_relative_path */
		$root_relative_path = str_replace( static::$dir, '', $dir->getPathname() );
		$root_relative_path = static::trim_leading_slash( $root_relative_path );

		foreach ( $matchers as $path_or_file ) {
			// If the matcher contains no wildcards and the path matches the start of the matcher.
			if (
				'' !== $root_relative_path &&
				false === strpos( $path_or_file, '*' ) &&
				0 === strpos( $path_or_file . '/', $root_relative_path )
			) {
				return true;
			}

			$base = current( explode( '*', $path_or_file ) );

			// If start of the path matches the start of the matcher until the first wildcard.
			// Or the start of the matcher until the first wildcard matches the start of the path.
			if (
				( '' !== $root_relative_path && 0 === strpos( $base, $root_relative_path ) ) ||
				( '' !== $base && 0 === strpos( $root_relative_path, $base ) )
			) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Recursively gets all PHP files within a directory.
	 *
	 * @param string $dir A path of a directory.
	 * @param array $includes List of files and directories to include.
	 * @param array $excludes List of files and directories to skip.
	 * @param array $extensions List of filename extensions to process.
	 *
	 * @return array File list.
	 */
	public static function getFilesFromDirectory( $dir, array $includes = [], array $excludes = [], $extensions = [] ) {
		$filtered_files = [];

		$files = new RecursiveIteratorIterator(
			new RecursiveCallbackFilterIterator(
				new RecursiveDirectoryIterator( $dir, RecursiveDirectoryIterator::SKIP_DOTS | RecursiveDirectoryIterator::UNIX_PATHS | RecursiveDirectoryIterator::FOLLOW_SYMLINKS ),
				static function ( $file, $key, $iterator ) use ( $includes, $excludes, $extensions ) {
					/** @var RecursiveCallbackFilterIterator $iterator */
					/** @var SplFileInfo $file */

					// Normalize include and exclude paths.
					$includes = array_map( self::class . '::trim_leading_slash', $includes );
					$excludes = array_map( self::class . '::trim_leading_slash', $excludes );

					// If no $includes is passed everything gets the weakest possible matching score.
					$inclusion_score = empty( $includes ) ? 0.1 : static::calculateMatchScore( $file, $includes );
					$exclusion_score = static::calculateMatchScore( $file, $excludes );

					// Always include directories that aren't excluded.
					if ( 0 === $exclusion_score && $iterator->hasChildren() ) {
						return true;
					}

					if ( ( 0 === $inclusion_score || $exclusion_score > $inclusion_score ) && $iterator->hasChildren() ) {
						// Always include directories that may have matching children even if they are excluded.
						return static::containsMatchingChildren( $file, $includes );
					}

					// Include directories that are excluded but include score is higher.
					if ( $exclusion_score > 0 && $inclusion_score >= $exclusion_score && $iterator->hasChildren() ) {
						return true;
					}

					if ( ! $file->isFile() || ! static::file_has_file_extension( $file, $extensions ) ) {
						return false;
					}

					return $inclusion_score > $exclusion_score;
				}
			),
			RecursiveIteratorIterator::CHILD_FIRST
		);

		foreach ( $files as $file ) {
			/** @var SplFileInfo $file */
			if ( ! $file->isFile() || ! static::file_has_file_extension( $file, $extensions ) ) {
				continue;
			}

			$filtered_files[] = Utils\normalize_path( $file->getPathname() );
		}

		sort( $filtered_files, SORT_NATURAL | SORT_FLAG_CASE );

		return $filtered_files;
	}

	/**
	 * Determines whether the file extension of a file matches any of the given file extensions.
	 * The end/last part of a multi file extension must also match (`js` of `min.js`).
	 *
	 * @param SplFileInfo $file       File or directory.
	 * @param array       $extensions List of file extensions to match.
	 * @return bool Whether the file has a file extension that matches any of the ones in the list.
	 */
	protected static function file_has_file_extension( $file, $extensions ) {
		return in_array( $file->getExtension(), $extensions, true ) ||
			in_array( static::file_get_extension_multi( $file ), $extensions, true );
	}

	/**
	 * Gets the single- (e.g. `php`) or multi-file extension (e.g. `blade.php`) of a file.
	 *
	 * @param SplFileInfo $file File or directory.
	 * @return string The single- or multi-file extension of the file.
	 */
	protected static function file_get_extension_multi( $file ) {
		$file_extension_separator = '.';

		$filename = $file->getFilename();
		$parts    = explode( $file_extension_separator, $filename, 2 );
		if ( count( $parts ) <= 1 ) {
			// if ever something goes wrong, fall back to SPL
			return $file->getExtension();
		}
		return $parts[1];
	}

	/**
	 * Trim leading slash from a path.
	 *
	 * @param string $path Path to trim.
	 * @return string Trimmed path.
	 */
	protected static function trim_leading_slash( $path ) {
		return ltrim( $path, '/' );
	}
}
