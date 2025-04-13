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
  formName: String,
  fields: [fieldSchema],
  createdBy: String, // admin ID
}, { timestamps: true });

module.exports = mongoose.model('FormSchema', formSchema);
