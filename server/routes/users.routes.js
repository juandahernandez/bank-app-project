const express = require('express');

const {
  createAccountUser,
  loginUser,
  historyTransferUser
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/signup', createAccountUser);

router.post('/login', loginUser);

router.get('/:id/history', historyTransferUser);

module.exports = { userRouter: router };
