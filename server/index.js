const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connDB = require('./config/db.js');
const userRouter = require('./routes/userRoute.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to the database
connDB();

// Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
