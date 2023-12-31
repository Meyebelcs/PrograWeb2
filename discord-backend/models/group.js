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
    subgroups: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subgroup",
        },
    ],
});

module.exports = mongoose.model('Group', groupSchema);