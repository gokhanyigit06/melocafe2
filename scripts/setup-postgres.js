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
      console.log(`Attempting to connect to database (Attempt ${retries + 1}/${MAX_RETRIES})...`);
      // pool.connect() check out a client from the pool
      const client = await pool.connect();
      console.log('Successfully connected to database.');
      return client;
    } catch (err) {
      console.error(`Connection failed: ${err.message}`);
      retries++;
      if (retries >= MAX_RETRIES) {
        console.error('Max retries reached. Exiting.');
        throw err;
      }
      console.log(`Waiting ${RETRY_DELAY / 1000} seconds before retrying...`);
      await sleep(RETRY_DELAY);
    }
  }
}

async function setup() {
  let client;
  try {
    client = await connectWithRetry();
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
    if (client) await client.query('ROLLBACK');
    console.error('Error creating tables:', e);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

if (require.main === module) {
  setup();
}
