const { Router } = require("express")
const router = Router()
const pricingController = require("../../controllers/client/pricing")

const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, pricingController.default)

module.exports = router