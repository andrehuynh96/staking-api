
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("iris_accounts", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4(),
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    block_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
      underscored: true,
      timestamps: true,
    });
} 