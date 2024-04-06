require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('./Controllers/authGoogleController'); 
const authRoutes = require('./Routes/auth');
const { authenticateToken } = require('./Midleware/authMidleware');
const akunRoutes = require('./Routes/akun');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: 'localhost',
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

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi session
app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticateToken, akunRoutes);

app.get('/', (req, res) => (
    res.send("五条悟だから最強なのか、それとも五条悟が最強なのか。")
));

app.post('/add', (req, res) => {
    res.json({
        message: "woyyy",
    });
});

app.listen(port, () => {
    console.log(`jalan di ${port}`);
});
