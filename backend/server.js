const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const formSchemaRoutes = require('./routes/formSchemaRoutes');
const formResponseRoutes = require('./routes/formResponseRoutes');

const app = express();

app.use(cors({
  origin: "https://dynamic-form-frontend.onrender.com", // ✅ correct frontend URL
  credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/forms', formSchemaRoutes);
app.use('/api/form-responses', formResponseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
