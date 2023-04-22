let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const bcrypt = require('bcrypt');

// patient model
let followingSchema = require('../models/Following')
let patientSchema = require('../models/Patient')

// create 
router.route('/create_request').post((req, res, next) => 
{
    const temp = req.body;
    console.log(req.body+" d ddd");
    temp.status =  "0";
   /* followingSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    })*/res.json("ddd");
})

// following search
router.route('/search_request').get((req, res) => {
    patientSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            let temp_ls = data;
            for(let i=0;i<data.length;i++){
                const j = data[i].p_id
                const filter = { j, d_id:req.params.d_id }
                followingSchema.find(filter,(error,data2) => {
                    if(error) {
                        return next(error);
                    } else {
                        if(data2 != null){
                            temp_ls[i].status = data2.status
                        }
                    }
                })
            }
            res.json(temp_ls);
          }
    })
})

// Read patient 
router.route('/').get((req, res) => {
    followingSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

// Get single patient 
router.route('/edit-doctor/:id').get((req, res) => {
    followingSchema.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update patient
router.route('/update-doctor/:id').put((req, res, next) => {
    followingSchema.findByIdAndUpdate(req.params.id, {
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
    followingSchema.findByIdAndRemove(req.params.id, (error,data) => {
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