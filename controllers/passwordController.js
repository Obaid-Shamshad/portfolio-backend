const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const forgotPassword = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};



module.exports = { changePassword, forgotPassword };