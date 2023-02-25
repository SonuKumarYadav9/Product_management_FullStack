const  express = require("express")
const mongoose =require("mongoose")
const multer = require("multer")
const cors= require("cors")
mongoose.set('strictQuery', false);

const db = require("../config/db")
//ROUTES
const route = require("./routes/route")
const app = express()

//GM
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())
app.use(express.json())

//connecting to DB
mongoose.connect(db,{
    useNewUrlParser: true
})
.then(()=>console.log("Connected to Database"))
.catch((e)=>console.log(e))

 app.use("/",route)



const port  = 5000
app.listen(port, ()=>{
    console.log("Server is running on port" + port)
})

