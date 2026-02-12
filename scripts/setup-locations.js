const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function setup() {
    // Locations table is already created in setup-postgres.js
    // This script is kept for compatibility or future seeding
    console.log('Locations setup checked (handled in main setup).');
    await pool.end();
}

if (require.main === module) {
    setup();
}

setup();
