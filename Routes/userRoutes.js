const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/middleware');
const { registerUser, loginUser, logoutUser, checkLogin } = require('../controllers/userController');


router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.get('/check-login', verifyToken, checkLogin);

module.exports = router;