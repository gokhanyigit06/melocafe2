const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.sqlite');

async function createAdmin() {
    const db = new sqlite3.Database(dbPath);
    const username = 'admin';
    const password = 'meloadmin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing admin to be sure
    db.run('DELETE FROM users WHERE username = ?', [username], function (err) {
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
                    console.log('Password:', password);
                }
                db.close();
            }
        );
    });
}

createAdmin();
