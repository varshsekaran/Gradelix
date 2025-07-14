const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HOD = require('../models/Dean');

// Register HOD
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await HOD.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Dean already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newHOD = new HOD({ email, password: hashedPassword });
    await newHOD.save();

    res.status(201).json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login HOD
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hod = await HOD.findOne({ email });
    if (!hod) return res.status(400).json({ msg: 'HOD not found' });

    const isMatch = await bcrypt.compare(password, hod.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: hod._id }, process.env.JWT_SECRET);
    res.json({ token, hod: { id: hod._id, email: hod.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
