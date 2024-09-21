require('dotenv').config();

const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

// register an user
router.post("/register", async (req,res) =>{
    

   const name = req.body.name
   const email = req.body.email
   const password = req.body.password
   const confirmpassword = req.body.confirmpassword
   
   //check for required fields
   if(name === null || email === null || password == null || confirmpassword === null){
    return res.status(400).json({error: "Preencha todos os campos!"})
   }
   
   //check if password match
   if (password != confirmpassword){
    return res.status(400).json({error: "As senhas não conferem"})
   }

   //check if user exists
   const emailExists = await User.findOne({email: email})

   if(emailExists){
    return res.status(400).json({error: "E-mail já cadastrado"})
   }

   //create password
   const salt = await bcrypt.genSalt(12)
   const passwordHash = await bcrypt.hash(password, salt)

   const user = new User({
      name: name,
      email: email,
      password: passwordHash
   })

   try {

      const newUser = await user.save()
      //Create Token
      const token = jwt.sign(
         //Payload
         {
            name: newUser.name,
            id: newUser._id
         },
         process.env.KEY
      )

      //Return Token
      res.json({error: null, msg: "Cadastro realizado com sucesso", token: token, userId: newUser._id})

   } catch (error) {
      res.status(400).json({error})
   }

})

//Login an user
router.post("/login", async(req, res) =>{

   const email = req.body.email
   const password = req.body.password
   
   //Check if user exists
   const user = await User.findOne({email: email})

   if(!user){
      return res.status(400).json({error: "E-mail não encontrado"})
   }

   //Check if password match
   const checkPassword = await bcrypt.compare(password, user.password)

   if(!checkPassword){
      return res.status(400).json({error: "Senha incorreta"})
   }

   //Create Token
   const token = jwt.sign(
      //Payload
      {
         name: user.name,
         id: user._id
      },
      process.env.KEY
   )

   //Return Token
   res.json({error: null, msg: "Logado com sucesso", token: token, userId: user._id})

})

module.exports = router