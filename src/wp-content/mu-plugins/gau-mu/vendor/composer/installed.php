<?php return array(
    'root' => array(
        'name' => 'mu-plugins/gau-mu',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => '80e136cd8ce176f1d23b960ea42a75917f239840',
        'type' => 'library',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'mu-plugins/gau-mu' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'reference' => '80e136cd8ce176f1d23b960ea42a75917f239840',
            'type' => 'library',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => 'fff26f7a91a7458bf6eea5afdd71b4aba1f1d3ea',
            'type' => 'metapackage',
            'install_path' => null,
            'aliases' => array(
                0 => '9999999-dev',
            ),
            'dev_requirement' => true,
        ),
        'roots/wp-password-bcrypt' => array(
            'pretty_version' => '1.2.0',
            'version' => '1.2.0.0',
            'reference' => 'bd26ab98aa646d88ce98c76e365d16259c5227a2',
            'type' => 'library',
            'install_path' => __DIR__ . '/../roots/wp-password-bcrypt',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
    ),
);
