const router = require('express').Router();
const { verifyToken, upload } = require('../middleware/middleware');
const { editProject, addProject, deleteProject, getProjects, getProject } = require('../controllers/projectController');



router.post("/add-project", verifyToken, upload.single('projectImage'), addProject);
router.put("/edit-project/:id", verifyToken, upload.single('projectImage'), editProject);
router.delete("/delete-project/:id", verifyToken, deleteProject);
router.get("/get-projects", getProjects);
router.get("/get-project/:id", getProject);


module.exports = router;