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

//Create new party
router.post("/", verifyToken, upload.fields([{name: "photos"}]), async(req, res) =>{

    //Req data
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.party_date

    let files = [];
    
    if(req.files){
        files = req.files.photos
    }

    //Validation
    if(title == "null" || description == "null" || partyDate == "null"){
    return res.status(400).json({error: "Existem um ou mais campos vazios"})
    }

    //Verify user
    const token = req.header("auth-token")

    const userByToken = await getUserByToken(token)

    const userId = userByToken._id.toString()

    try {

        const user = await User.findOne({ _id: userId})

        //Create photos array with image path
        let photos = []
        
        if(files && files.length > 0){
            
            files.forEach((photo, i) => {
                photos[i] = photo.path
            })
        }

        const party = new Party({
            title: title,
            description: description,
            partyDate: partyDate,
            photos: photos,
            privacy: req.body.privacy,
            userId: user._id.toString()
        })

        try {
            
            const newParty = await party.save()
            res.json({error: null, msg: "Evento criado!", data: newParty})

        } catch (error) {
            return res.status(400).json({error})
        }

    } catch (error) {
        return res.status(400).json({error: "Acesso negado"})
    }
})

//Get all public parties
router.get("/all", async (req,res) =>{
    try {
        const parties = await Party.find({ privacy: false}).sort([['_id', -1]])
        res.json({ error: null, parties})
    } catch (error){
        return res.status(400).json({ error })
    }
})

//Get all user parties
router.get("/userparties", verifyToken, async (req,res) =>{

    try {
        
        const token = req.header("auth-token")

        const user = await getUserByToken(token)

        const userId = user._id.toString()

        const parties = await Party.find({ userId: userId})
        res.json({ error: null, parties: parties })

    } catch (error) {
        return res.status(400).json({ error })
    }
})

//Get user party
router.get("/userparty/:id", verifyToken, async (req,res) =>{
    
    try {
      
        const token = req.header("auth-token")
        
        const user = await getUserByToken(token)

        const userId = user._id.toString()
        const partyId = req.params.id

        const party = await Party.findOne({ _id: partyId, userId: userId})

        res.json({ error: null, party: party})

    } catch (error) {
       return res.status(400).json({ error }) 
    }
})

//Get party (public or private)
router.get("/:id", async (req, res) =>{

    try {
        
        //Find party
        const id = req.params.id
        
        const party = await Party.findOne({ _id: id})

        //Public party
        if(party.privacy === false){
            res.json({ error: null, party: party})

        //Private party    
        } else {

            const token = req.header("auth-token")

            const user = await getUserByToken(token)

            const userId = user._id.toString()
            const partyUserId = party.userId.toString()

            //Check if user id is equal to party user id
            if(userId == partyUserId){
                res.json({ error: null, party: party})
            } else {
                return res.status(400).json({ error:"Acesso negado!"})
            }
        }

    } catch (error) {
        return res.status(400).json({ error:"Evento não encontrado!"})
    }

})

//Delete a Party
router.delete("/", verifyToken, async (req, res) =>{

        const token = req.header("auth-token")
        const user = await getUserByToken(token)
        const partyId = req.body.id
        const userId = user._id.toString()

        try {
            
            await Party.deleteOne({_id: partyId, userId: userId})
            res.json({ error: null, msg: "Excluido com sucesso"})

        } catch (error) {
            res.status(400).json({ error: "Erro ao remover" })
        }
})

//Update a party
router.put("/", verifyToken, upload.fields([{ name: "photos"}]), async (req,res) =>{

    //Req body
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.party_date
    const partyId = req.body.id
    const partyUserId = req.body.user_id

    let files = [];
    
    if(req.files){
        files = req.files.photos
    }

    //Validation
    if(title == "null" || description == "null" || partyDate == "null"){
    return res.status(400).json({error: "Existem um ou mais campos vazios"})
    }

    //Verify user
    const token = req.header("auth-token")

    const userByToken = await getUserByToken(token)

    const userId = userByToken._id.toString()

    if(userId != partyUserId){
        return res.status(400).json({error: "Usuário não tem permissão para fazer isto"})
    }

    //Build party object
    const party = {
        id: partyId,
        title: title,
        description: description,
        partyDate: partyDate,
        privacy: req.body.privacy,
        userId: userId
    }

    //Create photos array with image path
    let photos = []
        
    if(files && files.length > 0){
        
        files.forEach((photo, i) => {
            photos[i] = photo.path
        })

        party.photos = photos
    }

    try {
        
        //Returns updated data
        const updatedParty = await Party.findOneAndUpdate({ _id: partyId, userId: userId}, {$set: party}, {new: true})
        res.json({ error: null, msg: "Atualizado com sucesso!", data: updatedParty})

    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router