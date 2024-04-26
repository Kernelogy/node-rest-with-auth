const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const PORT = process.env.PORT || 5050
const MONGODB_URL = "mongodb://127.0.0.1:27017/bookhub001"

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log(`${MONGODB_URL} connection Successfull...`)
    })
    .catch((err)=>{
        console.error("Error in connecting to mongodb", err.message)
    })

// const db = mongoose.connection

app.use(express.json())
app.use(cors(
    {
        origin: "*"
    }
))
/*
const uploader = multer({ dest: './public/data/uploads/' })
app.post('/upload', uploader.single('file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    res.status(200).send("File Uploaded Successfully...!")
  });
*/

const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })


const uploader = multer({ storage: storage });


app.post('/upload/single', uploader.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    res.status(200).send("File Uploaded Successfully...!")
});


app.post("/upload/multiple", uploader.array("uploaded_file", 10), (req, res) => {
    console.log(req.files)
    return res.send("Multiple files Uploaded Successfully...!")
  })

app.use("/public", express.static(__dirname + "/public"))

app.use(require("./routes/BookRoute"))
app.use(require("./routes/ProductRoute"))
app.use(require("./routes/IdentifierCustomerRoute"))

//=============================================================
const verifyToken = require("./middleware/AuthMiddleware")
app.use(require("./controller/AuthController"))

app.use("/unprotected", (req,res) => {
  res.status(200).send("This is an unprotected API")
})
app.use("/protected", verifyToken,  (req,res) => {
  res.status(200).send("This is a protected API")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})























