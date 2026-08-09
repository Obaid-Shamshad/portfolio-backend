const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    bio: { type: String },
    about: { type: String },
    cvURL: { type: String },
    profilePicture: { type: String },
    cvPublicId: { type: String },
    publicId: { type: String },
});

const profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel;
