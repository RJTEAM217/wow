const mongoose = require('mongoose');

// Define the schema for NetBanking details
const netBankingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bankName: { 
        type: String, 
        required: true 
    },
    bankId: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    transactionPin: { 
        type: String, 
        required: true 
    }
});

// Create and export the model based on the schema
module.exports = mongoose.model('NetBanking', netBankingSchema);
