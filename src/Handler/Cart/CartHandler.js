const postCart =require('../../Controller/UserCart/postCart')
const getUserCart= require('../../Controller/UserCart/getUserCart')
const putCart= require('../../Controller/UserCart/putCart')
const quitCart =require('../../Controller/UserCart/quitCart')


const createCart= async(req, res)=>{
   const {userId, productId, quantity}=req.body
   try {
    const newCart= await postCart(userId, productId, quantity)
    res.status(200).send(newCart)
   } catch (error) {
    res.status(400).send(error.message)
   }


}

const getCart = async (req, res) => {
    const { userId } = req.query; // Cambiar de req.body a req.query
    try {
        const getACart = await getUserCart(userId);
        res.status(200).send(getACart);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const editCart= async(req, res)=>{
const {cartId, productId, action, quantity}= req.body
try {
    const EditItems= await putCart(cartId, productId, action, quantity)
    res.status(200).send(EditItems)
} catch (error) {
    res.status(400).send(error.message)
}
}

const deleteCart= async(req, res)=>{
    const {cartId}=req.body
try {
    const deletedCart=await quitCart(cartId)
    res.status(200).send(deletedCart)
} catch (error) {
    res.status(400).send(error.message)
}
}

module.exports={createCart, editCart, deleteCart, getCart}