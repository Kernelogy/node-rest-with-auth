const Customer = require("../models/CustomerModel")
const Identifier = require("../models/IdentifierModel")

exports.createCustomer = [ (req, res)=>{
    const customer = new Customer({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
      });
      customer.save()
      .then((customer)=>{
        return res.status(200).send(customer)
      })
      .catch((err)=>{
        return res.status(200).send(err.message)
      }) 
}]

const createIdentifier = function(cardCode, customer) {
  const identifier = new Identifier({
    cardCode,
    customer
  });

  return identifier.save();
};

exports.createIdentifierWithCustomer = [(req,res)=>{
    const customerId = customer._id.toString()
    createIdentifier(customerId.substring(0, 10).toUpperCase(), customerId)
    .then((identifier)=>{
        return res.status(200).send(identifier)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })

}]

exports.showAllIdentifiers = [async (req, res)=>{
    try{
        const identifiers = await Identifier.find().populate("customer")

        // const identifiers = await Identifier.find()
        // .populate("customer", "-_id -__v");
        // .select("-__v");
        
        // const identifiers = await Identifier.find()
        // .select("-__v -customer.__v -customer._id");
        return res.status(200).send(identifiers)
    }catch(err){
        return res.status(200).send(err.message)
    }
}]
