const router = require("express").Router()
const jwt = require("jsonwebtoken")
const multer = require("multer")

const Party = require("../models/party")
const User = require("../models/user")

//Define file Storage
const diskStorage = require("../helpers/file-storage")
const upload = multer({ storage: diskStorage})
//Middlewares
const verifyToken = require("../helpers/check-token")

//Helpers
const getUserByToken = require("../helpers/get-user-by-token")

//Get party
router.get("/", verifyToken, (req, res) =>{
    res.json({msg: "Party OK"})
})

module.exports = router