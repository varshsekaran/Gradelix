const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const StaffSubject = require('../models/StaffSubject'); // adjust if path differs

const analyzeStaffSubjects = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Fetch staff-subject mappings
    const mappings = await StaffSubject.find();

    const result = [];

    mappings.forEach(({ STAFF_NAME, SUBJECT_CODE }) => {
      let pass = 0;
      let fail = 0;

      data.forEach((student) => {
        const mark = parseFloat(student[SUBJECT_CODE]);

        if (!isNaN(mark)) {
          if (mark > 25) pass++;
          else fail++;
        }
      });

      const total = pass + fail;
      const passPercentage = total > 0 ? ((pass / total) * 100).toFixed(2) : '0.00';

      result.push({
        staffName: STAFF_NAME,
        subjectCode: SUBJECT_CODE,
        pass,
        fail,
        passPercentage: `${passPercentage}%`
      });
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing file');
  }
};

router.get('/staff-subject', async (req, res) => {
  try {
    const subjects = await StaffSubject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).send('Failed to fetch staff-subject mapping');
  }
});

// Add this route below your router.get()
router.post('/staff-subject-analysis', upload.single('file'), analyzeStaffSubjects);



module.exports = router;