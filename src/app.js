require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const config = require('../config/config');
const cookieParser = require('cookie-parser');
require('./Controllers/authGoogleController');
const passport = require('passport');
const cors = require('cors');
const setupSwagger = require('./docs/swagger');

// Routes
const authRoutes = require('./Routes/auth');
const akunRoutes = require('./Routes/akun');
const scanRoutes = require('./Routes/scan');
const adminRoutes = require('./Routes/admin');
const transaksiRoutes = require('./Routes/transaksi');
const parkiranRoutes = require('./Routes/parkiran');
const getParkir = require('./Routes/getParkir');
const generateQRoutes = require('./Routes/generateQR');
const generateQRkeluaRoutes = require('./Routes/generateQRkeluar');
const forgotPassword = require('./Routes/forgot');


// Middleware
const { authenticateToken } = require('./midleware/authMidleware');
// const checkProfileCompletion = require('./midleware/profileMidleware');
const { checkAdminAuth } = require('./midleware/authAdmin');

const app = express();
const allowedOrigins = ['https://diopark.vercel.app', 'https://admindiopark.vercel.app'];

// CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Handle preflight requests
app.options('*', (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.sendStatus(204);
});

setupSwagger(app);
// Other Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure : true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Sequelize Initialization
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Routes
app.use('/api', adminRoutes);
app.use('/api', authRoutes);
app.use('/api', forgotPassword);
app.use('/api', authenticateToken, akunRoutes);
app.use('/api', authenticateToken, scanRoutes);
app.use('/api', authenticateToken, transaksiRoutes);
app.use('/api', authenticateToken, getParkir);
app.use('/api', checkAdminAuth, parkiranRoutes);
app.use('/api', checkAdminAuth, generateQRoutes);
app.use('/api', checkAdminAuth, generateQRkeluaRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;