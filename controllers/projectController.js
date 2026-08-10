const projectModel = require('../models/projectModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addProject = async (req, res) => {
    let projectUrl = '';
    let publicId = '';
    try {
        const { title, description, liveLink, githubLink } = req.body;
        const file = req.file;
        if (file) {
            const base64 = file.buffer.toString('base64');
            const dataURI = `data:${file.mimetype};base64,${base64}`;
            const result = await cloudinary.uploader.upload(dataURI, { folder: 'projects' });
                projectUrl = result.secure_url;
                publicId = result.public_id;
           
        }

        const newProject = new projectModel({ title, description, liveLink, githubLink, projectUrl, publicId });
        await newProject.save();
        res.json({ success: true, message: 'Project added successfully' });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
        console.error('Error adding project:', error);
    }
};

const editProject = async (req, res) => {
    let projectUrl = '';
    let publicId = '';
    try {
        const { id } = req.params;
        const { title, description, liveLink, githubLink } = req.body;
        const project = await projectModel.findById(id);
        projectUrl = project.projectUrl;
        publicId = project.publicId;

        if (req.file) {
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
            const base64 = req.file.buffer.toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${base64}`;

            const result = await cloudinary.uploader.upload(dataURI, { folder: 'projects' });
            projectUrl = result.secure_url;
            publicId = result.public_id;
        }


        const updatedProject = await projectModel.findByIdAndUpdate(id, { title, description, liveLink, githubLink, projectUrl, publicId }, { returnDocument: 'after' });
        if (!updatedProject) {
            return res.json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.findById(id);
        let publicId = '';
        if (project) {
            publicId = project.publicId;
        }
        await cloudinary.uploader.destroy(publicId);
        const deletedProject = await projectModel.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.json({ success: true, projects });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.findById(id);
        if (!project) {
            return res.json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

module.exports = { addProject, editProject, deleteProject, getProjects, getProject };