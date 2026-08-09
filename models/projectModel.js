const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveLink: { type: String },
    githubLink: { type: String },
    projectUrl: { type: String, required: true },  
    publicId: { type: String, required: true },
});

const projectModel = mongoose.model('Project', projectSchema);
module.exports = projectModel;