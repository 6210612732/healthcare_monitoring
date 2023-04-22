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
}, {
    collection: "chatrooms"
})

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
