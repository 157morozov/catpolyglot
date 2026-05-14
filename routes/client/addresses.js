const { Router } = require("express")
const router = Router()
const addressesController = require("../../controllers/client/addresses")

const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, addressesController.default)

module.exports = router