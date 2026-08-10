const profileModel = require('../models/profileModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getProfile = async (req, res) => {
    try {
        const profile = await profileModel.find()
        if (!profile) {
            return res.json({ success: false, message: 'Profile not found' });
        }
        res.json({ success: true, profile });
    } catch (error) {
        res.json({ status: "error", message: error.message });
        console.error('Error fetching profile:', error);
    }
};


const updateProfile = async (req, res) => {

    try {
        let profilePicture = '';
        let publicId = '';
        const { name, bio, about } = req.body;
        const file = req.file;
        const userId = req.user.id;
        const userProfile = await profileModel.findOne({ user: userId });
        if (userProfile) {
            publicId = userProfile.publicId;
            profilePicture = userProfile.profilePicture;
        }



        if (file) {
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
            const base64 = file.buffer.toString('base64');
            const dataURI = `data:${file.mimetype};base64,${base64}`;
            const result = await cloudinary.uploader.upload(dataURI, { folder: 'profiles' });
            profilePicture = result.secure_url;
            publicId = result.public_id;
        }
        const profile = await profileModel.findOneAndUpdate(
            { user: req.user.id },
            { name, bio, about, profilePicture, publicId },
            { returnDocument: 'after', upsert: true }
        );
        return res.json({ success: true, profile });
    } catch (error) {
        console.log(error)
        res.json({ status: "error", message: error.message });
    }
};

const uploadCV = async (req, res) => {
    try {
        const profile = await profileModel.findOne({ user: req.user.id });
        if (!profile) {
            return res.json({ success: false, message: 'Profile not found to store CV' });
        }
        const file = req.file;
        if (!file) {
            return res.json({ success: false, message: 'No file uploaded' });
        }
        if(file.mimetype !== 'application/pdf') {
            return res.json({ success: false, message: 'Only PDF files are allowed' });
        }
      
        const base64 = file.buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${base64}`;
        const result = await cloudinary.uploader.upload(dataURI, { 
            folder: 'cvs',
            resource_type: 'auto',
            public_id: `obaid-cv-${Date.now()}`,
        });
          if (profile.cvPublicId) {
            await cloudinary.uploader.destroy(profile.cvPublicId);
        }
        profile.cvURL = result.secure_url;
        profile.cvPublicId = result.public_id;
        await profile.save();
        return res.json({ success: true, message: 'CV uploaded successfully', cvURL: result.secure_url });
    } catch (error) {
        // console.error('Error uploading CV:', error);
        res.json({ status: "error", message: error.message });
    }
};



module.exports = { getProfile, updateProfile, uploadCV };