const express = require('express');

const { transfers } = require('../controllers/transfer.controller');

const router = express.Router();

router.post('/', transfers);

module.exports = { tranferRouter: router };
