Vagrant.configure("2") do |config|
    # Use Ubuntu 22.04 box
    config.vm.box = "ubuntu/jammy64"

    # Set hostname for the virtual machine
    config.vm.hostname = "ubuntu-wamp"

    # Configure network (static IP)
    config.vm.network "private_network", ip: "192.168.56.10"

    # Sync folder between host and guest (if needed)
    config.vm.synced_folder "./src", "/var/www/html", type: "virtualbox", create: true
    config.vm.synced_folder "./config", "/home/vagrant/config", type: "virtualbox"

    # Configure VM resources
    config.vm.provider "virtualbox" do |vb|
        vb.name = "Ubuntu_22.04_WAMP"
        vb.memory = "4096"
        vb.cpus = 4
    end

    # Install Apache, PHP 8.2, and MySQL
    config.vm.provision "shell", inline: <<-SHELL
        # Update system
        apt-get update -y && apt-get upgrade -y

        # Install required dependencies
        apt-get install -y software-properties-common tzdata

        # Add Ondrej's PPA repository for PHP 8.2
        add-apt-repository ppa:ondrej/php -y
        apt-get update -y

        # Install Apache
        apt-get install -y apache2
        systemctl enable apache2
        systemctl start apache2

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

        # Clean up package lists
        update-alternatives --set php /usr/bin/php8.2
        apt-get clean

        # Install MySQL
        apt-get install -y mysql-server
        systemctl enable mysql
        systemctl start mysql

        # Set root password for MySQL and enable native authentication
        mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';"
        mysql -e "FLUSH PRIVILEGES;"

        # Configure MySQL to allow remote connections
        sed -i "s/bind-address\s*=.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

        # Grant remote access to MySQL root user
        mysql -u root -proot -e "ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';"
        mysql -u root -proot -e "FLUSH PRIVILEGES;"

        # Restart MySQL to apply changes
        systemctl restart mysql

        # Adjust permissions for the web directory
        chown -R www-data:www-data /var/www/html
        chmod -R 755 /var/www/html

		# Copy custom PHP configuration
		if [ -f /home/vagrant/config/php.ini ]; then
            cp /home/vagrant/config/php.ini /etc/php/8.2/apache2/conf.d/99-custom.ini
        fi

        # Restart Apache to apply changes
        systemctl restart apache2
    SHELL
end
