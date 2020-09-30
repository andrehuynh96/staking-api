module.exports = (sequelize, DataTypes) => {
  return sequelize.define("payments", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    cycle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    paid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
      underscored: true,
      timestamps: true,
    });
}