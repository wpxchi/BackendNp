const {Products}=require('../../db')
const { Op } = require('sequelize');

const getProductsByName = async (name) => {

  if(name==='nothing'){
    const products=await Products.findAll();
    return products
  }
  
    const products = await Products.findAll({
      where: {
        title: {
          [Op.like]: `%${name}%`
        }
      }
    });
    if(!products.length){
        throw new Error (`There are no products that contain ${name}`)
    }
  
    return products;
  }


  module.exports =  getProductsByName