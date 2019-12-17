
const timeUnit = require("./value-object/time-unit");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("platform_votes", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    estimate_earn_per_year: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    lockup_unvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lockup_unvote_unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: timeUnit.DAY
    },
    payout_reward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    payout_reward_unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: timeUnit.DAY
    },
    active_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    },
  }, {
      underscored: true,
      timestamps: true,
    });
}

