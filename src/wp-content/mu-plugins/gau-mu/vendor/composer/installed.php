<?php return array(
    'root' => array(
        'name' => 'mu-plugins/gau-mu',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => 'cf5891db2f50e711092ea009f6783eb5bcf86a4b',
        'type' => 'library',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'mu-plugins/gau-mu' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'reference' => 'cf5891db2f50e711092ea009f6783eb5bcf86a4b',
            'type' => 'library',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => '54f5b5d225a5c90b86985bb4c563e9b284364687',
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
