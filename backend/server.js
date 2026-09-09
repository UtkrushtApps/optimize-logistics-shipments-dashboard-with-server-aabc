const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const shipmentsRouter = require('./routes/shipments');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health endpoint used by run.sh
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1/shipments', shipmentsRouter);

app.use(notFound);
app.use(errorHandler);

const mongoUri = 'mongodb://mongo:27017/utkrusht_logistics';

mongoose.set('strictQuery', true);

mongoose
  .connect(mongoUri, {
    maxPoolSize: 20
  })
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    const port = 5000;
    app.listen(port, () => {
      console.log('Backend API listening on port', port);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
