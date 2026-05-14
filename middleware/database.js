const pool = require("../utils/server/database")

module.exports = function (req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("/middleware/database.js: Error getting database connection:", err.stack);
            return next(err);
        }
        req.database = connection;
        res.on('finish', () => {
            connection.release();
        });
        next();
    });
};
