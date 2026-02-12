/* eslint-disable @typescript-eslint/no-require-imports */
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(process.cwd(), "database.sqlite");
const dbInstance = new sqlite3.Database(dbPath);

async function testAuth() {
    const username = 'admin';
    const password = 'admin';

    try {
        const user = await new Promise((resolve, reject) => {
            dbInstance.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log("User found in test:", user ? "Yes" : "No");
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            console.log("Password match in test:", match);
        }
    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        dbInstance.close();
    }
}

testAuth();
