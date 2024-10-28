const express = require('express');
const route = express.Router();
const {handleCreateAdmin , handleLoginAsAdmin} = require('../Controller/AdminController')
const {checkissuperadmin} = require('../MiddleWare/auth')


route.post('/createadminaccount', checkissuperadmin,handleCreateAdmin);
route.post('/loginasadmin' , handleLoginAsAdmin);

module.exports = route