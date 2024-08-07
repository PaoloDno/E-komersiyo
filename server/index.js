const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connDB = require('./config/db.js');

//routes
const userRouter = require('./routes/userRoute.js');
const profileRoutes = require('./routes/profileRoutes');
const storeRoutes = require('./routes/storeRoutes.js');
const productRoutes = require('./routes/productRoutes.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(express.json());
app.use(cors());

// Connect to the db
connDB();

// Routes
app.use('/api/users', userRouter);
app.use('/api/profile', profileRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
