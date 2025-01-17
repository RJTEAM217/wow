// controllers/userController.js
const User = require('../models/User');

// Save user data to the database
exports.saveUserData = async (req, res) => {
    try {
        const { name, mobile, aadhar, dob } = req.body;

        const newUser = new User({
            name,
            mobile,
            aadhar,
            dob
        });
        
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting user data"
        });
    }
};

// Get all users from the database
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: err.message
        });
    }
};
