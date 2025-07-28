// models/SavedSemAnalysis.js
const mongoose = require('mongoose');

const SavedSemAnalysisSchema = new mongoose.Schema({
  name: String,
  year: String,
  semester: String,
  mode: { type: String, default: "semester" },
  subjectStats: mongoose.Schema.Types.Mixed,
  overallPercentage: String,
}, { timestamps: true ,
    collection: 'saved-sem-analysis'
});

module.exports = mongoose.model('SavedSemAnalysis', SavedSemAnalysisSchema, 'saved-sem-analysis');
