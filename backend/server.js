const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/perfume-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Perfume Shop API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
