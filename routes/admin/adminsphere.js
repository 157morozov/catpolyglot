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

const loginController = require("../../controllers/admin/login")
const homeController = require("../../controllers/admin/home")

const editController = require("../../controllers/admin/edit")

router.get("/", authMiddleware,  homeController.default)

router.get("/login",  loginController.login)
router.post("/auth",  loginController.auth)
router.post("/logout",  loginController.logout)

// About
router.get("/edit/about", authMiddleware,  editController.about)
router.post("/edit/table/Home/update/general", authMiddleware,  imageUpload.fields([{ name: "misc_content", maxCount: 1 }, { name: "misc_logo", maxCount: 1 }]), editController.editTableHomeUpdate)
router.post("/edit/table/GlobalLinks/insert", authMiddleware,  editController.editTableGlobalLinksInsert)
router.post("/edit/table/GlobalLinks/truncate", authMiddleware,  editController.editTableGlobalLinksTruncate)
router.post("/edit/table/GlobalLinks/delete/:gl_type", authMiddleware,  editController.editTableGlobalLinksDelete)
router.post("/edit/table/Contacts/insert", authMiddleware,  editController.editTableContactsInsert)
router.post("/edit/table/Contacts/truncate", authMiddleware,  editController.editTableContactsTruncate)
router.post("/edit/table/Contacts/delete/:contact_type", authMiddleware,  editController.editTableContactsDelete)
router.post("/edit/table/About/update/general", authMiddleware,  editController.editTableAboutUpdate)
router.post("/edit/table/TaxDeduction/update/general", authMiddleware,  editController.editTableTaxDeductionUpdate)
router.post("/edit/table/Addresses/insert", authMiddleware,  imageUpload.single("address_image"), editController.editTableAddressesInsert)
router.post("/edit/table/Addresses/truncate", authMiddleware,  editController.editTableAddressesTruncate)
router.post("/edit/table/Addresses/delete/:address_id", authMiddleware,  editController.editTableAddressesDelete)

// Courses
router.get("/edit/courses", authMiddleware,  editController.courses)
router.post("/edit/table/Benifits/insert", authMiddleware,  imageUpload.single("benifit_image"), editController.editTableBenifitsInsert)
router.post("/edit/table/Benifits/truncate", authMiddleware,  editController.editTableBenifitsTruncate)
router.post("/edit/table/Benifits/delete/:benifit_id", authMiddleware,  editController.editTableBenifitsDelete)
router.post("/edit/table/Courses/insert", authMiddleware,  editController.editTableCoursesInsert)
router.post("/edit/table/Courses/truncate", authMiddleware,  editController.editTableCoursesTruncate)
router.post("/edit/table/Courses/delete/:course_id", authMiddleware,  editController.editTableCoursesDelete)
router.post("/edit/table/Sales/update/general", authMiddleware,  editController.editTableSalesUpdate)
router.post("/edit/table/Pricing/insert", authMiddleware,  editController.editTablePricingInsert)
router.post("/edit/table/Pricing/truncate", authMiddleware,  editController.editTablePricingTruncate)
router.post("/edit/table/Pricing/delete/:pricing_id", authMiddleware,  editController.editTablePricingDelete)

// Pricing
router.get("/edit/pricing", authMiddleware,  editController.pricing)

// News
router.get("/edit/news", authMiddleware,  editController.news)
router.get("/edit/news/create", authMiddleware,  editController.newCreate)
router.get("/edit/news/:new_id", authMiddleware,  editController.new)
router.post("/edit/table/News/insert", authMiddleware,  imageUpload.single("new_image"), editController.editTableNewsInsert)
router.post("/edit/table/News/update/:new_id", authMiddleware,  imageUpload.single("new_image"), editController.editTableNewsUpdate)
router.post("/edit/table/News/delete/:new_id", authMiddleware,  editController.editTableNewsDelete)

module.exports = router