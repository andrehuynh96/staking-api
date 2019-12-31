
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("partner_api_keys", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    partner_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    api_key: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    secret_key: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    actived_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  }, {
      underscored: true,
      timestamps: true,
    });
} 