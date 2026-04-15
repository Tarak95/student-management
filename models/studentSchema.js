const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: Number, required: true, unique: true },
    age: { type: Number },
    fatherName: { type: String },
    motherName: { type: String },
    class: { type: String, required: true },
    paymentDate: { type: String },
    bloodGroup: { type: String },
    parentsPhoneNumber: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
