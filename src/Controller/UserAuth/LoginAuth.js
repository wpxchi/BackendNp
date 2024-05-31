const { Users } = require('../../db');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET, JWT_EXPIRES, COOKIE_EXPIRES } = process.env;

const LoginAuth = async (UserName, Password) => {
    try {
        if (!UserName || !Password) {
            throw new Error(`Incomplete inputs`);
        }

        const User = await Users.findOne({ where: { UserName: UserName } });

        if (!User) {
            throw new Error(`Incorrect credentials`);
        }

        const CorrectUser = await bcryptjs.compare(Password, User.Password);

        if (!CorrectUser) {
            throw new Error(`Incorrect credentials`);
        }

        const token = jsonwebtoken.sign({ user: User.UserName }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        return { status: 'ok', redirect: '/home', message: 'Success login', token: token };
    } catch (error) {
        throw new Error(`Error in the login: ${error.message}`);
    }
};

module.exports = LoginAuth;