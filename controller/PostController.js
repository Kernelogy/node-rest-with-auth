const Post = require("../models/PostModel")
const Comment = require("../models/CommentModel")

exports.insert = [(req,res)=>{
    const post = new Post({
        title: req.body.title,
        author: req.body.author
    })
    post.save()
    .then((post)=>{
        return res.status(200).send(post)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]
exports.insertWithImages = [(req,res)=>{
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        images: req.body.images
    })
    post.save()
    .then((post)=>{
        return res.status(200).send(post)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.addImage = [(req, res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{
            images: req.body.image
        }
    },{ new: true, useFindAndModify: false })
    .then((post)=>{
        return res.status(200).send(post)
    })
    .catch((err)=>{
        res.status(200).send(err.message)
    })
}]

exports.addComment = [(req, res)=>{

    const comment = new Comment({
        username: req.body.comment.username,
        text: req.body.comment.text,
        createdAt: Date.now()
    })

    comment.save()
    .then((comment)=>{
        Post.findByIdAndUpdate(req.body.postId, {
            $push:{
                comments: comment._id
            }
        },{ new: true, useFindAndModify: false })
        .then((post)=>{
            return res.status(200).send(post)
        })
        .catch((err)=>{
            return res.status(200).send(err.message)
        })
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })

}]

exports.list = [(req,res)=>{
    Post.find()
    .then((posts)=>{
        return res.status(200).send(posts)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.listPage = [(req,res)=>{
      // define page
      let page

      if(req.query.page){
          page = parseInt(req.query.page)    
      }else{
          page = 1
      }

      // define limit per page
      const limit = 30
      const skip = (page - 1) * limit

    Post.find().sort("title").skip(skip).limit(limit)
    .then((posts)=>{
        return res.status(200).send(posts)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]


exports.listWithComments = [(req, res)=>{
    Post.find().populate("comments")
    .then((posts)=>{
        return res.status(200).send(posts)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]