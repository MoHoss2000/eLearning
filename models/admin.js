const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    
    _id: {type: String, required: true},
    password: {type: String, required: true},
    src: {type: String},
    time: {type: Number},
    count: {type: Number, default: 0}
    
})

module.exports = mongoose.model('Admin', adminSchema);