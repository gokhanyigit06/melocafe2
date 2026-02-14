
const { db } = require("./src/lib/db");

async function checkSettings() {
    try {
        const res = await db.query("SELECT * FROM settings WHERE key LIKE 'fav%_image'");
        console.log("Favorite Images in DB:");
        res.rows.forEach(r => console.log(`${r.key}: ${r.value}`));
    } catch (e) {
        console.error(e);
    }
}

checkSettings();
