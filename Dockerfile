# Use Ubuntu 22.04 image
FROM ubuntu:22.04

# Set environment to non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Ho_Chi_Minh
ENV APACHE_LOG_DIR=/var/log/apache2

# Update system and install basic packages
RUN apt update && apt install -y \
    software-properties-common \
    tzdata \
    && apt clean

# Add Ondrej's PPA repository to install PHP
RUN add-apt-repository ppa:ondrej/php \
    && apt update

# Install Apache2, PHP 8.2, and necessary modules
RUN apt install -y \
    apache2 \
    #curl \
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
    -o Dpkg::Options::="--force-confold" \
    && apt clean

# Enable required Apache modules
RUN a2enmod rewrite proxy proxy_http

# Configure OPcache for performance
RUN echo "opcache.memory_consumption=256" >> /etc/php/8.2/apache2/php.ini && \
    echo "opcache.interned_strings_buffer=16" >> /etc/php/8.2/apache2/php.ini && \
    echo "opcache.max_accelerated_files=20000" >> /etc/php/8.2/apache2/php.ini && \
    echo "opcache.revalidate_freq=0" >> /etc/php/8.2/apache2/php.ini && \
    echo "opcache.validate_timestamps=0" >> /etc/php/8.2/apache2/php.ini && \
    echo "opcache.max_wasted_percentage=5" >> /etc/php/8.2/apache2/php.ini && \
    echo "opcache.enable_cli=1" >> /etc/php/8.2/apache2/php.ini

# If you have created a virtual host configuration file, enable it (if needed)
# RUN a2ensite 000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache when the container starts
CMD ["apachectl", "-D", "FOREGROUND"]