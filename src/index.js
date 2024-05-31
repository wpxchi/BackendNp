const express = require('express');
const morgan = require('morgan'); // Asegúrate de haber instalado morgan
const cors = require('cors'); // Importa cors
const { Products, Category, conn } = require('./db');
const axios = require('axios');
const router = require('./Routes/index');


const app = express();
app.use(cors()); // Usa CORS en todas las rutas
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3001;

const saveAllProductsInDB = async () => {
  try {
    const allProducts = await axios.get('https://fakestoreapi.com/products');
    await Promise.all(allProducts.data.map(async (producto) => {
        await Products.create(producto);
    }));

    console.log('¡Productos guardados en la base de datos!');
  } catch (error) {
    console.error('Error al guardar los productos en la base de datos:', error);
  }
};

const saveAllCategoriesInDB = async () => {
  try {
    const allCategories = await axios.get('https://fakestoreapi.com/products/categories');
    await Promise.all(allCategories.data.map(async (category) => {
        await Category.create({ name: category });
    }));

    console.log('¡Categorias guardadas en la base de datos!');
  } catch (error) {
    console.error('Error al guardar las categorias en la base de datos:', error);
  }
};


conn.sync({ force: true })
  .then(() => {
      // Llama a la función para guardar los productos en la base de datos
      saveAllProductsInDB();
      saveAllCategoriesInDB();
  })
  .catch((error) => {
      console.error('Error al sincronizar la base de datos:', error);
  });

  
app.get("/", (req, res)=>{
res.send("Funciona")
})


app.use('/', router);


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});