const database = require("./database");

module.exports = function () {
    console.log("/utils/server/migration.js: Migration started");

    const migrationsQueries = [
        `CREATE TABLE IF NOT EXISTS Home ( home_type TEXT PRIMARY KEY, home_content TEXT );`,
        `CREATE TABLE IF NOT EXISTS Benifits ( benifit_id INTEGER PRIMARY KEY AUTOINCREMENT, benifit_title TEXT, benifit_description TEXT, benifit_image TEXT );`,
        `CREATE TABLE IF NOT EXISTS Addresses ( address_id INTEGER PRIMARY KEY AUTOINCREMENT, address_title TEXT, address_coords TEXT, address_description TEXT, address_image TEXT );`,
        `CREATE TABLE IF NOT EXISTS Sales ( sale_type TEXT PRIMARY KEY, sale_content TEXT );`,
        `CREATE TABLE IF NOT EXISTS GlobalLinks ( gl_type TEXT PRIMARY KEY, gl_link TEXT );`,
        `CREATE TABLE IF NOT EXISTS About ( about_type TEXT PRIMARY KEY, about_content TEXT );`,
        `CREATE TABLE IF NOT EXISTS News ( new_id INTEGER PRIMARY KEY AUTOINCREMENT, new_title TEXT, new_description TEXT, new_mini_description TEXT, new_image TEXT, new_is_in_slider INTEGER DEFAULT 0, new_created_at TEXT DEFAULT CURRENT_TIMESTAMP );`,
        `CREATE TABLE IF NOT EXISTS TaxDeduction ( td_type TEXT PRIMARY KEY, td_content TEXT );`,
        `CREATE TABLE IF NOT EXISTS Contacts ( contact_type TEXT PRIMARY KEY, contact_content TEXT );`,
        `CREATE TABLE IF NOT EXISTS Courses ( course_id INTEGER PRIMARY KEY AUTOINCREMENT, course_title TEXT, course_description TEXT, course_color TEXT, course_parameters TEXT );`,
        `CREATE TABLE IF NOT EXISTS Pricing ( pricing_id INTEGER PRIMARY KEY AUTOINCREMENT, pricing_title TEXT, pricing_subtitle TEXT, pricing_price INTEGER, pricing_old_price INTEGER, pricing_parameters TEXT );`,
        `CREATE TABLE IF NOT EXISTS Miscs ( misc_type TEXT PRIMARY KEY, misc_content TEXT );`,
    ];

    migrationsQueries.forEach((query) => {
        database.promise().query(query).catch((error) => {
            console.error(`/utils/server/migrations.js: Database table migration error: ${error}`);
        });
    });
};
