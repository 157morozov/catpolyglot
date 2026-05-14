const { Router } = require("express")
const router = Router()
const coursesController = require("../../controllers/client/courses")

const databaseMiddleware = require("../../middleware/database")

router.get("/",  coursesController.default)

module.exports = router