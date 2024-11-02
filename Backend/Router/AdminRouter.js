const express = require('express');
const route = express.Router();
const {handleCreateAdmin , handleLoginAsAdmin} = require('../Controller/AdminController')
const {checkisadmin} =require('../MiddleWare/auth')

route.post('/createadminaccount',checkisadmin,handleCreateAdmin);
route.post('/loginasadmin' , handleLoginAsAdmin);

module.exports = route