module.exports = (sequelize, DataTypes) => {
  return sequelize.define("partner_commissions_his", {
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
    commission: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    reward_address: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staking_platform_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    partner_updated_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
      underscored: true,
      timestamps: true,
    });

}