/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require('pg');
// require('dotenv').config(); // Removed for production env usage

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 seconds

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWithRetry() {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            console.log(`[create-admin] Attempting to connect to database (Attempt ${retries + 1}/${MAX_RETRIES})...`);
            const client = await pool.connect();
            console.log('[create-admin] Successfully connected to database.');
            return client;
        } catch (err) {
            console.error(`[create-admin] Connection failed: ${err.message}`);
            retries++;
            if (retries >= MAX_RETRIES) {
                console.error('[create-admin] Max retries reached. Exiting.');
                throw err;
            }
            console.log(`[create-admin] Waiting ${RETRY_DELAY / 1000} seconds before retrying...`);
            await sleep(RETRY_DELAY);
        }
    }
}

async function createAdmin() {
    let client;
    try {
        client = await connectWithRetry();
        const username = 'admin';
        // Hashed version of 'meloadmin123'
        const hashedPassword = '$2b$10$u3WIXpdVRy05bTZXfmU9LOmBhhkyT1/jJEz24k4sr15NmJvhJvPGq';

        console.log('Checking admin user in PostgreSQL...');

        // Check if admin exists
        const res = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (res.rows.length > 0) {
            console.log('Admin user already exists.');
        } else {
            // Insert admin
            await client.query(
                'INSERT INTO users (name, username, password) VALUES ($1, $2, $3)',
                ['Admin', username, hashedPassword]
            );
            console.log('Admin user created successfully!');
            console.log('Username:', username);
            console.log('Password (plain): meloadmin123');
        }
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        if (client) client.release();
        await pool.end();
    }
}

if (require.main === module) {
    createAdmin();
}
