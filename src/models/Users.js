const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            UserName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true, // Asegura que el valor ingresado sea un email válido
                }
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
                // Asegúrate de implementar cifrado de contraseñas antes de guardar
            },
            Role: {
                type: DataTypes.ENUM('premium', 'normal'), // Definimos el campo 'role' como un ENUM con valores 'premium' y 'normal'
                allowNull: false,
                defaultValue: 'normal' // Por defecto, asignamos el valor 'normal'
            }
        } 
    );
};