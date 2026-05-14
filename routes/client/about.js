const { Router } = require("express")
const router = Router()
const aboutController = require("../../controllers/client/about")

const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, aboutController.default)

module.exports = router