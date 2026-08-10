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
        const token = jwt.sign({ id: user._id }, "access-token-secret-key", { expiresIn: '10m' });
        const refreshToken = jwt.sign({ id: user._id }, "refresh-token-secret-key", { expiresIn: '5h' });
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 10 * 60 * 1000,
        });h
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 5 * 60 * 60 * 1000,
        });
      res.json({success: true, message: 'Login successful', userId: user._id });
    } catch (error) {
        res.json({status: "error", message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.json({success: true, message: 'User logged out successfully' });
}

const checkLogin = (req, res) => {
    res.json({ success: true, message: 'User is logged in' });
}



module.exports = {  loginUser, logoutUser, checkLogin };
