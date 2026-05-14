const mysql = require("mysql2")

module.exports = function () {
    console.log("/utils/server/migration.js: Migration started");

    const migrationsQueries = [
        `CREATE TABLE IF NOT EXISTS Home ( home_type VARCHAR(50) PRIMARY KEY, home_content VARCHAR(1000) );`,
        `CREATE TABLE IF NOT EXISTS Benifits ( benifit_id INTEGER PRIMARY KEY AUTO_INCREMENT, benifit_title VARCHAR(50), benifit_description VARCHAR(1000), benifit_image TEXT );`,
        `CREATE TABLE IF NOT EXISTS Addresses ( address_id INTEGER PRIMARY KEY AUTO_INCREMENT, address_title VARCHAR(50), address_coords JSON, address_description VARCHAR(1000), address_image TEXT );`,
        `CREATE TABLE IF NOT EXISTS Sales ( sale_type VARCHAR(50) PRIMARY KEY, sale_content VARCHAR(10000) );`,
        `CREATE TABLE IF NOT EXISTS GlobalLinks ( gl_type VARCHAR(50) PRIMARY KEY, gl_link TEXT );`,
        `CREATE TABLE IF NOT EXISTS About ( about_type VARCHAR(50) PRIMARY KEY, about_content VARCHAR(10000) );`,
        `CREATE TABLE IF NOT EXISTS News ( new_id INTEGER PRIMARY KEY AUTO_INCREMENT, new_title VARCHAR(50), new_description VARCHAR(10000), new_mini_description VARCHAR(200), new_image TEXT, new_is_in_slider BOOL DEFAULT FALSE, new_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`,
        `CREATE TABLE IF NOT EXISTS TaxDeduction ( td_type VARCHAR(50) PRIMARY KEY, td_content VARCHAR(10000) );`,
        `CREATE TABLE IF NOT EXISTS Contacts ( contact_type VARCHAR(50) PRIMARY KEY, contact_content VARCHAR(100) );`,
        `CREATE TABLE IF NOT EXISTS Courses ( course_id INTEGER PRIMARY KEY AUTO_INCREMENT, course_title VARCHAR(50), course_description VARCHAR(1000), course_color TEXT, course_parameters JSON );`,
        `CREATE TABLE IF NOT EXISTS Pricing ( pricing_id INTEGER PRIMARY KEY AUTO_INCREMENT, pricing_title VARCHAR(50), pricing_subtitle VARCHAR(50), pricing_price INTEGER, pricing_old_price INTEGER, pricing_parameters JSON );`,
        `CREATE TABLE IF NOT EXISTS Miscs ( misc_type VARCHAR(50) PRIMARY KEY, misc_content VARCHAR(1000) );`,
    ]

    const databaseForMigrations = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })

    migrationsQueries.forEach(query => {
        databaseForMigrations.promise().query(query).catch(error => {
            console.error(`/utils/server/migrations.js: Database table migration error: ${error}`)
        })
    })
}