const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({

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

module.exports = {
    Year9: mongoose.model("Year9", yearSchema),
    Year10: mongoose.model("Year10", yearSchema), 
    Year11: mongoose.model("Year11", yearSchema), 
    Year12: mongoose.model("Year12", yearSchema)
}