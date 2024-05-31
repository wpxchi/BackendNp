const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Products", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Esto permite precios hasta 99999999.99. Ajusta según necesidad.
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT, // TEXT es adecuado para textos largos. Si tus descripciones son cortas, podrías usar STRING.
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, // Asumiendo que guardarás URLs o referencias a las imágenes
            allowNull: true, // Dependiendo de si cada producto debe tener una imagen o no, podrías querer cambiar esto a false.
        },
    });
};