#!/bin/bash

# Set non-interactive mode to avoid prompts
export DEBIAN_FRONTEND=noninteractive

# Update and upgrade system
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y software-properties-common tzdata debconf-utils wget curl unzip git

# Add Ondrej's PPA for PHP 8.2
sudo add-apt-repository ppa:ondrej/php -y
sudo apt-get update -y

# Ensure .bashrc exists
[ ! -f /home/vagrant/.bashrc ] && touch /home/vagrant/.bashrc

# Set alias for wp-cli if not already set
grep -qxF "alias wp='/var/www/html/vendor/bin/wp'" /home/vagrant/.bashrc || echo "alias wp='/var/www/html/vendor/bin/wp'" >> /home/vagrant/.bashrc
grep -qxF "export PATH=\$PATH:/var/www/html/vendor/bin" /home/vagrant/.bashrc || echo "export PATH=\$PATH:/var/www/html/vendor/bin" >> /home/vagrant/.bashrc

# Install Apache
echo "Installing Apache..."
sudo apt-get install -y apache2
sudo systemctl enable --now apache2

# Install PHP 8.2 and required extensions
sudo apt-get install -y \
    php8.2 \
    php8.2-mysql \
    php8.2-curl \
    libapache2-mod-php8.2 \
    php8.2-cli \
    php8.2-common \
    php8.2-zip \
    php8.2-gd \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-bcmath \
    -o Dpkg::Options::="--force-confdef" \
    -o Dpkg::Options::="--force-confold"

# Set PHP 8.2 as default
sudo update-alternatives --set php /usr/bin/php8.2

# Preconfigure MySQL root password
echo "mysql-server mysql-server/root_password password root" | sudo debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | sudo debconf-set-selections

# Install MySQL
echo "Installing MySQL..."
sudo apt-get install -y mysql-server
sudo systemctl enable --now mysql
sleep 5

# Wait until MySQL is active
until systemctl is-active --quiet mysql; do
    sleep 2
done

# Modify MySQL bind-address
if [ -f /etc/mysql/mysql.conf.d/mysqld.cnf ]; then
    echo "Modifying MySQL bind-address..."
    sudo sed -i 's/^bind-address\s*=.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
    sleep 2

    grep -q "^bind-address = 0.0.0.0" /etc/mysql/mysql.conf.d/mysqld.cnf || echo "bind-address = 0.0.0.0" | sudo tee -a /etc/mysql/mysql.conf.d/mysqld.cnf > /dev/null

    sudo systemctl restart mysql
    sudo mysqladmin ping --silent || (echo "MySQL not running!" && exit 1)
else
    echo "Error: MySQL configuration file not found!"
fi

# Configure MySQL users and database
mysql -uroot -proot <<EOF
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS nhimgau
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_520_ci;
EOF

echo "Database 'nhimgau' has been created (or already exists) with utf8mb4 charset and utf8mb4_unicode_520_ci collation."

# Adjust web directory permissions
echo "Adjusting web directory permissions..."
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Copy Apache site config if exists
if [ -f /home/vagrant/config/default.conf ]; then
    sudo cp /home/vagrant/config/default.conf /etc/apache2/sites-available/999-default.conf
    sudo a2ensite 999-default.conf
fi

# Copy php.ini config if exists
if [ -f /home/vagrant/config/php.ini ]; then
    sudo cp /home/vagrant/config/php.ini /etc/php/8.2/apache2/conf.d/99-php.ini
    sudo chmod 644 /etc/php/8.2/apache2/conf.d/99-php.ini
fi

# Install Composer if not already installed
if ! [ -x "$(command -v composer)" ]; then
    echo "Installing Composer..."
    curl -sS https://getcomposer.org/installer | php
    sudo mv composer.phar /usr/local/bin/composer
    sudo chmod +x /usr/local/bin/composer
fi

# Install WP CLI dependencies if needed
echo "Installing WP CLI dependencies..."
if [ -f /var/www/html/composer.json ]; then
    cd /var/www/html && composer install
fi

# Download and extract phpMyAdmin
echo "Downloading phpMyAdmin..."
wget -q https://files.phpmyadmin.net/phpMyAdmin/5.2.2/phpMyAdmin-5.2.2-all-languages.tar.gz -O /tmp/phpmyadmin.tar.gz
tar -xzf /tmp/phpmyadmin.tar.gz -C /var/www/
mv /var/www/phpMyAdmin-5.2.2-all-languages /var/www/phpmyadmin

# Set permissions
sudo chown -R www-data:www-data /var/www/phpmyadmin
sudo chmod -R 755 /var/www/phpmyadmin

# Copy phpMyAdmin config if exists
if [ -f /home/vagrant/config/config.inc.php ]; then
    sudo cp /home/vagrant/config/config.inc.php /var/www/phpmyadmin/config.inc.php
    sudo chmod 644 /var/www/phpmyadmin/config.inc.php
fi

# Setup phpMyAdmin VirtualHost
if [ -f /home/vagrant/config/phpmyadmin.conf ]; then
    sudo cp /home/vagrant/config/phpmyadmin.conf /etc/apache2/sites-available/phpmyadmin.conf
    sudo a2ensite phpmyadmin.conf
fi

# Ensure Apache listens on port 8081
grep -q "Listen 8081" /etc/apache2/ports.conf || echo "Listen 8081" | sudo tee -a /etc/apache2/ports.conf

# Enable modules and reload Apache
sudo a2enmod php8.2
sudo a2enmod rewrite
sudo systemctl reload apache2

# Clean up
sudo apt-get clean

# Final messages
echo "Provisioning complete!"
echo "Homepage: http://localhost:8080"
echo "phpMyAdmin: http://localhost:8081"
echo "Remember to run 'source ~/.bashrc' inside the VM after 'vagrant ssh'"
