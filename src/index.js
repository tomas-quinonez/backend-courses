// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const db = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const levelRoutes = require('./routes/levelRoutes');
const modalityRoutes = require('./routes/modalityRoutes');

dotenv.config();

// Connect to the database
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Error connecting to database:', err));

const app = express();
const PORT = process.env.PORT || 3000;

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/todos', todoRoutes);
app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/levels', levelRoutes);
app.use('/modalities', modalityRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});