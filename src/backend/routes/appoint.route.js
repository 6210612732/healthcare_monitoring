let mongoose = require('mongoose'),
    app = require('express'),
    router = app.Router();
const bcrypt = require('bcrypt');

let doctorSchema = require('../models/Doctor')
let patientSchema = require('../models/Patient')
let appointSchema = require('../models/Appointment')


// create patient
router.route('/make_appoint').get((req, res, next) => {
    const temp = {
        p_id: "64402117b0cb49a81e4ccac1",
        d_id: "64402479b0cb49a81e4ccad0",
        appoint: [{
            date: "2023-4-15",
            time_begin: "14:20",
            time_end: "15:20",
        }],
        status: "1"
    }
    appointSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    })
});


router.route('/doc_schedule/:did').get((req, res,next) => {
    appointSchema.find({ d_id: req.params.did}, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

// 
router.route('/').get((req, res) => {
    console.log("sda");
    appointSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

module.exports = router;