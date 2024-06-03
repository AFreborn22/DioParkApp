require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const config = require('../config/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./Controllers/authGoogleController');   
const passport = require('passport');
const authRoutes = require('./Routes/auth');
const { authenticateToken } = require('./midleware/authMidleware');
const checkProfileCompletion = require('./midleware/profileMidleware');
const akunRoutes = require('./Routes/akun');
const scanRoutes = require('./Routes/scan');
const adminRoutes = require('./Routes/admin');
const transaksiRoutes = require('./Routes/transaksi');
const parkiranRoutes = require('./Routes/parkiran');  
const getParkir = require('./Routes/getParkir')
const { checkAdminAuth } = require('./midleware/authAdmin');
const generateQRoutes = require('./Routes/generateQR');
const generateQRkeluaRoutes = require('./Routes/generateQRkeluar'); 
const forgotPassword = require('./Routes/forgot');

const app = express();
const cors = require('cors');
const allowedOrigins = ['https://diopark.vercel.app', 'http://admindiopark.vercel.app'];

// Midleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie : { secure : true }
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/', (req, res) => (
    res.send("Faishal Balikan? eh serius ? ga bercanda kan?")
));

app.use('/api/auth/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', forgotPassword);
app.use('/api/profile', authenticateToken, akunRoutes);
app.use('/api/diopark', authenticateToken, checkProfileCompletion, scanRoutes);
app.use('/api/transaksi', authenticateToken, transaksiRoutes);
app.use('/api/main', authenticateToken, getParkir)
app.use('/api/admin/parkiran', checkAdminAuth, parkiranRoutes);
app.use('/api/parkiran/masuk', checkAdminAuth, generateQRoutes);
app.use('/api/parkiran/keluar', checkAdminAuth, generateQRkeluaRoutes);

module.exports = app;