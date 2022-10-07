module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    'checkouts',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Checkout.prototype.toJSON = function () {
    return { ...this.get() };
  };

  return Checkout;
};
