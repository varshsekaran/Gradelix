const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// ✅ Use all routes BEFORE starting the server
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/caeRoutes'));
app.use('/api', require('./routes/semRoutes'));
app.use('/api', require('./routes/analysis')); // includes your /staff-subject route\
//app.use('/api', require('./routes/staffSubject'));

// ✅ Start the server at the very end
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

