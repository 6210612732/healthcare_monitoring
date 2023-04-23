const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatRoomSchema = new Schema({
    p_id: {
        type: String
    },
    d_id: {
        type: String
    },
    status: {
        type: String
    },
    last_message: {
        type: String
    },
    time_last: {
        type: String
    },
    side: {
        type: String
    },
}, {
    collection: "chatrooms"
})

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
