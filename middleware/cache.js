const nodeCache = require("node-cache")
const cache = new nodeCache()

const cacheExpireTime = 3600 // 5min
const databaseTables = ["Home", "Benifits", "Addresses", "Sales", "GlobalLinks", "About", "News", "TaxDeduction", "Contacts", "Courses", "Pricing", "Miscs"]

function isAllTablesInCache(tables, cache) {
    if (cache) {
        tables.forEach(table => {
            if (!(Object.keys(cache).includes(table))) return false
        })
        return true
    }
    return false
}

module.exports = function (req, res, next, table_to_recache = null) {
    if (isAllTablesInCache(databaseTables, cache.get("database")) && !table_to_recache) {
        req.cache = cache.get("database")
        next()
    } else {
        console.log("/middleware/cache.js: Cache are writing");
        let dataFromDatabaseTables = {}

        if (table_to_recache) {
            dataFromDatabaseTables = cache.get("database")
            if (typeof table_to_recache === "object") {
                table_to_recache.forEach((_table_to_recache, index) => {
                    req.database.promise().query(`SELECT * FROM ${_table_to_recache}`).then(result => {
                        if (_table_to_recache === "News") {
                            if (typeof result[0] === "object") {
                                dataFromDatabaseTables[_table_to_recache] = result[0].reverse()
                            } else dataFromDatabaseTables[_table_to_recache] = result[0]
                        } else dataFromDatabaseTables[_table_to_recache] = result[0]
                        dataFromDatabaseTables[_table_to_recache] = result[0]
                        cache.set("database", dataFromDatabaseTables, cacheExpireTime)
                        req.cache = cache.get("database")
                        if (index + 1 === table_to_recache.length) next()
                    }).catch(error => {
                        console.error(`/middleware/cache.js: Database table select error: ${error}`)
                        res.status(500).send(`Database table select error: ${error}`)
                        next()
                    })
                })
            } else {
                req.database.promise().query(`SELECT * FROM ${table_to_recache}`).then(result => {
                    if (table_to_recache === "News") {
                        if (typeof result[0] === "object") {
                            dataFromDatabaseTables[table_to_recache] = result[0].reverse()
                        } else dataFromDatabaseTables[table_to_recache] = result[0]
                    } else dataFromDatabaseTables[table_to_recache] = result[0]
                    dataFromDatabaseTables[table_to_recache] = result[0]
                    cache.set("database", dataFromDatabaseTables, cacheExpireTime)
                    req.cache = cache.get("database")
                    next()
                }).catch(error => {
                    console.error(`/middleware/cache.js: Database table select error: ${error}`)
                    res.status(500).send(`Database table select error: ${error}`)
                    next()
                })
            }
        } else {
            databaseTables.forEach((table, index) => {
                req.database.promise().query(`SELECT * FROM ${table}`).then(result => {
                    if (table === "News") {
                        if (typeof result[0] === "object") {
                            dataFromDatabaseTables[table] = result[0].reverse()
                        } else dataFromDatabaseTables[table] = result[0]
                    } else dataFromDatabaseTables[table] = result[0]
                    if (index + 1 == databaseTables.length) {
                        cache.set("database", dataFromDatabaseTables, cacheExpireTime)
                        req.cache = cache.get("database")
                        next()
                    }
                }).catch(error => {
                    console.error(`/middleware/cache.js: Database table select error: ${error}`)
                    res.status(500).send(`Database table select error: ${error}`)
                    next()
                })
            })
        }
    }
}