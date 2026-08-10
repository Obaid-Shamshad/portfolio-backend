const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.json({success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, "access-token-secret-key", { expiresIn: '1h' });
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000,
        });
        const refreshToken = jwt.sign({ id: user._id }, "refresh-token-secret-key", { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('accessToken', token,
             { 
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hour in milliseconds 
              });
      res.json({success: true, message: 'Login successful', userId: user._id });
    } catch (error) {
        res.json({status: "error", message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({success: true, message: 'User logged out successfully' });
}

const checkLogin = (req, res) => {
    res.json({ success: true, message: 'User is logged in' });
}



module.exports = {  loginUser, logoutUser, checkLogin };
