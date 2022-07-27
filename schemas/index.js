const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/sd_guitar", { ignoreUndefined: true }).catch((err) => {
        console.error(err);
    })
};

module.exports = connect;