const { Users, Cart, CartItem, Products } = require('../../db');

const getUserCart = async (userId) => {
    try {
        const user = await Users.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const cart = await Cart.findOne({
            where: { userId: userId },
            order: [['createdAt', 'DESC']],
            include: [{ model: CartItem, include: [Products] }] // Incluimos los productos a través del modelo CartItem
        });

        return cart;
    } catch (error) {
        throw new Error(`Error fetching user cart: ${error.message}`);
    }
};

module.exports = getUserCart;