const { Products } = require('../../db');

const getProductsAll = async () => {
        const allProducts = await Products.findAll();
     if(!allProducts.length){
      throw new Error ('No products found')
     }
     return allProducts
};

module.exports = getProductsAll;