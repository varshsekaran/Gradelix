const mongoose = require('mongoose');

const SavedAnalysisSchema = new mongoose.Schema({
  name: String,
  year: String,
  semester: String,
  cae: String,
  mode: String,
  subjectStats: Object,
}, { timestamps: true,
  collection: 'saved-cae-analysis',
 },
);

module.exports = mongoose.model('SavedAnalysis', SavedAnalysisSchema);
