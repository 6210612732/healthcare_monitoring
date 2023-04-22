const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
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
        hospital: {type: String  },
    }],
    status: {
        type: String
    },
}, {
    collection: "doctors"
})

module.exports = mongoose.model('Doctor', doctorSchema);
