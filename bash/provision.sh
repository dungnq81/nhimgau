#!/bin/bash

# Update system
sudo apt-get update -y && sudo apt-get upgrade -y

# Install required dependencies
sudo apt-get install -y software-properties-common tzdata debconf-utils

# Add Ondrej's PPA repository for PHP 8.2
add-apt-repository ppa:ondrej/php -y
sudo apt-get update -y

# Install Apache
apt-get install -y apache2
systemctl enable --now apache2

# Install PHP 8.2 and required extensions
apt-get install -y \
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
update-alternatives --set php /usr/bin/php8.2

# Preconfigure MySQL password to avoid interactive prompt
echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections

# Install MySQL
apt-get install -y mysql-server
systemctl enable --now mysql
sleep 5

# Ensure MySQL service is running before applying changes
echo "Waiting for MySQL to start..."
until systemctl is-active --quiet mysql; do
    sleep 2
done

# Ensure the MySQL configuration file exists before modifying
if [ -f /etc/mysql/mysql.conf.d/mysqld.cnf ]; then
    echo "Modifying MySQL bind-address..."
    sudo sed -i 's/^bind-address\s*=.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
    sleep 2

    # Verify if the modification was successful
    if grep -q "^bind-address = 0.0.0.0" /etc/mysql/mysql.conf.d/mysqld.cnf; then
        echo "MySQL bind-address successfully updated!"
    else
        echo "Failed to update MySQL bind-address. Retrying..."
        echo "bind-address = 0.0.0.0" | sudo tee -a /etc/mysql/mysql.conf.d/mysqld.cnf > /dev/null
    fi

    # Restart MySQL to apply changes
    sudo systemctl restart mysql
else
    echo "Error: MySQL configuration file not found!"
fi

# Set root password and enable native authentication
mysql -uroot -proot -e "
    CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
    ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
"

# Adjust permissions for the web directory
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html

# Copy custom PHP configuration if exists
if [ -f /home/vagrant/config/php.ini ]; then
    cp /home/vagrant/config/php.ini /etc/php/8.2/apache2/conf.d/99-custom.ini
    chmod 644 /etc/php/8.2/apache2/conf.d/99-custom.ini
fi

# Restart Apache to apply changes
sudo systemctl restart apache2

# Clean up package lists
sudo apt-get clean
