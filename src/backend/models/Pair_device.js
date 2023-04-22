const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pair_deviceSchema = new Schema({
    device_token: {
        type: String
    },
    p_id: {
        type: String
    },
    timeStamp: {
        type: String
    },
    d_status: {
        type: String //active, delete or change
    },
}, {
    collection: "pair_device"
})

module.exports = mongoose.model('Pair_Device', pair_deviceSchema);
