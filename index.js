
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
// const bodyParser = require('body-parser');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const mongodbUrl = process.env['mongodb_url'];
mongoose.connect(mongodbUrl);

app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', "PUT", "DELETE"],
}))
app.use(express.json())
app.use(cookieParser());

app.use('/auth', userRoutes);
app.use('/project', projectRoutes);
app.use('/profile', profileRoutes);
app.use('/skill', skillsRoutes);
app.use('/contact', contactRoutes);
app.use('/', passwordRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});