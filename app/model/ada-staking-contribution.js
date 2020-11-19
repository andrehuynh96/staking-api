const TransactionStatus = require("./value-object/transaction-status");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ada_staking_contributions", {
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
    validator_address: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    partner_id: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    cycle: {
      type: DataTypes.INTEGER,
      allowNull: true,
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