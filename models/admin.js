const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    
    _id: {type: String, required: true},
    password: {type: String, required: true}
    
})

module.exports = mongoose.model('Admin', adminSchema);