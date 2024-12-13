<?php return array(
    'root' => array(
        'name' => 'mu-plugins/gau-mu',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => '5b06d0422dad1c5c286e13f650daca70fb4330e8',
        'type' => 'library',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'mu-plugins/gau-mu' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'reference' => '5b06d0422dad1c5c286e13f650daca70fb4330e8',
            'type' => 'library',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => '782fdf596581968ada24d6b3137cc622d08a5bbc',
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
