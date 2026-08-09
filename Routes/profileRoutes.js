const router = require('express').Router();
const { verifyToken, upload } = require('../middleware/middleware');
const { getProfile, updateProfile, uploadCV } = require('../controllers/profileControllers');

router.get('/get-profile', getProfile);
router.put('/update-profile', verifyToken, upload.single('profilePicture'), updateProfile);
router.post('/upload-cv', verifyToken, upload.single('cv'), uploadCV);

module.exports = router;