

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    user_sts: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    twofa_secret: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    twofa_enable_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deleted_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    latest_login_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attempt_login_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
      underscored: true,
      timestamps: true,
    });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.user_roles, { foreignKey: 'user_id' })
  };
  return User;
}