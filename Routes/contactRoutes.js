const router = require("express").Router();
const { sendMessage } = require("../controllers/contactController");


router.post("/sendMessage", sendMessage);

module.exports = router;