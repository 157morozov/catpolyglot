const { Router } = require("express")
const router = Router()
const taxDeductionController = require("../../controllers/client/tax-deduction")


router.get("/",  taxDeductionController.default)

module.exports = router