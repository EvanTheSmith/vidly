const express = require('express');
const { Customer, validate } = require('../models/customer');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // bug fix
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })

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
    const {error} = validate(req.body); if (error) return res.status(400).send({ 'error': error.details[0].message });
    const { name, phone, isGold } = req.body; // destructured req.body
    let customer = new Customer({ name, phone, isGold });
    customer = await customer.save(); // re-use customer variable to hold the save result
    res.send(customer); // send resulting customer to the client
});

// PUT (EDIT) one genre
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body); 
    if (error) return res.status(400).send({ 'error': error.details[0].message });
    const { name, phone, isGold } = req.body; // destructured req.body
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name, phone, isGold });
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