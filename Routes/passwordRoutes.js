const router = require("express").Router();
const { verifyToken } = require("../middleware/middleware");
const { changePassword, forgotPassword, resetPassword } = require("../controllers/passwordController");

router.post("/change-password", verifyToken, changePassword);
router.post("/forgot-password", forgotPassword);


module.exports = router;