const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let monitorSchema = new Schema({
    device_token: {
        type: String
    },
    timestamp: {
        type: String
    },
    BloodPress: [{
        SYS: {type: String  },
        DIA: {type: String  },
        PUL: {type: String  },
    }],
    Oximeter: [{
        SAT: {type: String  },
        PUL: {type: String  },
    }],
    status: {
        type: String
    },
}, {
    collection: "monitors"
})

module.exports = mongoose.model('Monitor', monitorSchema);
