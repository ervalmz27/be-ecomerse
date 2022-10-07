module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Product.prototype.toJSON = function () {
    return { ...this.get() };
  };

  return Product;
};
