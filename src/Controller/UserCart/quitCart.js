const { Cart, CartItem } = require('../../db');

const quitCart = async (cartId) => {
    try {
        // Primero, encontrar y eliminar todos los ítems del carrito
        await CartItem.destroy({
            where: { CartId: cartId }
        });

        // Luego, eliminar el carrito
        const result = await Cart.destroy({
            where: { id: cartId }
        });

        if (result === 0) {
            throw new Error('Cart not found');
        }

        return { message: 'Cart successfully deleted' };
    } catch (error) {
        throw new Error(`Error deleting cart: ${error.message}`);
    }
}

module.exports = quitCart;