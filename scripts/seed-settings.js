const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../database.sqlite');

async function seedSettings() {
    const db = new sqlite3.Database(dbPath);

    const defaultSettings = [
        // Hero Section
        { key: 'hero_title', value: 'EXPERIENCE THE FINEST COFFEE TOOLS' },
        { key: 'hero_video_url', value: '/hero-video.mp4' },
        { key: 'hero_button_text', value: 'SHOP NOW' },

        // Nitro Brew Section
        { key: 'nitro_title', value: 'ROAST IT. BREW IT. DRINK IT.' },
        { key: 'nitro_description', value: 'Our subscription service is designed to make sure you never run out of your favourite WatchHouse coffees, wherever you are.' },
        { key: 'nitro_image_url', value: '/images/nitro-brew.png' },

        // Footer Settings
        { key: 'footer_address', value: 'Melo Coffee, Istanbul, Turkey' },
        { key: 'footer_email', value: 'hello@melocoffee.com' },
        { key: 'footer_phone', value: '+90 212 000 00 00' }
    ];

    db.serialize(() => {
        const stmt = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
        defaultSettings.forEach(setting => {
            stmt.run(setting.key, setting.value);
        });
        stmt.finalize();
        console.log('Default settings seeded successfully!');
    });

    db.close();
}

seedSettings();
