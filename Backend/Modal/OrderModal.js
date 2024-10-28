const mongooes = require('mongoose')

const Orderschema = new mongooes.Schema({
    name : {
        type : String,
        required : true
    },
    phonenumber : {
        type : String,
        required : true
    },
    gmail : {
        type : String,
        required : true
    },
    pincode : {
        type :String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    service : {
        type : String,
        required : true
    },
    servicetype : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    houseNo: {
        type : String,
        required : true
    },
    landmark : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['Pending' , 'Connected'],
        default : 'Pending'
    }
} , {timestamps : true})

const order = mongooes.model('order' , Orderschema);
module.exports = order