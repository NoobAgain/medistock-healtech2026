#!/bin/sh
set -e

if [ ! -f /var/www/html/vendor/autoload.php ]; then
    echo "Running composer install..."
    composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts
fi

exec "$@"
