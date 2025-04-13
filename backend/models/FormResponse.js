const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },
  responses: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('FormResponse', formResponseSchema);
