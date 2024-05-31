const { Router } = require('express');
const Rproducts = Router();
const {
  getProducts, getProductsId, getAllProductsCategory, getAllProductsName, postProducts, AllCategories
} = require('../Handler/Products/Products');


Rproducts.get('/all', getProducts);


Rproducts.get('/allCategories', AllCategories);


Rproducts.get('/:id', getProductsId);


Rproducts.get('/category/:category', getAllProductsCategory);


Rproducts.get('/name/:name', getAllProductsName);


Rproducts.post('/', postProducts);



module.exports = Rproducts;