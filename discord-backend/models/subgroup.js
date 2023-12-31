const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String},
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
});

module.exports = mongoose.model('Subgroup', groupSchema);