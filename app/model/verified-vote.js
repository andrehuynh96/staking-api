
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("verified_votes", {
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
    tx_id: {
      type: DataTypes.STRING,
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
    from_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
    });
}

