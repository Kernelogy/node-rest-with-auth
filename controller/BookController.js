const Book = require("../models/BookModel")
const {body, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator");


exports.list = [(req, res)=>{

    Book.find()
    .then((books)=>{
        return res.status(200).send(books)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

// const validateForEmpty = () => {
//     return body("title").isLength({min: 1}).withMessage("Title cannot be emty")
// }

exports.insert = [
    body("title").trim().isLength({min: 1}).withMessage("Title cannot be empty"),
    body("title").trim().isAlphanumeric().withMessage("Title can contain only letters"),
    body("description").trim().isLength({min: 10}).withMessage("Cannot be less than 10 characters"),
    body("isbn").trim().isLength({min: 1}).withMessage("ISBN cannot be empty")
    .custom((value)=>{
        return Book.findOne({isbn: value})
        .then((book)=>{
            if(book)
            return Promise.reject("ISBN already exists")
        })
    }),
    // sanitizeBody("title").escape(),
    // sanitizeBody("description").escape(),
    // sanitizeBody("isbn").escape(),
    (req, res)=>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(200).send(errors.array())
        }else{
            const book = new Book({
                title: req.body.title,
                description: req.body.description,
                isbn: req.body.isbn
            })
        
            book.save()
            .then((book)=>{
                return res.status(200).send(book)
            })
            .catch((err)=>{
                return res.status(200).send(err.message)
            })
        }  

}]

exports.find = [(req, res)=>{

    Book.find({_id: req.params.id})
    .then((books)=>{
        return res.status(200).send(books)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.delete = [(req, res)=>{

    Book.deleteOne({_id: req.params.id})
    .then(()=>{
        return res.status(200).send("Success")
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]

exports.update = [(req, res)=>{

    Book.updateOne(
        {_id: req.params.id}, 
        {$set: {
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn
        }}
    )
    .then((book)=>{
        return res.status(200).send(book)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]