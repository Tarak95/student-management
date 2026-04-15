require('dotenv').config();
const express = require('express');
const dbConnection = require('./config/dbConnection');
const { createStudentProfile, studentLogin, getStudents } = require('./controllers/studentController');

const app = express();
app.use(express.json());


dbConnection();


app.post('/api/student/register', createStudentProfile);
app.post('/api/student/login', studentLogin);
app.get('/api/student/all', getStudents);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});
