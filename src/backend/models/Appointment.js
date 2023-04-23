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
        session: {type: String  },
        describe_session: {type: String  },
    }],
    status: {
        type: String
    },
}, {
    collection: "appointments"
})

module.exports = mongoose.model('Appointment', appointmentSchema);
