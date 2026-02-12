import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

// Create a connection pool using the DATABASE_URL environment variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export const db = {
    query: async (sql: string, params: any[] = []): Promise<{ rows: any[] }> => {
        // Helper to convert '?' to '$1', '$2', etc. for PostgreSQL compatibility
        // if the query uses '?' placeholders.
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);

        // If the code already used $1, $2, this won't break it assuming mixed usage isn't happening in a weird way.
        // Ideally we should stick to one, but this attempts backward compatibility.

        try {
            const result = await pool.query(pgSql, params);
            return { rows: result.rows };
        } catch (error) {
            console.error('Database query error:', error, '\nSQL:', pgSql);
            throw error;
        }
    },
};

