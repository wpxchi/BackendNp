require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/FAS`, // Asegúrate de cambiar 'ecommerceDB' por el nombre real de tu base de datos
   {
      logging: false,
      native: false,
   }
);

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y los agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Users, Products, Cart, CartItem, Category } = sequelize.models;

// Relaciones
Users.hasMany(Cart); // Un usuario puede tener muchos carritos
Cart.belongsTo(Users); // Un carrito pertenece a un usuario

Cart.belongsToMany(Products, { through: CartItem }); // Un carrito tiene muchos productos a través de los items del carrito
Products.belongsToMany(Cart, { through: CartItem }); // Un producto puede estar en muchos carritos a través de los items del carrito

Products.belongsTo(Category); // Un producto pertenece a una categoría
Category.hasMany(Products); // Una categoría tiene muchos productos

CartItem.belongsTo(Products); // Un item del carrito pertenece a un producto
Products.hasMany(CartItem); // Un producto puede tener muchos items de carrito

Cart.hasMany(CartItem); // Un carrito puede tener muchos items de carrito
CartItem.belongsTo(Cart); // Un item del carrito pertenece a un carrito

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Users, Products, Cart, CartItem, Category } = require('./db.js');
   conn: sequelize,     // para importar la conexión: const { conn } = require('./db.js');
};