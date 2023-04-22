let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const bcrypt = require('bcrypt');

// patient model
let doctorSchema = require('../models/Doctor')

// create doctor
router.route('/create-doctor').post((req, res, next) => {
    const { username , plainpass } = req.body;
    const temp = req.body;
    const saltRounds = 10;

    bcrypt.hash(plainpass, saltRounds, function (err, hash) {
    // Store hash in password DB.
    //console.log(username + " - " + plainpass + " - " +  hash);
    temp.password = hash;
    doctorSchema.create(temp, (error, data) => {
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
    doctorSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

// Get single patient 
router.route('/edit-doctor/:id').get((req, res) => {
    doctorSchema.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update patient
router.route('/update-doctor/:id').put((req, res, next) => {
    doctorSchema.findByIdAndUpdate(req.params.id, {
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
router.route('/delete-doctor/:id').delete((req, res, next) => {
    doctorSchema.findByIdAndRemove(req.params.id, (error,data) => {
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