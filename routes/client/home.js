const { Router } = require("express")
const router = Router()
const homeController = require("../../controllers/client/home")


router.get("/",  homeController.default)

module.exports = router