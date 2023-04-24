let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const bcrypt = require('bcrypt');

// patient model
let patientSchema = require('../models/Patient')
let followingSchema = require('../models/Following')

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
router.route('/info-patient/:id/:did').get( async (req, res,next) => {
    let ff = req.params.did
    if(req.params.did == "patient"){
         ff = ""
    }
    const data = await patientSchema.findOne({ _id: req.params.id}).lean();
    let temp_ls = data;
            let filter = { d_id:ff}
            console.log()
            const data2 = await followingSchema.findOne(filter).lean();
            if(data2!=null){
            temp_ls.violent = data2.violent
            temp_ls.v_id = data2._id
             }
            res.json(temp_ls);
            //console.log(data); 
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