const jwt = require('jsonwebtoken');
const newToken = require('../utils/common');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const verifyToken = (req, res, next) => {
    try {
    const token = req.cookies.accessToken;
    if (!token) {
       if(newToken(req, res)) {
        return next();
       } else {
        return res.status(401).json('unauthorized');
       }
    } else {
        
        const decoded = jwt.verify(token, "access-token-secret-key");
        req.user = decoded;
        next();
    }
    } catch (error) {
        res.json('unauthorized');
    }
};



module.exports = { verifyToken, upload };