const { Router } = require("express")
const router = Router()

const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + "/public/img/uploaded")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const imageUpload = multer({
    storage: storage
})

const authMiddleware = require("../../middleware/auth")
const cacheMiddleware = require("../../middleware/cache")

const loginController = require("../../controllers/admin/login")
const homeController = require("../../controllers/admin/home")

const editController = require("../../controllers/admin/edit")

router.get("/", authMiddleware, cacheMiddleware, homeController.default)

router.get("/login", cacheMiddleware, loginController.login)
router.post("/auth", cacheMiddleware, loginController.auth)
router.post("/logout", cacheMiddleware, loginController.logout)

// About
router.get("/edit/about", authMiddleware, cacheMiddleware, editController.about)
router.post("/edit/table/Home/update/general", authMiddleware, cacheMiddleware, imageUpload.single("misc_content"), editController.editTableHomeUpdate)
router.post("/edit/table/GlobalLinks/insert", authMiddleware, cacheMiddleware, editController.editTableGlobalLinksInsert)
router.post("/edit/table/GlobalLinks/truncate", authMiddleware, cacheMiddleware, editController.editTableGlobalLinksTruncate)
router.post("/edit/table/GlobalLinks/delete/:gl_type", authMiddleware, cacheMiddleware, editController.editTableGlobalLinksDelete)
router.post("/edit/table/Contacts/insert", authMiddleware, cacheMiddleware, editController.editTableContactsInsert)
router.post("/edit/table/Contacts/truncate", authMiddleware, cacheMiddleware, editController.editTableContactsTruncate)
router.post("/edit/table/Contacts/delete/:contact_type", authMiddleware, cacheMiddleware, editController.editTableContactsDelete)
router.post("/edit/table/About/update/general", authMiddleware, cacheMiddleware, editController.editTableAboutUpdate)
router.post("/edit/table/TaxDeduction/update/general", authMiddleware, cacheMiddleware, editController.editTableTaxDeductionUpdate)
router.post("/edit/table/Addresses/insert", authMiddleware, cacheMiddleware, imageUpload.single("address_image"), editController.editTableAddressesInsert)
router.post("/edit/table/Addresses/truncate", authMiddleware, cacheMiddleware, editController.editTableAddressesTruncate)
router.post("/edit/table/Addresses/delete/:address_id", authMiddleware, cacheMiddleware, editController.editTableAddressesDelete)

// Courses
router.get("/edit/courses", authMiddleware, cacheMiddleware, editController.courses)
router.post("/edit/table/Benifits/insert", authMiddleware, cacheMiddleware, imageUpload.single("benifit_image"), editController.editTableBenifitsInsert)
router.post("/edit/table/Benifits/truncate", authMiddleware, cacheMiddleware, editController.editTableBenifitsTruncate)
router.post("/edit/table/Benifits/delete/:benifit_id", authMiddleware, cacheMiddleware, editController.editTableBenifitsDelete)
router.post("/edit/table/Courses/insert", authMiddleware, cacheMiddleware, editController.editTableCoursesInsert)
router.post("/edit/table/Courses/truncate", authMiddleware, cacheMiddleware, editController.editTableCoursesTruncate)
router.post("/edit/table/Courses/delete/:course_id", authMiddleware, cacheMiddleware, editController.editTableCoursesDelete)
router.post("/edit/table/Sales/update/general", authMiddleware, cacheMiddleware, editController.editTableSalesUpdate)
router.post("/edit/table/Pricing/insert", authMiddleware, cacheMiddleware, editController.editTablePricingInsert)
router.post("/edit/table/Pricing/truncate", authMiddleware, cacheMiddleware, editController.editTablePricingTruncate)
router.post("/edit/table/Pricing/delete/:pricing_id", authMiddleware, cacheMiddleware, editController.editTablePricingDelete)

// Pricing
router.get("/edit/pricing", authMiddleware, cacheMiddleware, editController.pricing)

// News
router.get("/edit/news", authMiddleware, cacheMiddleware, editController.news)
router.get("/edit/news/create", authMiddleware, cacheMiddleware, editController.newCreate)
router.get("/edit/news/:new_id", authMiddleware, cacheMiddleware, editController.new)
router.post("/edit/table/News/insert", authMiddleware, cacheMiddleware, imageUpload.single("new_image"), editController.editTableNewsInsert)
router.post("/edit/table/News/update/:new_id", authMiddleware, cacheMiddleware, imageUpload.single("new_image"), editController.editTableNewsUpdate)
router.post("/edit/table/News/delete/:new_id", authMiddleware, cacheMiddleware, editController.editTableNewsDelete)

module.exports = router