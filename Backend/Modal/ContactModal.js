const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true   
    },
    status : {
        type : String,
        enum : ['Pending' , 'Connected'],
        default : 'Pending'
    }
},{timestamps : true})

const contactList = mongoose.model('contact' , contactSchema);

module.exports = contactList