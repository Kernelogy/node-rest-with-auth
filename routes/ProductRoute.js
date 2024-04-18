const express = require("express")
const router = express.Router()

const ProductController = require("../controller/ProductController")

router.post("/product/insert", ProductController.insert)
router.get("/product/like/:id", ProductController.like)
router.get("/product/find/:id", ProductController.find)
router.get("/product/list", ProductController.list)
router.get("/product/findByPriceGreater/:price", ProductController.findByPriceGreater)
router.get("/product/findByPriceLesser/:price", ProductController.findByPriceLesser)
router.post("/product/findByPriceBetween", ProductController.findByPriceBetween)

module.exports = router