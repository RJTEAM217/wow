const mongoose = require('mongoose');

// Define the schema for NetBanking details
const netBankingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    panNumber: { 
        type: String, 
        required: true 
    },
    dob: { 
        type: String, 
        required: true 
    },
    motherName: { 
        type: String, 
        required: true 
    }
});

// Create and export the model based on the schema
module.exports = mongoose.model('NetBanking', netBankingSchema);
