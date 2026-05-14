const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("/utils/server/database.js: Error connecting to the database:", err.stack);
        return;
    }
    console.log("/utils/server/database.js: Connected to database as ID", connection.threadId);
    connection.release();
});

module.exports = pool;