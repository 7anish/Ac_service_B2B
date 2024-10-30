const express = require('express')
const { handleCreateOrder,handleGetOrder , handleupdateorder} = require('../Controller/Ordercontroller')
const route = express.Router()
const {checkisadmin} = require('../MiddleWare/auth')

route.post('/createorder' , handleCreateOrder)
route.patch('/updateorder/:id' , checkisadmin, handleupdateorder)
route.get('/getallorder' ,checkisadmin, handleGetOrder)


module.exports = route