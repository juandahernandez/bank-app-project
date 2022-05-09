// models
const { User } = require('../models/user.model');
const { Transfer } = require('../models/transfer.model');

const initModels = () => {
  User.hasMany(Transfer, { foreignKey: 'senderUserId' });
  Transfer.belongsTo(User);
};

module.exports = { initModels };
