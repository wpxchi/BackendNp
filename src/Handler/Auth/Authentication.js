const RegisterAuth =require ('../../Controller/UserAuth/RegisterAuth')
const LoginAuth =require ('../../Controller/UserAuth/LoginAuth')

const Login= async (req, res)=>{
    const {UserName, Password}= req.body
try {
  const UserLoged= await LoginAuth(UserName, Password, res)
  res.status(200).send(UserLoged) 
} catch (error) {
    res.status(400).send(error.message)
}
}



const Register= async (req, res)=>{
    const {UserName, Password, Email} = req.body
try {
    const NewUser = await RegisterAuth(UserName, Password, Email)
    res.status(200).send(NewUser)
} catch (error) {
    res.status(400).send(error.message)
}
}

module.exports={Register, Login}
