const { Router } = require("express")
const router = Router()
const aboutController = require("../../controllers/client/about")


router.get("/",  aboutController.default)

module.exports = router