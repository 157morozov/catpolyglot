const { Router } = require("express")
const router = Router()
const newsController = require("../../controllers/client/news")

const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, newsController.default)

router.get("/:new_id", cacheMiddleware, newsController.new)

module.exports = router