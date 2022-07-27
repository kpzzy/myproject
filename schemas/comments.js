const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
      
    user : {
        type: String,
        
    },
    password : {
        type: String,
    },
    content : {
        type: String,
    },
    cmtdate : {
        type: Date,
        default: Date.now()
    },
    guitarId : {
        type:Number,
        
    },
    commentId : {
        type : Number,
    }
})

module.exports = mongoose.model("Comments" , commentsSchema)