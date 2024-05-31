const { Products } = require('../../db');


const getProductsById= async(id)=>{
    const product = await Products.findByPk(id)
    if(!product){
        throw new Error(`There isn\'t a product with the id ${id}`)
    }
    return product
}

module.exports = getProductsById