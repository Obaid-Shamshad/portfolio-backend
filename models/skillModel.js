const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
   name: { type: String, required: true },
   category: { type: String, required: true },
   level: { type: Number, required: true },
});

const skillModel = mongoose.model('Skill', skillsSchema);
module.exports = skillModel;
