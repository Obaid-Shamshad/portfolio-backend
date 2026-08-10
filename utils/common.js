const jwt = require("jsonwebtoken")

const newToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    let exist = false;
    if (!refreshToken) {
        return exist;
    } else {
        const decoded = jwt.verify(refreshToken, "refresh-token-secret-key");
        req.user = decoded;
        const accessToken = jwt.sign({ id: decoded.id }, "access-token-secret-key", { expiresIn: "10m" });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 10 * 60 * 1000, // 2 minutes in milliseconds
        });
        exist = true;
    }
return exist;
};

module.exports = newToken;