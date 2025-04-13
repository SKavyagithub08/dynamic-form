const express = require('express');
const router = express.Router();
const FormSchema = require('../models/FormSchema');

// Create form schema
router.post("/", async (req, res) => {
  try {
    const { formName, fields } = req.body; // ✅ Ensure 'formName' is extracted

    const newForm = new FormSchema({ formName, fields }); // ✅ Save 'formName'
    await newForm.save();

    res.status(201).json(newForm); // ✅ Return the saved form, including 'formName'
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await FormSchema.find(); // ✅ Fetch all forms, including 'formName'
    res.json(forms); // ✅ Return the forms
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single form by ID
router.get('/:id', async (req, res) => {
  const form = await FormSchema.findById(req.params.id);
  res.json(form);
});

module.exports = router;
