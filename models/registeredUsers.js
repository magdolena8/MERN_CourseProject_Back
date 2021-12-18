const {Schema, model} = require('mongoose')

const schema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    eventName:{
        type:String,
    },
    eventDate:{
        type:Number
    }
})


module.exports = model('registeredUsers', schema)