const { CartItem } = require('../../db');

const putCart = async (cartId, productId, action, quantity = 1) => {
    try {
        // Encontrar el ítem del carrito correspondiente al producto
        let cartItem = await CartItem.findOne({
            where: {
                CartId: cartId,
                ProductId: productId
            }
        });

        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        // Realizar la acción solicitada
        switch (action) {
            case 'increase':
                cartItem.quantity += quantity;
                break;
            case 'decrease':
                // Verificar si la cantidad es mayor que 1 antes de decrementar
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= quantity;
                }
                break;
            case 'remove':
                // Eliminar el ítem del carrito
                await cartItem.destroy();
                return { message: 'Product removed from cart' };
            default:
                throw new Error('Invalid action');
        }

        // Guardar los cambios en el ítem del carrito
        await cartItem.save();

        return { message: 'Cart updated successfully' };
    } catch (error) {
        throw new Error(`Error updating cart: ${error.message}`);
    }
};
module.exports= putCart