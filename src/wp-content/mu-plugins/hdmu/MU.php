<?php

use MU\Disallow_Indexing;
use MU\Plugin_Disabler\Plugin_Disabler;

/**
 * MU Class
 *
 * @author Gaudev
 */
final class MU {
	public function __construct() {
		( new Disallow_Indexing() );
		( new Plugin_Disabler() );
	}
}
