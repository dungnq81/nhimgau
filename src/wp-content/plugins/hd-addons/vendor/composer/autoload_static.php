<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit439191ca78e657f2a36e9ce64cd8b583
{
    public static $files = array (
        '6e3fae29631ef280660b3cdad06f25a8' => __DIR__ . '/..' . '/symfony/deprecation-contracts/function.php',
        '320cde22f66dd4f5d3fd621d3e88b98f' => __DIR__ . '/..' . '/symfony/polyfill-ctype/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'e' => 
        array (
            'enshrined\\svgSanitize\\' => 22,
        ),
        'S' => 
        array (
            'Symfony\\Polyfill\\Ctype\\' => 23,
            'Symfony\\Component\\Yaml\\' => 23,
        ),
        'M' => 
        array (
            'MatthiasMullie\\PathConverter\\' => 29,
            'MatthiasMullie\\Minify\\' => 22,
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
        'Symfony\\Polyfill\\Ctype\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-ctype',
        ),
        'Symfony\\Component\\Yaml\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/yaml',
        ),
        'MatthiasMullie\\PathConverter\\' => 
        array (
            0 => __DIR__ . '/..' . '/matthiasmullie/path-converter/src',
        ),
        'MatthiasMullie\\Minify\\' => 
        array (
            0 => __DIR__ . '/..' . '/matthiasmullie/minify/src',
        ),
        'Addons\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Addons\\Activator' => __DIR__ . '/../..' . '/src/Activator.php',
        'Addons\\Addons' => __DIR__ . '/../..' . '/src/Addons.php',
        'Addons\\AspectRatio\\AspectRatio' => __DIR__ . '/../..' . '/src/AspectRatio/AspectRatio.php',
        'Addons\\BaseSlug\\BaseSlug' => __DIR__ . '/../..' . '/src/BaseSlug/BaseSlug.php',
        'Addons\\BaseSlug\\Rewrite_PostType' => __DIR__ . '/../..' . '/src/BaseSlug/Rewrite_PostType.php',
        'Addons\\BaseSlug\\Rewrite_Taxonomy' => __DIR__ . '/../..' . '/src/BaseSlug/Rewrite_Taxonomy.php',
        'Addons\\CSS' => __DIR__ . '/../..' . '/src/CSS.php',
        'Addons\\ContactLink\\ContactLink' => __DIR__ . '/../..' . '/src/ContactLink/ContactLink.php',
        'Addons\\CustomCss\\CustomCss' => __DIR__ . '/../..' . '/src/CustomCss/CustomCss.php',
        'Addons\\CustomScript\\CustomScript' => __DIR__ . '/../..' . '/src/CustomScript/CustomScript.php',
        'Addons\\CustomSorting\\CustomSorting' => __DIR__ . '/../..' . '/src/CustomSorting/CustomSorting.php',
        'Addons\\Editor\\Editor' => __DIR__ . '/../..' . '/src/Editor/Editor.php',
        'Addons\\Editor\\TinyMCE' => __DIR__ . '/../..' . '/src/Editor/TinyMCE.php',
        'Addons\\File\\File' => __DIR__ . '/../..' . '/src/File/File.php',
        'Addons\\File\\SVG' => __DIR__ . '/../..' . '/src/File/SVG.php',
        'Addons\\GlobalSetting\\GlobalSetting' => __DIR__ . '/../..' . '/src/GlobalSetting/GlobalSetting.php',
        'Addons\\Helper' => __DIR__ . '/../..' . '/src/Helper.php',
        'Addons\\LoginSecurity\\IllegalUsers' => __DIR__ . '/../..' . '/src/LoginSecurity/IllegalUsers.php',
        'Addons\\LoginSecurity\\LoginAttempts' => __DIR__ . '/../..' . '/src/LoginSecurity/LoginAttempts.php',
        'Addons\\LoginSecurity\\LoginRestricted' => __DIR__ . '/../..' . '/src/LoginSecurity/LoginRestricted.php',
        'Addons\\LoginSecurity\\LoginSecurity' => __DIR__ . '/../..' . '/src/LoginSecurity/LoginSecurity.php',
        'Addons\\Optimizer\\Font' => __DIR__ . '/../..' . '/src/Optimizer/Font.php',
        'Addons\\Optimizer\\LazyLoad\\Abstract_LazyLoad' => __DIR__ . '/../..' . '/src/Optimizer/LazyLoad/Abstract_LazyLoad.php',
        'Addons\\Optimizer\\LazyLoad\\LazyLoad' => __DIR__ . '/../..' . '/src/Optimizer/LazyLoad/LazyLoad.php',
        'Addons\\Optimizer\\LazyLoad\\LazyLoad_Iframes' => __DIR__ . '/../..' . '/src/Optimizer/LazyLoad/LazyLoad_Iframes.php',
        'Addons\\Optimizer\\LazyLoad\\LazyLoad_Images' => __DIR__ . '/../..' . '/src/Optimizer/LazyLoad/LazyLoad_Images.php',
        'Addons\\Optimizer\\LazyLoad\\LazyLoad_Videos' => __DIR__ . '/../..' . '/src/Optimizer/LazyLoad/LazyLoad_Videos.php',
        'Addons\\Optimizer\\Minify_Html' => __DIR__ . '/../..' . '/src/Optimizer/Minify_Html.php',
        'Addons\\Optimizer\\Optimizer' => __DIR__ . '/../..' . '/src/Optimizer/Optimizer.php',
        'Addons\\Recaptcha\\Recaptcha' => __DIR__ . '/../..' . '/src/Recaptcha/Recaptcha.php',
        'Addons\\Security\\Comment' => __DIR__ . '/../..' . '/src/Security/Comment.php',
        'Addons\\Security\\Readme' => __DIR__ . '/../..' . '/src/Security/Readme.php',
        'Addons\\Security\\Security' => __DIR__ . '/../..' . '/src/Security/Security.php',
        'Addons\\Security\\Xmlrpc' => __DIR__ . '/../..' . '/src/Security/Xmlrpc.php',
        'Addons\\SocialLink\\SocialLink' => __DIR__ . '/../..' . '/src/SocialLink/SocialLink.php',
        'Addons\\ThirdParty\\ACF' => __DIR__ . '/../..' . '/src/ThirdParty/ACF.php',
        'Addons\\ThirdParty\\AcfField\\NavMenu' => __DIR__ . '/../..' . '/src/ThirdParty/AcfField/NavMenu.php',
        'Addons\\ThirdParty\\CF7' => __DIR__ . '/../..' . '/src/ThirdParty/CF7.php',
        'Addons\\ThirdParty\\Faker' => __DIR__ . '/../..' . '/src/ThirdParty/Faker.php',
        'Addons\\ThirdParty\\RankMath' => __DIR__ . '/../..' . '/src/ThirdParty/RankMath.php',
        'Addons\\Woocommerce\\Woocommerce' => __DIR__ . '/../..' . '/src/Woocommerce/Woocommerce.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'MatthiasMullie\\Minify\\CSS' => __DIR__ . '/..' . '/matthiasmullie/minify/src/CSS.php',
        'MatthiasMullie\\Minify\\Exception' => __DIR__ . '/..' . '/matthiasmullie/minify/src/Exception.php',
        'MatthiasMullie\\Minify\\Exceptions\\BasicException' => __DIR__ . '/..' . '/matthiasmullie/minify/src/Exceptions/BasicException.php',
        'MatthiasMullie\\Minify\\Exceptions\\FileImportException' => __DIR__ . '/..' . '/matthiasmullie/minify/src/Exceptions/FileImportException.php',
        'MatthiasMullie\\Minify\\Exceptions\\IOException' => __DIR__ . '/..' . '/matthiasmullie/minify/src/Exceptions/IOException.php',
        'MatthiasMullie\\Minify\\JS' => __DIR__ . '/..' . '/matthiasmullie/minify/src/JS.php',
        'MatthiasMullie\\Minify\\Minify' => __DIR__ . '/..' . '/matthiasmullie/minify/src/Minify.php',
        'MatthiasMullie\\PathConverter\\Converter' => __DIR__ . '/..' . '/matthiasmullie/path-converter/src/Converter.php',
        'MatthiasMullie\\PathConverter\\ConverterInterface' => __DIR__ . '/..' . '/matthiasmullie/path-converter/src/ConverterInterface.php',
        'MatthiasMullie\\PathConverter\\NoConverter' => __DIR__ . '/..' . '/matthiasmullie/path-converter/src/NoConverter.php',
        'Symfony\\Component\\Yaml\\Command\\LintCommand' => __DIR__ . '/..' . '/symfony/yaml/Command/LintCommand.php',
        'Symfony\\Component\\Yaml\\Dumper' => __DIR__ . '/..' . '/symfony/yaml/Dumper.php',
        'Symfony\\Component\\Yaml\\Escaper' => __DIR__ . '/..' . '/symfony/yaml/Escaper.php',
        'Symfony\\Component\\Yaml\\Exception\\DumpException' => __DIR__ . '/..' . '/symfony/yaml/Exception/DumpException.php',
        'Symfony\\Component\\Yaml\\Exception\\ExceptionInterface' => __DIR__ . '/..' . '/symfony/yaml/Exception/ExceptionInterface.php',
        'Symfony\\Component\\Yaml\\Exception\\ParseException' => __DIR__ . '/..' . '/symfony/yaml/Exception/ParseException.php',
        'Symfony\\Component\\Yaml\\Exception\\RuntimeException' => __DIR__ . '/..' . '/symfony/yaml/Exception/RuntimeException.php',
        'Symfony\\Component\\Yaml\\Inline' => __DIR__ . '/..' . '/symfony/yaml/Inline.php',
        'Symfony\\Component\\Yaml\\Parser' => __DIR__ . '/..' . '/symfony/yaml/Parser.php',
        'Symfony\\Component\\Yaml\\Tag\\TaggedValue' => __DIR__ . '/..' . '/symfony/yaml/Tag/TaggedValue.php',
        'Symfony\\Component\\Yaml\\Unescaper' => __DIR__ . '/..' . '/symfony/yaml/Unescaper.php',
        'Symfony\\Component\\Yaml\\Yaml' => __DIR__ . '/..' . '/symfony/yaml/Yaml.php',
        'Symfony\\Polyfill\\Ctype\\Ctype' => __DIR__ . '/..' . '/symfony/polyfill-ctype/Ctype.php',
        'enshrined\\svgSanitize\\ElementReference\\Resolver' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/ElementReference/Resolver.php',
        'enshrined\\svgSanitize\\ElementReference\\Subject' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/ElementReference/Subject.php',
        'enshrined\\svgSanitize\\ElementReference\\Usage' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/ElementReference/Usage.php',
        'enshrined\\svgSanitize\\Exceptions\\NestingException' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/Exceptions/NestingException.php',
        'enshrined\\svgSanitize\\Helper' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/Helper.php',
        'enshrined\\svgSanitize\\Sanitizer' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/Sanitizer.php',
        'enshrined\\svgSanitize\\data\\AllowedAttributes' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/data/AllowedAttributes.php',
        'enshrined\\svgSanitize\\data\\AllowedTags' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/data/AllowedTags.php',
        'enshrined\\svgSanitize\\data\\AttributeInterface' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/data/AttributeInterface.php',
        'enshrined\\svgSanitize\\data\\TagInterface' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/data/TagInterface.php',
        'enshrined\\svgSanitize\\data\\XPath' => __DIR__ . '/..' . '/enshrined/svg-sanitize/src/data/XPath.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit439191ca78e657f2a36e9ce64cd8b583::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit439191ca78e657f2a36e9ce64cd8b583::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit439191ca78e657f2a36e9ce64cd8b583::$classMap;

        }, null, ClassLoader::class);
    }
}
