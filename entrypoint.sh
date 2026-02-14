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

# Ensure persistent uploads directory exists
echo "📁 Setting up persistent uploads directory..."
mkdir -p /app/data/uploads

# Copy any existing uploads from public/uploads to data/uploads (one-time migration)
if [ -d "/app/public/uploads" ] && [ "$(ls -A /app/public/uploads 2>/dev/null)" ]; then
  echo "📦 Migrating existing uploads to persistent storage..."
  cp -n /app/public/uploads/* /app/data/uploads/ 2>/dev/null || true
fi

# Start the application
echo "✅ Database ready. Starting Next.js..."
exec node server.js
