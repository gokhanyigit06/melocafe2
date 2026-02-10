const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.join(__dirname, '../database.sqlite');

async function setup() {
    const db = new sqlite3.Database(dbPath);

    db.serialize(() => {
        console.log('Adding locations table to SQLite...');

        db.run(`
            CREATE TABLE IF NOT EXISTS locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                address TEXT,
                description TEXT,
                image_url TEXT,
                directions_url TEXT,
                tag TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Locations table created successfully.');
    });

    db.close();
}

setup();
