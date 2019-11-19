
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("client_memos", {
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
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
    });
}

