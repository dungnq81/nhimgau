<?php return array(
    'root' => array(
        'name' => 'mu-plugins/hd-mu',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => '2c8ede6b5e8a7863d1778d7231a63d1398a34ffb',
        'type' => 'library',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'mu-plugins/hd-mu' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'reference' => '2c8ede6b5e8a7863d1778d7231a63d1398a34ffb',
            'type' => 'library',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => '1b5fbfd0ff8484f7cc650978bfce4b8273633341',
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
