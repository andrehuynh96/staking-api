
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("staking_plan", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
    },
    staking_plan_code: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration_type: {
      type: DataTypes.STRING(16),
      defaultValue: 'DAY',
      allowNull: false
    },
    reward_per_year: {
      type: DataTypes.DECIMAL(4,3),
      allowNull: false
    },
    actived_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    reward_in_diff_platform_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    reward_platform: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    reward_token_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by :{
      type: DataTypes.INTEGER
    },
    updated_by :{
      type: DataTypes.INTEGER
    },
    deleted_flg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    staking_platform_id: {
      type: DataTypes.UUID
    }

  }, {
      underscored: true,
      timestamps: true,
    });
}

