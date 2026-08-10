
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/userRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const skillsRoutes = require('./Routes/skillRoutes');
const passwordRoutes = require('./Routes/passwordRoutes');
const contactRoutes = require('./Routes/contactRoutes');


const app = express();

const mongodbUrl = process.env['mongodb_url'];
mongoose.connect(mongodbUrl);
app.use(cors({ 
    origin: 'https://portfolio-frontend-three-sand.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', "PUT", "DELETE"],
}))
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', userRoutes);
app.use('/project', projectRoutes);
app.use('/profile', profileRoutes);
app.use('/skill', skillsRoutes);
app.use('/contact', contactRoutes);
app.use('/password', passwordRoutes);


module.exports = app;
