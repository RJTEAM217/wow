// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet'); 
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const Notification = require('./models/Notification');
const connectDB = require('./config/dbConfig');

dotenv.config();


app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notification', notificationRoutes);


// Route to render the dashboard
app.get('/dashboard', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        const notifications = await Notification.find(); // Fetch all notifications
        res.render('dashboard', { users, notifications });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error loading dashboard');
    }
});
// In your server.js or relevant routes file
app.get('/settings', async (req, res) => {
    try {
        const admin = await Admin.findOne(); // Get admin record
        const adminPhoneNumber = admin ? admin.phoneNumber : '';
        res.render('settings', { adminPhoneNumber }); // Default empty if no record
        
        // Pass adminPhoneNumber to the settings view
         // Pass the phone number to the EJS view
    } catch (err) {
        console.error('Error loading settings:', err);
        res.status(500).send('Error loading settings');
    }
});
// server.js mein settings route

// Basic route for testing
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
