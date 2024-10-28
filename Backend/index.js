const express = require('express')
const app = express();
const contactRouter = require('./Router/ContactRouter')
const Adminrouter = require('./Router/AdminRouter')
const OrderRouter = require('./Router/orderRouter')
const connectDataBase =  require('./Config/Databaseconnection')
require('dotenv').config()
var cors = require('cors')


app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    })
);

const PORT = process.env.PORT || 8001;
const URL = process.env.DB_URL;

connectDataBase(URL);
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/api/v1/contact' , contactRouter)
app.use('/api/v1/admin' , Adminrouter)
app.use('/api/v1/order' , OrderRouter)

app.get('/testbackend' , (req,res)=>{
    res.status(200).json({Message : "Happy happy happy"})
})

app.listen(PORT , ()=>{
    console.log(`Server Started At ${PORT}`)
})