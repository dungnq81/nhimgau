<?php

namespace Addons\File;

use Addons\Base\Singleton;

use Addons\File\SVG\SVG;

\defined( 'ABSPATH' ) || die;

final class File {
	use Singleton;

	// --------------------------------------------------

	private function init(): void {
		( SVG::get_instance() );
	}
}
