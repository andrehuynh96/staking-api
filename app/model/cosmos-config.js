
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("cosmos_configs", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4(),
    },
    block_height_history_stake: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    block_height_history_unstake: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    page_history_stake: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    page_history_unstake: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    page_size_history: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    block_height_snapshot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    validator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
      underscored: true,
      timestamps: true,
    });
} 