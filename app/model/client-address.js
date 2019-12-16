
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("client_addresses", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  }, {
      underscored: true,
      timestamps: true,
    });
} 