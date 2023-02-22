const express = require('express');
const Joi = require('joi');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // bug fix
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
const Customer = mongoose.model('Customer', new mongoose.Schema(
    { name: { type: String, required: true }, phone: String, isGold: { type: Boolean, required: true } }
)); // Mongoose Class

function validateCustomer(customer) {
    const schema = { 
        name: Joi.string().required(), 
        phone: Joi.string().required(), 
        isGold: Joi.boolean().required() 
    };
    return Joi.validate(customer, schema);
}

// ROUTES (Express + Mongoose)

// GET all customers
router.get('/', async (req, res) => { 
    const customers = await Customer.find().sort('name');
    res.send(customers); 
});

// GET one customer
router.get('/:id', async (req, res) => { 
    const customer = await Customer.findById(req.params.id);
    if (!customer) res.status(404).send({ 'could not find': req.params.id }); 
    res.send(customer);
});

// POST one customer
router.post('/', async (req, res) => {
    const {error} = validateCustomer(req.body); if (error) return res.status(400).send({ 'error': error.details[0].message });
    let customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
    customer = await customer.save(); // re-use customer variable to hold the save result
    res.send(customer); // send resulting customer to the client
});

// PUT (EDIT) one genre
router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body); 
    if (error) return res.status(400).send({ 'error': error.details[0].message });
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
    if (!customer) return res.status(404).send({ 'could not find': req.params.id });  
    res.send(customer);
});

// DELETE one genre
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send({ 'could not find': req.params.id });
    res.send(customer);
});

module.exports = router;