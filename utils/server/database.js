const path = require("path");
const Database = require("better-sqlite3");

const dbPath = process.env.SQLITE_PATH || path.join(process.cwd(), "database.sqlite");
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("busy_timeout = 5000");

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        try {
            const statement = sqlite.prepare(sql.trim());
            const command = sql.trim().split(/\s+/)[0].toUpperCase();

            if (command === "SELECT") {
                resolve([statement.all(params), undefined]);
                return;
            }

            const result = statement.run(params);
            resolve([result, undefined]);
        } catch (error) {
            reject(error);
        }
    });
}

function selectTablesSnapshot(tables) {
    return new Promise((resolve, reject) => {
        try {
            const tx = sqlite.transaction((tableNames) => {
                const payload = {};
                tableNames.forEach((table) => {
                    payload[table] = sqlite.prepare(`SELECT * FROM ${table}`).all();
                });
                return payload;
            });
            resolve([tx(tables), undefined]);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    promise() {
        return { query, selectTablesSnapshot };
    },
};
