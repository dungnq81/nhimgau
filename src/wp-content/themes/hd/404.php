<?php

/**
 * The template for displaying 404 pages (Not Found).
 * http://codex.wordpress.org/Template_Hierarchy
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

wp_redirect( \HD\Helper::home( '/' ), 301 );
die();
