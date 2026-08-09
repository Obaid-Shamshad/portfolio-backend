const router = require("express").Router();
const { verifyToken } = require("../middleware/middleware");
const { changePassword, forgotPassword, resetPassword } = require("../controllers/passwordController");

router.post("/password/change-password", verifyToken, changePassword);
router.post("/password/forgot-password", forgotPassword);


module.exports = router;