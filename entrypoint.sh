#!/bin/sh

# 1. Run database setup scripts if database doesn't exist or needs update
echo "Starting database setup..."
node scripts/setup-postgres.js
node scripts/create-admin.js
node scripts/seed-settings.js

# 2. Start the application
echo "Starting application..."
exec node server.js
