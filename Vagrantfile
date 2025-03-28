Vagrant.configure("2") do |config|
    # Use Ubuntu 22.04 LTS
    config.vm.box = "ubuntu/jammy64"
    config.vm.box_version = "20241002.0.0"

    # Set hostname for the virtual machine
    config.vm.hostname = "ubuntu-wamp"

    # Configure network (static IP)
    config.vm.network "private_network", ip: "192.168.56.10"

    # Sync folder between host and guest
    config.vm.synced_folder "./src", "/var/www/html", type: "virtualbox", create: true
    config.vm.synced_folder "./config", "/home/vagrant/config", type: "virtualbox"

    # Configure VM resources
    config.vm.provider "virtualbox" do |vb|
        vb.name = "Ubuntu_Jammy_WAMP"
        vb.memory = "4096"
        vb.cpus = 4
    end

    # Install Apache, PHP 8.2, and MySQL
    config.vm.provision "shell", inline: <<-SHELL
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

        # Set root password and enable native authentication
        mysql -uroot -proot -e "
            CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
            ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
            ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
            GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
            FLUSH PRIVILEGES;
        "

        # Configure MySQL to allow remote connections
        sudo sed -i "s/^bind-address\s*=.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

        # Restart MySQL to apply changes
        sudo systemctl restart mysql

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
    SHELL
end
