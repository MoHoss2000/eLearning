const mongoose = require("mongoose");

const yearSchema = mongoose.Schema({

    _id: { type: String },
    name: { type: String, required: true },
    link: { type: String, required: true },
    time: { type: Number, default: 24 },
    codes: [
        {
            _id: { type: String, required: true },
            used: { type: Boolean, default: false },
            timeUsed: { type: Date, default: Date.now }
        }
    ]

})

module.exports = yearSchema;