//modules 
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

//routes
const authRouter = require("./routes/authRoutes.js")
const userRouter = require("./routes/userRoutes.js")
const partyRouter = require("./routes/partyRoutes.js")
//middlewares

//config
//const dbName = "ptime"
const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
//atrelar as rotas no express
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/party", partyRouter)

//conexao mongodb
//mongoose.connect(
//`mongodb://127.0.0.1/${dbName}`)

async function main(){
    try{
        mongoose.set("strictQuery", true)
        await mongoose.connect(
            "mongodb+srv://logus:xGYGiIvvoeAVC0P2@ptime0.tn3gt.mongodb.net/?retryWrites=true&w=majority&appName=ptime0")
        console.log("on DB")
    } catch (error){
        console.log(`Erro: ${error}`)
    }
}
main();

app.get("/", (req, res) => {
    res.json({message: "Rota teste"})
})

app.listen(port,()=>{
    console.log(`Back na porta ${port}`)
})