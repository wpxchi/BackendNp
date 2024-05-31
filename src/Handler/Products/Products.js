const getProductsAll = require ('../../Controller/Products/getProductsAll')
const getProductsById=require('../../Controller/Products/getProductsById')
const getProductsByName = require ('../../Controller/Products/getProductsByName')
const getProductsByCategory= require ('../../Controller/Products/getProductsByCategory')
const createProduct =require('../../Controller/Products/postProduct')
const getCategoriesAll= require('../../Controller/Products/getAllCategories')

const AllCategories=async(req, res)=>{
    try {
        const categories = await getCategoriesAll()
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const getProducts= async(req, res)=>{
    try {
        const products = await getProductsAll()
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const getProductsId=async(req, res)=>{
    const {id}= req.params
    try {
       const ProductById= await getProductsById(id)
       res.status(200).send(ProductById)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const getAllProductsName=async(req, res)=>{
    const {name} = req.params;
    try {
        const ProductsName= await getProductsByName(name)
        res.status(200).send(ProductsName)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const getAllProductsCategory=async(req, res)=>{
    const {category}= req.params
    try {
        const ProductsCategory= await getProductsByCategory(category)
        res.status(200).send(ProductsCategory)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const postProducts=async(req, res)=>{
     const {title, description, price, category, image}= req.body
    try {
      const ProductCreated= await  createProduct(title, description, price, category, image)
    res.status(200).send(ProductCreated)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports={getProducts, getProductsId, getAllProductsCategory, getAllProductsName, postProducts, AllCategories  }