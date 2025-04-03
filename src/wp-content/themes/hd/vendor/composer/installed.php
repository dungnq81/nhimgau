<?php return array(
    'root' => array(
        'name' => 'themes/hd',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => '7c3f3aeb103df08761d84d4447be633c62a4b449',
        'type' => 'project',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => '0b51a6c830ba6dd6c63715ceded239a62bf2274f',
            'type' => 'metapackage',
            'install_path' => null,
            'aliases' => array(
                0 => '9999999-dev',
            ),
            'dev_requirement' => true,
        ),
        'themes/hd' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'reference' => '7c3f3aeb103df08761d84d4447be633c62a4b449',
            'type' => 'project',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
    ),
);
