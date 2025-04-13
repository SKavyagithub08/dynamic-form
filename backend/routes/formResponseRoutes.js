const express = require('express');
const router = express.Router();
const FormResponse = require('../models/FormResponse'); // Adjust the path if needed

// POST /api/form-responses
router.post('/', async (req, res) => {
  try {
    const { formId, responses } = req.body;
    const newResponse = new FormResponse({ formId, responses });
    await newResponse.save();
    res.status(201).json({ message: 'Form response saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save form response' });
  }
});

module.exports = router;
