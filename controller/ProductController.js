const Product = require("../models/ProductModel")
const apiResponse = require("../helphers/apiResponse")

exports.insert = [(req, res)=>{
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        likes: req.body.likes
    })
    product.save()
    .then((product)=>{
        // return apiResponse.responseWithData(res, product, "Insert Success")
        return apiResponse.responseWithoutData(res, "Insert Success")
        // return res.status(200).send(product)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.list = [(req, res)=>{

    Product.find()
    .then((products)=>{
        return res.status(200).send(products)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.find = [(req, res)=>{

    Product.find({_id: req.params.id})
    .then((product)=>{
        return res.status(200).send(product)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.like = [(req, res)=>{
    Product.updateOne(
        {_id: req.params.id},
        {$inc: {
            likes: 1
       }}
    )
    .then((product)=>{
        res.status(200).send(product)
    })
    .catch((err)=>{
        res.status(200).send(err.message)
    })
}]

exports.findByPriceGreater = [(req, res)=>{
    Product.find({price:{
        $gt: req.params.price
    }})
    .then((product)=>{
        return res.status(200).send(product)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]
exports.findByPriceLesser = [(req, res)=>{
    Product.find({price:{
        $lt: req.params.price
    }})
    .then((product)=>{
        return res.status(200).send(product)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.findByPriceBetween = [(req, res)=>{
    // Product.find({$and:[
    //     {$not:
    //         {price:{
    //             $gte: req.body.gte
    //         }}
    //     },
    //     {price:{
    //         $lte: req.body.lte
    //     }}
    // ]})
    Product.find({$and:[
        {price:{
            $gte: req.body.gte
        }},
        {price:{
            $lte: req.body.lte
        }}
    ]})
    .then((product)=>{
        return res.status(200).send(product)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })   
}]