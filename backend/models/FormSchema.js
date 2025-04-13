const mongoose = require('mongoose'); 

const fieldSchema = new mongoose.Schema({
  label: String,
  type: String, // text, date, select, etc.
  required: Boolean,
  validation: Object, // { regex, min, max }
  options: [String], // for select, radio
  conditional: Object // { fieldName, value }
});

const formSchema = new mongoose.Schema({
  formName: { type: String, required: true }, // ✅ Ensure 'formName' exists and is required
  fields: [fieldSchema],
  createdBy: String, // Optional field
}, { timestamps: true });

module.exports = mongoose.model('FormSchema', formSchema);
