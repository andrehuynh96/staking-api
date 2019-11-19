
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("client_keys", {
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
    client_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  }, {
      underscored: true,
      timestamps: true,
    });
}

