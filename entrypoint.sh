#!/bin/sh
# set -e removed to allow server to start even if setup fails (for debugging 502)

# 1. Run database setup scripts
echo "Starting database setup..."
# Use || true to continue even if script fails
node scripts/setup-postgres.js || echo "WARNING: setup-postgres.js failed"
node scripts/create-admin.js || echo "WARNING: create-admin.js failed"
node scripts/seed-settings.js || echo "WARNING: seed-settings.js failed"

# 2. Start the application
echo "Starting application..."
exec npm start
