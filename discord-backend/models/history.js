const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    action: { type: String},
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('History', historySchema);