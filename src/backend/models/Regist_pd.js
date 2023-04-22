const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let patientSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String
    },
    email: {
        type: String
    },
    detail: [{
        description: {type: String  },
        chronic_Disease: {type: String  },
        allergy: {type: String  },
        blood_group: {type: String  },
        gender: {type: String  },
    }],
    email: {
        type: String
    },
    email: {
        type: String
    },
}, {
    collection: "patients"
})

module.exports = mongoose.model('Patient', patientSchema);
