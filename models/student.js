const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    _id: {type: String, required: true},
   used: {type: Boolean, default: false},
   timeUsed: {type: Date, default: Date.now}
    
})

module.exports = mongoose.model('Student', userSchema);


{
    link: "",
}