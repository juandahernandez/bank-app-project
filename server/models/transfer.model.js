const { DataTypes } = require('sequelize');

// util
const { db } = require('../util/database');

const Transfer = db.define('tranfer', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { Transfer };
