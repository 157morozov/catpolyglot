const database = require("../utils/server/database");

module.exports = function (req, _res, next) {
    req.database = database;
    next();
};
