const express = require('express');
const router = express.Router();
const SavedSemAnalysis = require('../models/SavedSemAnalysis');

router.post('/save-semester', async (req, res) => {
  try {
    const newSem = new SavedSemAnalysis(req.body);
    await newSem.save();
    res.status(200).json({ message: 'Semester analysis saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save semester analysis', error: err });
  }
});

router.get('/saved-semester', async (req, res) => {
  try {
    const results = await SavedSemAnalysis.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch semester files', error: err });
  }
});

router.post('/compare-semester', async (req, res) => {
  const { id1, id2 } = req.body;
  try {
    const entry1 = await SavedSemAnalysis.findById(id1);
    const entry2 = await SavedSemAnalysis.findById(id2);

    if (!entry1 || !entry2) {
      return res.status(404).json({ message: 'One or both semester entries not found' });
    }

    res.json({ entry1, entry2 });
  } catch (err) {
    res.status(500).json({ message: 'Server error while comparing semester analyses' });
  }
});

module.exports = router;
