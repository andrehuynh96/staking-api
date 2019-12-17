const DistributeStatus = require("./value-object/distribute-status");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("distribute_commission_histories", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DistributeStatus.PENDING,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    from_block: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    to_block: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cycle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
      underscored: true,
      timestamps: true,
    });
} 