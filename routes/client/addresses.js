const { Router } = require("express")
const router = Router()
const addressesController = require("../../controllers/client/addresses")


router.get("/",  addressesController.default)

module.exports = router