const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'admin-dean' });

module.exports = mongoose.model('Dean', hodSchema);
