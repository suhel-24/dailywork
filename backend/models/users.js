const mongoose  = require('mongoose')

const userschema = mongoose.Schema({
    email:{
        type:String,
        required:[true,'please add email']
    },
    password:{
        type:String,
        required:[true,'please add password']
    }
})
module.exports = mongoose.model('appusers',userschema)