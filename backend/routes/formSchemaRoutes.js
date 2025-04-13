const express = require('express');
const router = express.Router();
const FormSchema = require('../models/FormSchema');

// Create form schema
router.post('/', async (req, res) => {
  try {
    const form = new FormSchema(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  const forms = await FormSchema.find();
  res.json(forms);
});

// Get single form by ID
router.get('/:id', async (req, res) => {
  const form = await FormSchema.findById(req.params.id);
  res.json(form);
});

module.exports = router;
