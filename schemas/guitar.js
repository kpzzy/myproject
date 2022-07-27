const mongoose = require("mongoose");

const guitarsSchema = mongoose.Schema({
    user : {
        type: String,
        
    },
    password : {
        type: String,
    },
    guitarId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,  
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    // date : {
    //     type: Date,
    // }
    
})

module.exports = mongoose.model("Guitar" , guitarsSchema)