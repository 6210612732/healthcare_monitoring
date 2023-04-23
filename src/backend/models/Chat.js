const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatSchema = new Schema({
    p_id: {
        type: String
    },
    d_id: {
        type: String
    },
    side: {
        type: String
    },
    message: {
        type: String
    },
    read: {
        type: String
    },
    status: {
        type: String
    },
    timestamp: {
        type: String
    },
}, {
    collection: "chats"
})

module.exports = mongoose.model('Chat', ChatSchema);
