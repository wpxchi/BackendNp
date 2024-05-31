const {Category} = require('../../db');

const getCategoriesAll = async () => {
        const allCategories = await Category.findAll();
     if(!allCategories.length){
      throw new Error ('No categories found')
     }
     return allCategories
};

module.exports = getCategoriesAll;