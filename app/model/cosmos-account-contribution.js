
const TransactionStatus = require("./value-object/transaction-status");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("cosmos_account_contributions", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    partner_id: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    block_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    block_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_vote: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    contribute_vote: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: TransactionStatus.PENDING,
    },
    distribute_commission_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    calculate_reward: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false,
    },
    affiliate_reward_id: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
  }, {
    underscored: true,
    timestamps: true,
  });
} 