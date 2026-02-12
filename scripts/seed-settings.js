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
            console.log(`[seed-settings] Attempting to connect to database (Attempt ${retries + 1}/${MAX_RETRIES})...`);
            const client = await pool.connect();
            console.log('[seed-settings] Successfully connected to database.');
            return client;
        } catch (err) {
            console.error(`[seed-settings] Connection failed: ${err.message}`);
            retries++;
            if (retries >= MAX_RETRIES) {
                console.error('[seed-settings] Max retries reached. Exiting.');
                throw err;
            }
            console.log(`[seed-settings] Waiting ${RETRY_DELAY / 1000} seconds before retrying...`);
            await sleep(RETRY_DELAY);
        }
    }
}

async function seedSettings() {
    let client;
    try {
        client = await connectWithRetry();

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

        console.log('Seeding settings if empty...');
        for (const setting of defaultSettings) {
            await client.query(
                'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
                [setting.key, setting.value]
            );
        }
        console.log('Settings seeded successfully!');
    } catch (err) {
        console.error('Error seeding settings:', err);
    } finally {
        if (client) client.release();
        await pool.end();
    }
}

if (require.main === module) {
    seedSettings();
}
