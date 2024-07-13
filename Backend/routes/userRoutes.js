const router = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/user")

//Middlewares
const verifyToken = require("../helpers/check-token")
//Helpers
const getUserByToken = require("../helpers/get-user-by-token")

//Get an user 
router.get("/:id", verifyToken, async (req,res) => {

    const id = req.params.id

    //Verify user
    try {
        const user = await User.findOne({_id: id}, {password: 0})
        res.json({error: null, user})
    } catch (error) {
        
        return  res.status(400).json({error: "Usuario não encontrado"})
    }
    

})

//Update an user

router.patch("/", verifyToken, async(req, res) =>{

    const token = req.header("auth-token")
    const user = await getUserByToken(token)
    const userReqId = req.body.id
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    const userId = user._id.toString()

    //Check if user id is equal token iser id

    if(userId != userReqId){
        res.status(401).json({ error: "Acesso negado."})
    }

    //Create an user object
    const updateData = {
        name: req.body.name,
        email: req.body.email
    }

    //Check if passwords match
    if(password != confirmpassword){
        return res.status(401).json({ error: "Senhas não conferem."})
        //Change password
    } else if (password == confirmpassword && password != null){
        //Creating password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        //Add password to data
        updateData.password = passwordHash
    }

    try {

        //Returns updated data
        const updatedUser = await User.findByIdAndUpdate({ _id: userId}, {$set: updateData}, {new: true})
        res.json({ error: null, msg: "Usuário atualizado", data: updatedUser})
        
    } catch (error) {
        res.status(400).json({ err })
    }
})

module.exports = router