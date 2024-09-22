require('dotenv').config();
const cores = require('cors')
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables
require('./config/passport'); // Passport configuration
const express = require('express');


const app = express();
app.use(passport.initialize());
const connectDB = require('./utils/connectDB');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json())
// Middlewares 
const coresOptions = {
    origin: ["http://localhost:5173"],
    // origin: ["https://rajacoded.netlify.app"],
    credentials: true
}
app.use(cores(coresOptions))
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
