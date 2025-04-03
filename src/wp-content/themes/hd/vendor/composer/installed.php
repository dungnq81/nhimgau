<?php return array(
    'root' => array(
        'name' => 'themes/hd',
        'pretty_version' => 'dev-master',
        'version' => 'dev-master',
        'reference' => '857515bfa495199102fc732431bcf682e01e5fbb',
        'type' => 'project',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'roave/security-advisories' => array(
            'pretty_version' => 'dev-latest',
            'version' => 'dev-latest',
            'reference' => '7d7e09f5c5ae97767252450bdae6bc4ec6b8f53a',
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
            'reference' => '857515bfa495199102fc732431bcf682e01e5fbb',
            'type' => 'project',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
    ),
);
