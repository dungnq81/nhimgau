<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitedba325158c750b2a115396df3b0241d
{
    public static $prefixLengthsPsr4 = array (
        'H' => 
        array (
            'HD\\' => 3,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'HD\\' => 
        array (
            0 => __DIR__ . '/../..' . '/inc/classes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitedba325158c750b2a115396df3b0241d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitedba325158c750b2a115396df3b0241d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitedba325158c750b2a115396df3b0241d::$classMap;

        }, null, ClassLoader::class);
    }
}
