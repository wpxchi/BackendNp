const {createCart, editCart, deleteCart, getCart}= require('../Handler/Cart/CartHandler')
const { Router } = require('express');




const Rcart= Router()

Rcart.get('/getCart', getCart)

Rcart.post('/createCart', createCart)

Rcart.put('/editCart', editCart)

Rcart.delete('/deleteCart', deleteCart)

module.exports=Rcart