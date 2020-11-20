const Status = require("./value-object/validator-status");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("validators", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    platform: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    estimate_earn_per_year: {
      type: DataTypes.NUMERIC,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: Status.ENABLED,
    },
    payment_address: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    stake_address: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    pool_id: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    service_id: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    key_id: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    underscored: true,
    timestamps: true,
  });

  return Model;
} 