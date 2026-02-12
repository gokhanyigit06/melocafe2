const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function seedSettings() {
    const client = await pool.connect();

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

    try {
        console.log('Seeding settings if empty...');
        for (const setting of defaultSettings) {
            // Postgres uses ON CONFLICT for upserts if unique constraint exists.
            // But here we want INSERT OR IGNORE basically.
            await client.query(
                'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
                [setting.key, setting.value]
            );
        }
        console.log('Settings seeded successfully!');
    } catch (err) {
        console.error('Error seeding settings:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

if (require.main === module) {
    seedSettings();
}

seedSettings();
