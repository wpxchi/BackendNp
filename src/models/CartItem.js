const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const CartItem = sequelize.define("CartItem", {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    });

    return CartItem;
};