const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

// routes
const { userRouter } = require('./routes/users.routes');
const { tranferRouter } = require('./routes/transfers.routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//endpoinds
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', tranferRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
