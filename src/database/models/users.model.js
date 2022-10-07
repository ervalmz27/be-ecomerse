const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'meta_users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email Address Already in use!',
        },
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  const setSaltAndPassword = async function (user) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSaltSync(8);
      // eslint-disable-next-line no-param-reassign
      user.password = bcrypt.hashSync(user.password, salt).toString();
    }
  };

  Users.prototype.validPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  };

  Users.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };

  Users.beforeUpdate(setSaltAndPassword);
  Users.beforeCreate(setSaltAndPassword);

  Users.associate = function (models) {
    Users.hasMany(models.meta_tokens, { as: 'tokens', foreignKey: 'user_id' });
  };

  return Users;
};
