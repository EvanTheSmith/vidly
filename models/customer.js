// Customer Model
// to be imported by App.js

const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema( // Mongoose Class
    { name: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    isGold: { type: Boolean, default: false } }
)); 

function validateCustomer(customer) {
    const schema = { 
        name: Joi.string().required(), 
        phone: Joi.string().required(), 
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;