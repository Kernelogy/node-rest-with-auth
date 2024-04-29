const express = require("express")
const router = express.Router()

const IndentifierCustomerController = require("../controller/IdentifierCustomerController")

router.post("/customer/insert", IndentifierCustomerController.createCustomer)
router.post("/identifier/insert", IndentifierCustomerController.createIdentifierWithCustomer)



router.get("/indentifier/list", IndentifierCustomerController.showAllIdentifiers)

module.exports = router