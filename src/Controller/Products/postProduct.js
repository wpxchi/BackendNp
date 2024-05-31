const { Products, Category} = require('../../db');
const { Sequelize } = require('sequelize');

const createProduct = async (title, description, price, category, image) => {
   try {
    const maxIdQuery = await Products.findOne({
        attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxId']],
        raw: true,
    });
    const maxId = (maxIdQuery.maxId || 0) + 1;

   
    let categoryName = await Category.findOne({ where: { name: category } });
    if (!categoryName) {
        categoryName = await Category.create({ name: category });
    }
    

    const NewProduct= await Products.create({
        id:maxId,
         title,
         description,
         price: Number(price),
         category: categoryName.dataValues.name,
         image,
         CategoryId: categoryName.dataValues.id
    })

    return NewProduct
   } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
   } 
};

module.exports = createProduct;