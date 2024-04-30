const express = require("express")
const router = express.Router()

const PostController = require("../controller/PostController")
const Post = require("../models/PostModel")
const verifyToken = require("../middleware/AuthMiddleware")

router.post("/post/insert",  PostController.insert)
router.post("/post/insertWithImages", PostController.insertWithImages)
router.post("/post/addImage", PostController.addImage)
router.get("/post/list", PostController.listPage)
router.post("/post/addComment", PostController.addComment)
router.get("/post/listWithComments", PostController.listWithComments)

module.exports = router