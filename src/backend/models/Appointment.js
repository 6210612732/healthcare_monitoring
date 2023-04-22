const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let appointmentSchema = new Schema({
    p_id: {
        type: String
    },
    d_id: {
        type: String
    },
    appoint: [{
        date: {type: String  },
        time_begin: {type: String  },
        time_end: {type: String  },
    }],
    status: {
        type: String
    },
}, {
    collection: "appointments"
})

module.exports = mongoose.model('Appointment', appointmentSchema);
