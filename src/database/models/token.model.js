module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define(
    'meta_tokens',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      indexes: [{ unique: false, fields: ['token'] }],
    }
  );
  // add plugin that converts mongoose to json
  Tokens.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };

  Tokens.associate = function (models) {
    Tokens.belongsTo(models.meta_users, { foreignKey: 'user_id' });
  };
  return Tokens;
};
