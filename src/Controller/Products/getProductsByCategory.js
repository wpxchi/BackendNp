const { Products } = require('../../db');

const getProductsByCategory = async (category) => {

    if(category==='all'){
        const Allproducts= await Products.findAll()
        return Allproducts
    }
    const products = await Products.findAll({
        where: {
            category: category
        }
    });

    if (!products.length) {
        throw new Error(`No Products found for category ${category}`);
    }

    return products;
};

module.exports = getProductsByCategory;