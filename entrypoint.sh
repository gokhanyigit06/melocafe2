#!/bin/sh
set -e

# 1. Run database setup scripts
# The 'set -e' option ensures that if any of these scripts fail, 
# the entire deployment stops and restarts, preventing the app from starting in a broken state.
echo "Starting database setup..."
node scripts/setup-postgres.js
node scripts/create-admin.js
node scripts/seed-settings.js

# 2. Start the application
echo "Starting application..."
exec node server.js
