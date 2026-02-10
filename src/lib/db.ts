import sqlite3 from "sqlite3";
import path from "path";

const dbPath = process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.join(process.cwd(), "database.sqlite");

console.log(`Using database at: ${dbPath}`);

const dbInstance = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Could not connect to database", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

export const db = {
    query: (sql: string, params: any[] = []): Promise<{ rows: any[] }> => {
        return new Promise((resolve, reject) => {
            // Convert PostgreSQL style $1, $2 to SQLite ? style if necessary, 
            // though I will use ? in my queries going forward.
            const normalizedSql = sql.replace(/\$\d+/g, "?");
            const isReadOrReturning = normalizedSql.trim().toUpperCase().startsWith("SELECT") ||
                normalizedSql.trim().toUpperCase().includes("RETURNING");

            if (isReadOrReturning) {
                dbInstance.all(normalizedSql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve({ rows });
                });
            } else {
                dbInstance.run(normalizedSql, params, function (err) {
                    if (err) reject(err);
                    // For INSERT/UPDATE/DELETE, we don't usually have rows unless it's RETURNING
                    // SQLite supports RETURNING in recent versions. dbInstance.run doesn't return rows.
                    // We'll use dbInstance.all for everything to be safe if RETURNING is needed.
                    else resolve({ rows: [] });
                });
            }
        });
    },
    // Specific helper for cases where we need RETURNING rows
    all: (sql: string, params: any[] = []): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const normalizedSql = sql.replace(/\$\d+/g, "?");
            dbInstance.all(normalizedSql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};
