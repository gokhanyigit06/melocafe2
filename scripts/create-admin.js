const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.join(__dirname, '../database.sqlite');

async function createAdmin() {
    const db = new sqlite3.Database(dbPath);
    const username = 'admin';
    // Hashed version of 'meloadmin123' to avoid bcryptjs dependency at runtime
    const hashedPassword = '$2b$10$qAeivF3oo1h0Ri2Scsg2J.CpO6Y1NPUKXpLMCOnIC1OTa6b38RdzC';

    console.log('Using database at:', dbPath);

    db.serialize(() => {
        // Delete existing admin to be sure
        db.run('DELETE FROM users WHERE username = ?', [username], function (err) {
            if (err) console.error('Error deleting:', err);

            // Now insert the new one
            db.run(
                'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
                ['Admin', username, hashedPassword],
                function (err) {
                    if (err) {
                        console.error('Error creating admin:', err);
                    } else {
                        console.log('Admin user updated successfully!');
                        console.log('Username:', username);
                        console.log('Password (plain): meloadmin123');
                    }
                    db.close();
                }
            );
        });
    });
}

createAdmin();
