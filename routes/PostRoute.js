const express = require("express")
const router = express.Router()

const PostController = require("../controller/PostController")
const Post = require("../models/PostModel")

router.post("/post/insert", PostController.insert)
router.post("/post/insertWithImages", PostController.insertWithImages)
router.post("/post/addImage", PostController.addImage)
router.get("/post/list", PostController.list)

module.exports = router