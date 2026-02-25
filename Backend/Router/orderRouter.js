const express = require('express')
const { handleCreateOrder,handleGetOrder , handleupdateorder} = require('../Controller/Ordercontroller')
const route = express.Router()
const {checkisadmin} = require('../MiddleWare/auth') 
route.post('/createorder' , handleCreateOrder)
route.patch('/updateorder/:id' ,handleupdateorder)
route.get('/getallorder' ,handleGetOrder)


module.exports = route