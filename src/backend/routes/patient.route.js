let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const bcrypt = require('bcrypt');

// patient model
let patientSchema = require('../models/Patient')

// create patient
router.route('/create-patient').post((req, res, next) => {
    const { username , plainpass } = req.body;
    const temp = req.body;
    const saltRounds = 10;

    bcrypt.hash(plainpass, saltRounds, function (err, hash) {
    temp.password = hash;
    // Store hash in password DB.
    patientSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    })
    });
})

// Read patient 
router.route('/').get((req, res) => {
    patientSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

// Get single patient 
router.route('/info-patient/:id').get((req, res,next) => {
    patientSchema.findOne({ _id: req.params.id}, (error, data) => {
        if(error) {
            return next(error);
        } else {
            //console.log(data)
        res.json(data);
        }
    })
})

// Update patient
router.route('/update-patient/:id').put((req, res, next) => {
    patientSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body

    }, (error,data) => {
        if(error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('patient updated successfully');
        }
    })
})

// Delete patient
router.route('/delete-patient/:id').delete((req, res, next) => {
    patientSchema.findByIdAndRemove(req.params.id, (error,data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                
                msg: data
            })
        }
    })
})

module.exports = router;