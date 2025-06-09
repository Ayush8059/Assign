require('dotenv').config();
const express= require('express');

const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');
// Connect to MongoDB


const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://localhost:5173'
}))
// Middleware to parse JSON and URL-encoded data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.use('/api/bank-match', require('./routes/bankRoutes'));
app.use('upload', express.static('uploads'));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
