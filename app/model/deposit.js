module.exports = (sequelize, DataTypes) => {
  return sequelize.define("deposit", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    block_time: {
      type: DataTypes.DATE,
      allowNull: false
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
    log_index: {
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
    duration: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: false
    },

  }, {
      underscored: true,
      timestamps: true,
    });
}
