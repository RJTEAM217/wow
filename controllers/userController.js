const User = require('../models/User');

// Save user data to the database and return the userId
exports.saveUserData = async (req, res) => {
    try {
        const { mobile, mPin} = req.body;

        // Create a new user instance
        const newUser = new User({
            mobile,
            mPin
        });

        // Save user data in the database
        await newUser.save();

        // Send success response with userId
        res.status(200).json({
            success: true,
            message: "User Data Submitted Successfully!",
            data: { userId: newUser._id.toString() }
            // userId: newUser._id.toString()// Include the generated userId in the response
        });
    } catch (error) {
        console.error(error);

        // Handle any errors
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting user data",
            error: error.message
        });
    }
};

// Get all users from the database
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Send success response with user data
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error(err);

        // Handle any errors
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: err.message
        });
    }
};