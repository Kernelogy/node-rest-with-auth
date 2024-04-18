const express = require("express")
const router = express.Router()

const BookController = require("../controller/BookController")

router.post("/book/insert", BookController.insert)
router.get("/book/list", BookController.list)
router.get("/book/find/:id", BookController.find)
router.delete("/book/delete/:id", BookController.delete)
router.post("/book/update/:id", BookController.update)

module.exports = router