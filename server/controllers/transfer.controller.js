// model
const { Transfer } = require('../models/transfer.model');
const { User } = require('../models/user.model');

// util
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.transfers = catchAsync(async (req, res, next) => {
  const { amount, accountNumber, sendAccoundNumber } = req.body;

  const receiverUser = await User.findOne({
    where: { accountNumber, status: 'active' }
  });

  const sendUser = await User.findOne({
    where: { accountNumber: sendAccoundNumber }
  });

  if (!amount) {
    return next(new AppError('Must provide a valid amount', 400));
  }

  if (!receiverUser || !sendUser) {
    return next(new AppError('the account does not exist', 400));
  }

  if (amount > sendUser.amount) {
    return next(new AppError('insufficient funds', 400));
  }

  const receiverUserId = receiverUser.id;
  const senderUserId = sendUser.id;

  const newTransfer = await Transfer.create({
    amount,
    senderUserId,
    receiverUserId
  });

  const total = sendUser.amount - amount;
  await sendUser.update({ amount: total });

  const totalReceiver = receiverUser.amount + amount;
  await receiverUser.update({ amount: totalReceiver });

  res.status(201).json({
    status: 'success',
    data: { newTransfer },
    total
  });
});
