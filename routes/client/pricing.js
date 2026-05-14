const { Router } = require("express")
const router = Router()
const pricingController = require("../../controllers/client/pricing")


router.get("/",  pricingController.default)

module.exports = router