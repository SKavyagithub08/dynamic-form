const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const formSchemaRoutes = require('./routes/formSchemaRoutes');
const formResponseRoutes = require('./routes/formResponseRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/forms', formSchemaRoutes);
app.use('/api/form-responses', formResponseRoutes); // Register the route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
