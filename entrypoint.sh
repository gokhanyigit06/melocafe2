#!/bin/sh
# set -e removed to allow server to start even if setup fails (for debugging 502)# Run database setup scripts strictly
echo "⏳ Running database setup..."
node scripts/setup-postgres.js
if [ $? -ne 0 ]; then
  echo "❌ Failed to setup database tables."
  exit 1
fi

echo "⏳ Creating admin user..."
node scripts/create-admin.js
if [ $? -ne 0 ]; then
  echo "❌ Failed to create admin user."
  exit 1
fi

echo "⏳ Seeding default settings..."
node scripts/seed-settings.js
if [ $? -ne 0 ]; then
  echo "⚠️ Failed to seed settings (non-critical)."
fi

# Start the application
echo "✅ Database ready. Starting Next.js..."
exec node server.js
