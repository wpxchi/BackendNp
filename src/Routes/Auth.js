const { Router } = require('express');
const {Register, Login }= require ('../Handler/Auth/Authentication')
const Auth=Router()

Auth.post('/login', Login)
Auth.post('/register', Register)



module.exports=Auth