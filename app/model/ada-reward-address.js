module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ada_reward_addresses", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    validator_address: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    cycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cycle_distribute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    date_reward: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    underscored: true,
    timestamps: true,
  });
} 