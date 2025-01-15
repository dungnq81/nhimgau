<?php

\defined( 'ABSPATH' ) || exit;

$login_security_default = \Addons\Helper::filterSettingOptions( 'login_security', false );
$login_security_options = \Addons\Helper::getOption( 'login_security__options' );

$custom_login_uri     = $login_security_options['custom_login_uri'] ?? '';
$login_ips_access     = $login_security_options['login_ips_access'] ?? '';
$disable_ips_access   = $login_security_options['disable_ips_access'] ?? '';
$limit_login_attempts = $login_security_options['limit_login_attempts'] ?? 0;
$illegal_users        = $login_security_options['illegal_users'] ?? '';

?>
<div class="container flex flex-x flex-gap sm-up-1 lg-up-2">

</div>
