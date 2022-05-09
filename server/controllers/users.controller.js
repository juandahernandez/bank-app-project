// models
const { User } = require('../models/user.model');
const { Transfer } = require('../models/transfer.model');

// util
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.createAccountUser = catchAsync(async (req, res, next) => {
  const { name, password, amount } = req.body;

  if (!name || !password || !amount) {
    return next(
      new AppError('Must provide a valid name and an password and amount', 400)
    );
  }

  const newAccount = await User.create({
    name,
    accountNumber: Math.floor(Math.random() * 999999),
    password,
    amount
  });

  res.status(201).json({
    status: 'succes',
    data: { newAccount }
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: { accountNumber, status: 'active' }
  });

  if (!user || !(password === user.password)) {
    return next(new AppError('Credentials are invalid', 400));
  }

  res.status(201).json({
    status: 'succes',
    data: { user }
  });
});

exports.historyTransferUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { status: 'active', id },
    attributes: { exclude: ['password'] },
    include: [{ model: Transfer }]
  });

  const transfer = await Transfer.findAll({
    where: { senderUserId: id }
  });

  const recTransfer = await Transfer.findAll({
    where: { receiverUserId: id }
  });

  if (!transfer) {
    return next(new AppError('no transfer records', 400));
  }

  res.status(200).json({
    status: 'succces',
    data: { user },
    rec: { recTransfer }
  });
});
