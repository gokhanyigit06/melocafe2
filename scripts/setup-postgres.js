const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function setup() {
    const client = await pool.connect();
    try {
        console.log('Running setup for PostgreSQL...');

        await client.query('BEGIN');

        // Users
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Posts
        await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        cover_image TEXT,
        published BOOLEAN DEFAULT FALSE,
        view_count INTEGER DEFAULT 0,
        author_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Services
        await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        price REAL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Media
        await client.query(`
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        type TEXT NOT NULL,
        size INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Site Settings
        await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Locations
        await client.query(`
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            address TEXT,
            description TEXT,
            image_url TEXT,
            directions_url TEXT,
            tag TEXT,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

        await client.query('COMMIT');
        console.log('Tables created successfully in PostgreSQL');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Error creating tables:', e);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

if (require.main === module) {
    setup();
}
