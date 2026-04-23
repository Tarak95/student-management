const mongoose = require('mongoose');
let dbConnection = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log(" Connected to MongoDB"))
    .catch((err) => console.log(" DB Error:", err));
}
module.exports = dbConnection;
