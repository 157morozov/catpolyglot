const { Router } = require("express")
const router = Router()
const newsController = require("../../controllers/client/news")


router.get("/",  newsController.default)

router.get("/:new_id",  newsController.new)

module.exports = router