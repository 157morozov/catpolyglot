const { Router } = require("express")
const router = Router()
const homeController = require("../../controllers/client/home")

const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, homeController.default)

module.exports = router