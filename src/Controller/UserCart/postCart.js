const { Users, Products, Cart, CartItem } = require('../../db');

const postCart = async (userId, productId, quantity = 1) => {
    try {
        
        const userExists = await Users.findByPk(userId);
        if (!userExists) {
            throw new Error('The user does not exist');
        }

      
        const productExists = await Products.findByPk(productId);
        if (!productExists) {
            throw new Error('The product does not exist');
        }

       
        let cart = await Cart.findOrCreate({
            where: { userId: userId },
            defaults: { userId: userId, date: new Date() }
        });

        
        cart = cart[0]; 

       
        let item = await CartItem.findOne({
            where: {
                CartId: cart.id,
                ProductId: productId
            }
        });

        if (item) {
            item.quantity += quantity;
            await item.save();
        } else {
            await CartItem.create({
                CartId: cart.id,
                ProductId: productId,
                quantity
            });
        }

        return {id:cart.id, message: "Product added to cart successfully" };
    } catch (error) {
        throw new Error(`Error creating cart: ${error.message}`);
    }
};

module.exports = postCart;