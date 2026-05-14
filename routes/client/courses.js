const { Router } = require("express")
const router = Router()
const coursesController = require("../../controllers/client/courses")

const databaseMiddleware = require("../../middleware/database")
const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, coursesController.default)

module.exports = router