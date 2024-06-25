const express = require("express")
const {auth, admin} = require("../middleware/auth")
const productController = require("../controllers/productController")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})
const router = express.Router()

router.post("/", auth, admin, upload.single("img"), productController.createProduct)
router.get("/", productController.getAllProduct)
//router.get("/:id", productController.getSingleProduct)
router.put("/:id",upload.single("img"), productController.updateProduct)
//router.delete("/:id", productController.deleteProduct)
// router.get("/featured", productController.getFeaturedProduct)
// router.get("/topSelling", productController.getTopSellingProduct)

module.exports = router