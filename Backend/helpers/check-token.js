require('dotenv').config();

const jwt = require("jsonwebtoken")

//Middleware to validade token
const checkToken = (req, res, next) =>{
    
    const token = req.header("auth-token")

    if(!token){
        return res.status(401).json({error : "Acesso negado"})
    }

    try {
        
        const verified = jwt.verify(token, process.env.KEY)
        req.user = verified;
        next() //Continue

    } catch (error) {
        res.status(400).json({error: " Token invalido"})
    }
}

module.exports = checkToken