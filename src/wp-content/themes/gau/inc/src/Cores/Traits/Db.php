<?php

namespace Cores\Traits;

\defined( 'ABSPATH' ) || die;

trait Db {

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $data
	 * @param bool $sanitize
	 *
	 * @return false|int
	 */
	public static function insertCustomRow( $table_name, $data, bool $sanitize = false ): false|int {
		global $wpdb;

		if ( empty( $table_name ) || empty( $data ) || ! is_array( $data ) ) {
			return false;
		}

		// Get columns of the table
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$columns    = $wpdb->get_col( "DESCRIBE $table_name", 0 );

		// Remove invalid fields from $data that do not match table columns
		$valid_data = [];
		foreach ( $data as $key => $value ) {
			if ( in_array( $key, $columns, false ) ) {
				$valid_data[ $key ] = $value;
			}
		}

		// Check if there is valid data to update
		if ( empty( $valid_data ) ) {
			return false;
		}

		$_inserted = $wpdb->insert( $table_name, $valid_data );

		return $wpdb->insert_id ?: false;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param $data
	 * @param bool $sanitize
	 *
	 * @return bool
	 */
	public static function updateCustomRow( $table_name, $id, $data, bool $sanitize = false ): bool {
		global $wpdb;

		if ( empty( $table_name ) || empty( $id ) || empty( $data ) || ! is_array( $data ) ) {
			return false;
		}

		// Check if the ID exists in the table
		if ( ! self::checkCustomRow( $table_name, $id, $sanitize ) ) {
			return false;
		}

		// Get columns of the table
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$columns    = $wpdb->get_col( "DESCRIBE $table_name", 0 );

		// Remove invalid fields from $data that do not match table columns
		$valid_data = [];
		foreach ( $data as $key => $value ) {
			if ( in_array( $key, $columns, false ) ) {
				$valid_data[ $key ] = $value;
			}
		}

		// Check if there is valid data to update
		if ( empty( $valid_data ) ) {
			return false;
		}

		$row_updated = $wpdb->update( $table_name, $valid_data, [ 'id' => $id ] );

		return $row_updated === 1;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param bool $sanitize
	 *
	 * @return bool
	 */
	public static function deleteCustomRow( $table_name, $id, bool $sanitize = false ): bool {
		global $wpdb;

		if ( empty( $table_name ) || empty( $id ) ) {
			return false;
		}

		// Check if the ID exists in the table
		if ( ! self::checkCustomRow( $table_name, $id, $sanitize ) ) {
			return false;
		}

		$table_name  = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$row_deleted = $wpdb->delete( $table_name, [ 'id' => $id ] );

		return $row_deleted === 1;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $column
	 * @param $key
	 * @param bool $sanitize
	 *
	 * @return array|false
	 */
	public static function getCustomRowsBy( $table_name, $column, $key, bool $sanitize = false ): false|array {
		global $wpdb;

		if ( ! $column ) {
			return false;
		}

		// Sanitize table name and column name to prevent SQL injection
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$column     = $sanitize ? sanitize_text_field( $column ) : $column;

		$results = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $table_name WHERE $column = %s", $key ), ARRAY_A );

		return $results ?: false;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $column
	 * @param $key
	 * @param bool $sanitize
	 *
	 * @return array|null
	 */
	public static function getCustomRowBy( $table_name, $column, $key, bool $sanitize = false ): ?array {
		global $wpdb;

		if ( ! $column ) {
			return null;
		}

		// Sanitize table name and column name to prevent SQL injection
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$column     = $sanitize ? sanitize_text_field( $column ) : $column;

		return $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE $column = %s ORDER BY `id` DESC", $key ), ARRAY_A );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param bool $sanitize
	 *
	 * @return bool
	 */
	public static function checkCustomRow( $table_name, $id, bool $sanitize = false ): bool {
		global $wpdb;

		// Check if $id exists and convert it to integer
		$id = isset( $id ) ? (int) $id : 0;

		if ( $id > 0 ) {
			$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
			$exists     = $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $table_name WHERE id = %d", $id ) );

			// Return true if row exists, false otherwise
			return (bool) $exists;
		}

		return false;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param bool $sanitize
	 *
	 * @return array|false|null
	 */
	public static function getCustomRow( $table_name, $id, bool $sanitize = false ): false|array|null {
		global $wpdb;

		if ( empty( $table_name ) || empty( $id ) ) {
			return false;
		}

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;

		return $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE id = %d", $id ), ARRAY_A );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param int $offset
	 * @param int $limit
	 * @param bool $sanitize
	 *
	 * @return array|false|null
	 */
	public static function getCustomRows( $table_name, int $offset = 0, int $limit = - 1, bool $sanitize = false ): false|array|null {
		global $wpdb;

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$query      = "SELECT * FROM $table_name";

		if ( $limit > 0 && $offset >= 0 ) {
			$query .= $wpdb->prepare( " LIMIT %d, %d", $offset, $limit );
		}

		$results = $wpdb->get_results( $query, ARRAY_A );

		return $results ?: false;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param null $column
	 * @param null $value
	 * @param bool $sanitize
	 *
	 * @return int
	 */
	public static function countCustomRowsBy( $table_name, $column = null, $value = null, bool $sanitize = false ): int {
		global $wpdb;

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$column     = $sanitize ? sanitize_text_field( $column ) : $column;

		if ( ! $column ) {
			return (int) $wpdb->get_var( "SELECT COUNT(*) FROM $table_name" );
		}

		// Execute the query and get the count
		return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $table_name WHERE $column = %s", $value ) );
	}
}
