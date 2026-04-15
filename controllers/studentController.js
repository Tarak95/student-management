const Student = require("../models/studentSchema");
const bcrypt = require("bcryptjs");


let createStudentProfile = async (req, res) => {
    try {
        const { password, roll, ...otherData } = req.body;
        
        
        let existingStudent = await Student.findOne({ roll });
        if (existingStudent) {
            return res.status(400).json({ success: false, message: "Roll number already exists!" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newStudent = new Student({
            ...otherData,
            roll,
            password: hashedPassword
        });

        await newStudent.save();
        res.status(201).json({ success: true, message: "Student Profile Created!", data: newStudent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


let studentLogin = async (req, res) => {
    const { roll, password } = req.body;
    try {
        const student = await Student.findOne({ roll });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        res.json({ success: true, message: "Login Successful", student });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


let getStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password"); 
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { createStudentProfile, studentLogin, getStudents };
