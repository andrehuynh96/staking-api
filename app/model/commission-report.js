
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("commission_reports", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    commission_percent: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    number_vote: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    epoch_number: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_vote: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_commisson: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_reward: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
    });
}

