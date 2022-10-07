module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meta_users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('meta_users', {
      fields: ['email'],
      type: 'unique',
      name: 'users_email_key',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('meta_users');
  },
};
