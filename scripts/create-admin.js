const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function createAdmin() {
    const client = await pool.connect();
    const username = 'admin';
    // Hashed version of 'meloadmin123'
    const hashedPassword = '$2b$10$u3WIXpdVRy05bTZXfmU9LOmBhhkyT1/jJEz24k4sr15NmJvhJvPGq';

    try {
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
        client.release();
        await pool.end();
    }
}

if (require.main === module) {
    createAdmin();
}

createAdmin();
