<?php

namespace Cores\Traits;

use Exception;
use Random\RandomException;

\defined( 'ABSPATH' ) || die;

trait Encryption {

	private static ?string $method = null;
	private static ?string $secretKey = null;

	// -------------------------------------------------------------

	/**
	 * Load keys from the encryption_key.php file
	 *
	 * @return void
	 * @throws Exception
	 */
	private static function loadKeys(): void {
		if ( is_null( self::$method ) || is_null( self::$secretKey ) ) {
			$keyFile = INC_PATH . 'encryption_key.php';

			if ( ! is_file( $keyFile ) ) {
				throw new \RuntimeException( "Key file not found: $keyFile" );
			}

			include $keyFile;

			// Set values from the included variables
			self::$method    = $cipher_method ?? 'AES-128-CBC';
			self::$secretKey = $secret_key ?? 'd24eebeca3db6407c18d4de572fff114';
		}
	}

	// -------------------------------------------------------------

	/**
	 * Encode a string with encryption
	 *
	 * @param string $data
	 *
	 * @return string
	 * @throws RandomException
	 * @throws Exception
	 */
	public static function encode( string $data ): string {
		self::loadKeys();

		$iv        = random_bytes( openssl_cipher_iv_length( self::$method ) );
		$key       = substr( hash( 'sha256', self::$secretKey ), 0, 16 );
		$encrypted = openssl_encrypt( $data, self::$method, $key, 0, $iv );

		return base64_encode( $iv . $encrypted );
	}

	// -------------------------------------------------------------

	/**
	 * Decode an encrypted string
	 *
	 * @param string $encryptedData
	 *
	 * @return string|null
	 * @throws Exception
	 */
	public static function decode( string $encryptedData ): ?string {
		self::loadKeys();

		$data = base64_decode( $encryptedData );

		$ivLength  = openssl_cipher_iv_length( self::$method );
		$iv        = substr( $data, 0, $ivLength );
		$encrypted = substr( $data, $ivLength );

		$key       = substr( hash( 'sha256', self::$secretKey ), 0, 16 );
		$decrypted = openssl_decrypt( $encrypted, self::$method, $key, 0, $iv );

		return $decrypted !== false ? $decrypted : null;
	}
}
