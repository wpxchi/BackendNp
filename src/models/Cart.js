const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cart = sequelize.define("Cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    });
    
    Cart.associate = (models) => {
        Cart.hasMany(models.CartItem); // Un carrito puede tener muchos ítems de carrito
    };
    return Cart;
};