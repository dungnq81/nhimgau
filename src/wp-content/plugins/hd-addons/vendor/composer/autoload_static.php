<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf894941b8b4f5aa838ba9df71f684270
{
    public static $prefixLengthsPsr4 = array (
        'e' => 
        array (
            'enshrined\\svgSanitize\\' => 22,
        ),
        'O' => 
        array (
            'OpenSpout\\' => 10,
        ),
        'A' => 
        array (
            'Addons\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'enshrined\\svgSanitize\\' => 
        array (
            0 => __DIR__ . '/..' . '/enshrined/svg-sanitize/src',
        ),
        'OpenSpout\\' => 
        array (
            0 => __DIR__ . '/..' . '/openspout/openspout/src',
        ),
        'Addons\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf894941b8b4f5aa838ba9df71f684270::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf894941b8b4f5aa838ba9df71f684270::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitf894941b8b4f5aa838ba9df71f684270::$classMap;

        }, null, ClassLoader::class);
    }
}
