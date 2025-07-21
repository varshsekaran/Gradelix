const express = require('express');
const router = express.Router();
const SavedAnalysis = require('../models/SavedAnalysis');

// Save CAE Analysis
router.post('/save-cae', async (req, res) => {
  try {
    const newEntry = new SavedAnalysis(req.body);
    await newEntry.save();
    res.status(201).send('Analysis saved');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all saved CAE analysis
router.get('/saved-cae', async (req, res) => {
  try {
    const data = await SavedAnalysis.find({ mode: 'cae' }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get single saved analysis by ID
router.get('/saved-cae/:id', async (req, res) => {
  try {
    const entry = await SavedAnalysis.findById(req.params.id);
    res.json(entry);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
