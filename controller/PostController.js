const Post = require("../models/PostModel")

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

exports.list = [(req,res)=>{
    Post.find()
    .then((posts)=>{
        return res.status(200).send(posts)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]