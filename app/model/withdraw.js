module.exports = (sequelize, DataTypes) => {
  return sequelize.define("withdraw", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    block_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    block_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    transaction_index: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    deposit_id: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    token_addr: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    depositor_addr: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    recipient_addr: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
      underscored: true,
      timestamps: true,
    });
}
