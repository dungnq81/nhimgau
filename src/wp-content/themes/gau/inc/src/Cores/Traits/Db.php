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
	 * @return \WP_Error|int
	 */
	public static function bulkInsertRows( $table_name, $data, bool $sanitize = true ): \WP_Error|int {
		global $wpdb;

		// Check if there is any data to insert
		if ( empty( $table_name ) || empty( $data ) || ! is_array( $data ) ) {
			return new \WP_Error( 'invalid_data', 'Table name or data is invalid.' );
		}

		// Get a list of valid columns from the table structure
		$table_name    = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$valid_columns = $wpdb->get_col( "DESCRIBE $table_name", 0 );

		// If no columns are returned, the table doesn't exist or has no columns
		if ( empty( $valid_columns ) ) {
			return new \WP_Error( 'invalid_table', 'The specified table does not exist or has no valid columns.' );
		}

		$values            = [];
		$columns_in_insert = [];

		// Loop through the data and validate each row
		foreach ( $data as $row ) {
			$valid_data = [];

			// Filter out invalid columns from the current row
			foreach ( $row as $key => $value ) {
				if ( in_array( $key, $valid_columns, true ) ) {
					$valid_data[ $key ] = $value;
				}
			}

			// If no valid data remains in the row, skip this row
			if ( empty( $valid_data ) ) {
				continue;
			}

			// Initialize columns_in_insert with the first valid row's keys
			if ( empty( $columns_in_insert ) ) {
				$columns_in_insert = array_keys( $valid_data );
			}

			// Ensure that all the columns match the valid columns
			$row_values   = [];
			$placeholders = [];
			foreach ( $columns_in_insert as $column ) {
				if ( array_key_exists( $column, $valid_data ) && $valid_data[ $column ] === null ) {
					$placeholders[] = 'NULL';
				} else {
					$placeholders[] = '%s';
					$row_values[]   = $valid_data[ $column ] ?? '';
				}
			}

			// Build the prepared SQL row
			$prepared_values = $row_values
				? $wpdb->prepare( '(' . implode( ', ', $placeholders ) . ')', ...$row_values )
				: '(' . implode( ', ', $placeholders ) . ')';

			$values[] = $prepared_values;
		}

		// If there are no valid rows to insert, return WP_Error
		if ( empty( $values ) ) {
			return new \WP_Error( 'no_valid_data', 'No valid rows to insert.' );
		}

		// Build and execute the SQL query
		$sql = "INSERT INTO $table_name (" . implode( ', ', $columns_in_insert ) . ") VALUES " . implode( ', ', $values );

		if ( $wpdb->query( $sql ) ) {
			return count( $values );
		}

		return new \WP_Error( 'insert_error', $wpdb->last_error );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $data
	 * @param bool $sanitize
	 *
	 * @return int|\WP_Error
	 */
	public static function insertOneRow( $table_name, $data, bool $sanitize = true ): \WP_Error|int {
		global $wpdb;

		// Validate input parameters
		if ( empty( $table_name ) || empty( $data ) || ! is_array( $data ) ) {
			return new \WP_Error( 'invalid_data', 'Table name or data is invalid.' );
		}

		// Get columns of the table
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$columns    = $wpdb->get_col( "DESCRIBE $table_name", 0 );

		// If no columns found, table does not exist or is invalid
		if ( empty( $columns ) ) {
			return new \WP_Error( 'invalid_table', 'The specified table does not exist or has no valid columns.' );
		}

		// Remove invalid fields from $data that do not match table columns
		$valid_data = [];
		foreach ( $data as $key => $value ) {
			if ( in_array( $key, $columns, false ) ) {
				$valid_data[ $key ] = $value;
			}
		}

		// If no valid data exists, return error
		if ( empty( $valid_data ) ) {
			return new \WP_Error( 'no_valid_data', 'No valid data provided for insertion.' );
		}

		$result = $wpdb->insert( $table_name, $valid_data );
		if ( $result === false ) {
			return new \WP_Error( 'insert_error', $wpdb->last_error );
		}

		return $wpdb->insert_id;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param $data
	 * @param bool $sanitize
	 *
	 * @return int|\WP_Error
	 */
	public static function updateOneRow( $table_name, $id, $data, bool $sanitize = true ): \WP_Error|int {
		global $wpdb;

		// Validate input parameters
		if ( empty( $table_name ) || empty( $id ) || empty( $data ) || ! is_array( $data ) ) {
			return new \WP_Error( 'invalid_data', 'Table name, ID, or data is invalid.' );
		}

		// Check if the row with the given ID exists in the table
		if ( ! self::checkOneRow( $table_name, $id, $sanitize ) ) {
			return new \WP_Error( 'row_not_found', 'The specified row does not exist in the table.' );
		}

		// Get columns of the table
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$columns    = $wpdb->get_col( "DESCRIBE $table_name", 0 );

		// If no columns are found, the table is invalid
		if ( empty( $columns ) ) {
			return new \WP_Error( 'invalid_table', 'The specified table does not exist or has no valid columns.' );
		}

		// Remove invalid fields from $data that do not match table columns
		$valid_data = [];
		foreach ( $data as $key => $value ) {
			if ( in_array( $key, $columns, false ) ) {
				$valid_data[ $key ] = $value;
			}
		}

		// If no valid data exists, return error
		if ( empty( $valid_data ) ) {
			return new \WP_Error( 'no_valid_data', 'No valid data provided for updating.' );
		}

		$row_updated = $wpdb->update( $table_name, $valid_data, [ 'id' => $id ] );

		// Check the result of the update operation
		if ( $row_updated === false ) {
			return new \WP_Error( 'update_failed', $wpdb->last_error ?: 'Unknown error during update operation.' );
		}

		return $row_updated;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param bool $sanitize
	 *
	 * @return int|\WP_Error
	 */
	public static function deleteOneRow( $table_name, $id, bool $sanitize = true ): \WP_Error|int {
		global $wpdb;

		// Validate input parameters
		if ( empty( $table_name ) || empty( $id ) ) {
			return new \WP_Error( 'invalid_data', 'Table name or ID is invalid.' );
		}

		// Check if the row with the given ID exists in the table
		if ( ! self::checkOneRow( $table_name, $id, $sanitize ) ) {
			return new \WP_Error( 'row_not_found', 'The specified row does not exist in the table.' );
		}

		$table_name  = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$row_deleted = $wpdb->delete( $table_name, [ 'id' => $id ] );

		// Check the result of the delete operation
		if ( $row_deleted === false ) {
			return new \WP_Error( 'delete_failed', $wpdb->last_error ?: 'Unknown error during delete operation.' );
		}

		return $row_deleted;
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $column
	 * @param $key
	 * @param bool $sanitize
	 * @param int $offset
	 * @param int $limit
	 * @param string $order_by
	 * @param string $order
	 *
	 * @return array|null|\WP_Error
	 */
	public static function getRowsBy(
		$table_name,
		$column,
		$key,
		bool $sanitize = true,
		int $offset = 0,
		int $limit = - 1,
		string $order_by = '',
		string $order = 'ASC'
	): \WP_Error|array|null {
		global $wpdb;

		// Validate input
		if ( empty( $table_name ) || empty( $column ) ) {
			return new \WP_Error( 'invalid_input', 'Table name or column is invalid.' );
		}

		// Sanitize table name and column name to prevent SQL injection
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$column     = $sanitize ? sanitize_text_field( $column ) : $column;

		// Build a base query
		$query = $wpdb->prepare( "SELECT * FROM `$table_name` WHERE `$column` = %s", $key );

		// Add ORDER BY clause if provided
		if ( ! empty( $order_by ) ) {
			$order = strtoupper( $order );
			$order = in_array( $order, [ 'ASC', 'DESC' ], true ) ? $order : 'ASC';
			$query .= " ORDER BY `" . esc_sql( $order_by ) . "` $order";
		}

		// Validate offset (ensure it's not negative)
		$offset = max( 0, $offset );

		if ( $limit > 0 ) {
			$query .= $wpdb->prepare( " LIMIT %d, %d", $offset, $limit );
		} elseif ( $limit === - 1 ) {
			$query .= $wpdb->prepare( " LIMIT %d, 18446744073709551615", $offset ); // max 'UNSIGNED BIGINT'
		}

		return $wpdb->get_results( $query, ARRAY_A );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $column
	 * @param $key
	 * @param bool $sanitize
	 *
	 * @return array|\WP_Error|null
	 */
	public static function getOneRowBy( $table_name, $column, $key, bool $sanitize = true ): \WP_Error|array|null {
		global $wpdb;

		// Validate input and return WP_Error if invalid
		if ( empty( $table_name ) || empty( $column ) ) {
			return new \WP_Error( 'invalid_input', 'Table name or column is invalid.' );
		}

		// Sanitize table name and column name to prevent SQL injection
		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$column     = $sanitize ? sanitize_text_field( $column ) : $column;

		$query = $wpdb->prepare( "SELECT * FROM `$table_name` WHERE `$column` = %s ORDER BY `id` DESC", $key );

		return $wpdb->get_row( $query, ARRAY_A );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param bool $sanitize
	 *
	 * @return array|\WP_Error|null
	 */
	public static function getOneRow( $table_name, $id, bool $sanitize = true ): \WP_Error|array|null {
		global $wpdb;

		if ( empty( $table_name ) || empty( $id ) ) {
			return new \WP_Error( 'invalid_input', 'Table name or ID is invalid.' );
		}

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$query      = $wpdb->prepare( "SELECT * FROM `$table_name` WHERE `id` = %d", (int) $id );

		return $wpdb->get_row( $query, ARRAY_A );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param int $offset
	 * @param int $limit
	 * @param bool $sanitize
	 * @param string $order_by
	 * @param string $order
	 *
	 * @return array|null|\WP_Error
	 */
	public static function getRows(
		$table_name,
		int $offset = 0,
		int $limit = - 1,
		bool $sanitize = true,
		string $order_by = '',
		string $order = 'ASC'
	): \WP_Error|array|null {
		global $wpdb;

		// Validate input
		if ( empty( $table_name ) ) {
			return new \WP_Error( 'invalid_input', 'Table name is invalid.' );
		}

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$query      = "SELECT * FROM `$table_name`";

		// Add ORDER BY clause if provided
		if ( ! empty( $order_by ) ) {
			$order = strtoupper( $order );
			$order = in_array( $order, [ 'ASC', 'DESC' ], true ) ? $order : 'ASC';
			$query .= " ORDER BY `" . esc_sql( $order_by ) . "` $order";
		}

		// Validate offset (ensure it's not negative)
		$offset = max( 0, $offset );

		if ( $limit > 0 ) {
			$query .= $wpdb->prepare( " LIMIT %d, %d", $offset, $limit );
		} elseif ( $limit === - 1 ) {
			$query .= $wpdb->prepare( " LIMIT %d, 18446744073709551615", $offset ); // max 'UNSIGNED BIGINT'
		}

		return $wpdb->get_results( $query, ARRAY_A );
	}

	// -------------------------------------------------------------

	/**
	 * @param $table_name
	 * @param $id
	 * @param bool $sanitize
	 *
	 * @return bool
	 */
	public static function checkOneRow( $table_name, $id, bool $sanitize = true ): bool {
		global $wpdb;

		if ( empty( $table_name ) || empty( $id ) ) {
			return false;
		}

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$query      = $wpdb->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE `id` = %d", (int) $id );

		$exists = $wpdb->get_var( $query );

		// Return true if row exists, false otherwise
		return (bool) $exists;
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
	public static function countRowsBy( $table_name, $column = null, $value = null, bool $sanitize = true ): int {
		global $wpdb;

		if ( empty( $table_name ) ) {
			return 0;
		}

		$table_name = $sanitize ? sanitize_text_field( $wpdb->prefix . $table_name ) : $wpdb->prefix . $table_name;
		$column     = $sanitize ? sanitize_text_field( $column ) : $column;

		if ( ! $column ) {
			return (int) $wpdb->get_var( "SELECT COUNT(*) FROM `$table_name`" );
		}

		// Execute the query and get the count
		return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE `$column` = %s", $value ) );
	}
}
