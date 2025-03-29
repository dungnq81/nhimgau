Vagrant.configure("2") do |config|
    # Use Ubuntu 22.04 LTS
    config.vm.box = "ubuntu/jammy64"
    config.vm.box_version = "20241002.0.0"

    # Set hostname for the virtual machine
    config.vm.hostname = "ubuntu-wamp"

    # Forward port 8080 on host to port 80 on guest
    config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true

    # Sync folders between host and guest
    config.vm.synced_folder "./src", "/var/www/html", type: "virtualbox", create: true
    config.vm.synced_folder "./config", "/home/vagrant/config", type: "virtualbox"

    # Configure VM resources
    config.vm.provider "virtualbox" do |vb|
        vb.name = "Ubuntu_WAMP"
        vb.memory = "4096"
        vb.cpus = 4
    end

  # Run shell provisioning script
  config.vm.provision "shell", path: "bash/provision.sh"
end
