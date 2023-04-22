const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let patientSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String
    },
    address: {
        type: String
    },
    detail: [{
        description: {type: String  },
        name_sur: {type: String  },
        drug: {type: String  },
        age: {type: String  },
        gender: {type: String  },
        kg_cm: {type: String  },
        blood_group: {type: String  },
        allergy: {type: String  },
        chronic_disease: {type: String  },
        being_treated: {type: String  },
    }],
    status: {
        type: String
    },
}, {
    collection: "patients"
})

module.exports = mongoose.model('Patient', patientSchema);
