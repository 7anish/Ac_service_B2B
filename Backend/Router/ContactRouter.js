const express = require('express')
const { handleCreateContact,handleGetContact  , handleCallBackRequest , handleupdatecontact} = require('../Controller/ContactController') 
const route = express.Router()
const {checkisadmin} = require('../MiddleWare/auth')

route.post('/requestcallback' , handleCallBackRequest)
route.post('/createcontact' , handleCreateContact)
route.patch('/updatestatus/:id' , checkisadmin,handleupdatecontact)
route.get('/getcontactlist' , checkisadmin,handleGetContact)


module.exports = route