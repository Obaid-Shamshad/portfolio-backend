const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken} = require('../middleware/middleware');
const { editSkill, addSkill, deleteSkill, getSkills, getSkill } = require('../controllers/skillController');

router.get("/get-skills", getSkills);
router.post("/addSkill", verifyToken, addSkill);
router.put("/edit-skill/:id", verifyToken, editSkill);
router.delete("/delete-skill/:id", verifyToken, deleteSkill);
router.get("/get-skill/:id", getSkill);

module.exports = router;