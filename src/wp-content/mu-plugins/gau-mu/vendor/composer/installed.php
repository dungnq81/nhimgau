<?php return array(
    'root' => array(
        'name' => 'mu-plugins/gau-mu',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => 'e4d7a83a9801d42c5cf97c30cf3b70007f91977c',
        'type' => 'library',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'mu-plugins/gau-mu' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'reference' => 'e4d7a83a9801d42c5cf97c30cf3b70007f91977c',
            'type' => 'library',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => '233f7c395ac3b83e3c85aa304f3350bf8897aca5',
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
