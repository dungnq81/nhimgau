<?php

/**
 * The template for displaying 404 pages (Not Found).
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

wp_redirect( \HD\Helper::home( '/' ), 301 );
die();
