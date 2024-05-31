const { Users } = require('../../db');
const bcryptjs = require('bcryptjs');

const RegisterAuth = async (UserName, Password, Email) => {
    try {
        if (!UserName || !Password || !Email) {
            throw new Error('Insufficient data');
        }

        const existingUsername = await Users.findOne({ where: { UserName: UserName } });
        const existingEmail = await Users.findOne({ where: { Email: Email } });

        if (existingUsername || existingEmail) {
            throw new Error('Existing user with those credentials');
        }

        const salt = await bcryptjs.genSalt(5);
        const newPassword = await bcryptjs.hash(Password, salt);

        const newUser = await Users.create({
            UserName,
            Email,
            Password: newPassword
        });

        const userJson = newUser.toJSON();
        // Eliminar la propiedad Password del objeto
        delete userJson.Password;

        return {userJson, message: 'User created successfully', redirect: '/login'}
    } catch (error) {
        throw new Error(`Error creating a new User: ${error.message}`);
    }
};

module.exports=RegisterAuth