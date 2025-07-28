const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temporary storage

const staffSubjectSchema = new mongoose.Schema({
  'SUBJECT CODE': String,
  'STAFF NAME': String
}, { collection: 'staff-subject' });

module.exports = mongoose.model('StaffSubject', staffSubjectSchema, 'staff-subject');
