#!/bin/bash

echo "📦 Starting DubaiCareerHub setup..."

# 1. Update and upgrade the system
sudo apt update && sudo apt upgrade -y

# 2. Install Apache web server
sudo apt install apache2 -y

# 3. Allow Apache through the firewall
sudo ufw allow 'Apache'
sudo ufw enable

# 4. Install Certbot for SSL
sudo apt install certbot python3-certbot-apache -y

# 5. Copy website files to the Apache root directory
sudo cp -r ~/dubaicareerhub/* /var/www/html/

# 6. Set correct permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# 7. Restart Apache to apply changes
sudo systemctl restart apache2

# 8. (Optional) Enable Apache to start on boot
sudo systemctl enable apache2

# 9. SSL Setup - Requires to manually enter domain during execution
# Make sure the domain is pointed to this EC2 instance before running!
echo "🌐 Setting up SSL – make sure the domain is pointing to this server!"
sudo certbot --apache

# Done!
echo "✅ DubaiCareerHub deployment completed!"
