<?php

/**
 * MU Class
 *
 * @author Gaudev
 */
final class MU {
	public function __construct() {
		( new \MU\Disallow_Indexing() );
		( new \MU\Plugin_Disabler\Plugin_Disabler() );
	}
}
