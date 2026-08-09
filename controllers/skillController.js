const skillModel = require('../models/skillModel');

const addSkill = async (req, res) => {
    try {
        const { name, category, level } = req.body;   
        const existingSkill = await skillModel.findOne({ name });
        if (existingSkill) {
            return res.json({ success: false, message: 'Skill already exists' });
        }
        const newSkill = new skillModel({ name, category, level });
        await newSkill.save();
        res.json({ success: true, message: 'Skill added successfully' });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const getSkills = async (req, res) => {
    try { 
        const skills = await skillModel.find();
        res.json({ success: true, skills });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const editSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, level } = req.body;
        const updatedSkill = await skillModel.findByIdAndUpdate(id, { name, category, level }, { returnDocument: 'after' });
        if (!updatedSkill) {
            return res.json({ success: false, message: 'Skill not found' });
        }   
        res.json({ success: true, message: 'Skill updated successfully', skill: updatedSkill });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const deleteSkill = async (req, res) => {   
    try {
        const { id } = req.params;
        const deletedSkill = await skillModel.findByIdAndDelete(id);
        if (!deletedSkill) {
            return res.json({ success: false, message: 'Skill not found' });
        }
        res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};

const getSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await skillModel.findById(id);
        if (!skill) {
            return res.json({ success: false, message: 'Skill not found' });
        }
        res.json({ success: true, skill });
    } catch (error) {
        res.json({ status: "error", message: 'Server error' });
    }
};  

module.exports = { addSkill, editSkill, deleteSkill, getSkills, getSkill };