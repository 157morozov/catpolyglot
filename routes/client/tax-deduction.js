const { Router } = require("express")
const router = Router()
const taxDeductionController = require("../../controllers/client/tax-deduction")

const cacheMiddleware = require("../../middleware/cache")

router.get("/", cacheMiddleware, taxDeductionController.default)

module.exports = router