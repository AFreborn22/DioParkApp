require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('./Controllers/authGoogleController'); 
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
const port = process.env.PORT || 3000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
const sequelize = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'parkingmonitoring',
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
app.get('/', (req, res) => (
    res.send("五条悟だから最強なのか、それとも五条悟が最強なのか。")
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

app.listen(port, () => {
    console.log(`Berjalan di port ${port}`);
});