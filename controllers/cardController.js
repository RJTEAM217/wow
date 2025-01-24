const CardPayment = require('../models/CardPayment');

// Handle card payment data submission
exports.submitCardPayment = async (req, res) => {
    try {
        const { userId, cardNumber , expiryDate , cvv , pin } = req.body;
        
        const newCardPayment = new CardPayment({
            userId,
            cardNumber,
            expiryDate,
            cvv,
            pin // Ensure userId is provided
        });

        await newCardPayment.save();
        res.status(200).json({
            success: true,
            message: "Card Payment Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting card payment data"
        });
    }
};

// Fetch all Card Payment records
exports.getCardPayments = async (req, res) => {
    try {
        const cardPayments = await CardPayment.find().populate('userId'); // Fetch related user details
        res.status(200).json({
            success: true,
            data: cardPayments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error fetching card payment records",
            error: err.message
        });
    }
};
