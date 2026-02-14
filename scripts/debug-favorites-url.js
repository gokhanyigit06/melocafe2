
const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://postgres:password@localhost:5435/melo",
});

async function run() {
    await client.connect();
    try {
        const result = await client.query("SELECT * FROM settings WHERE key LIKE 'fav%_image'");
        console.log("Favorite Images in DB:");
        result.rows.forEach(r => console.log(`${r.key}: ${r.value}`));
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

run();
