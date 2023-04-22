const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let followingSchema = new Schema({
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
    collection: "followings"
})

module.exports = mongoose.model('Following', followingSchema);
