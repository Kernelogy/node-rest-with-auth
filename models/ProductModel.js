var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	title: 			{type: String, required: true},
	description: 	{type: String, required: true},
	price:			{type: Number, required: true, default: 0.0},
    likes:          {type: Number, default: 0},
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema); 