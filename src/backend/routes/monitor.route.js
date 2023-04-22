let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// student model
let monitorSchema = require('../models/Monitor')

// create student
router.route('/sniff-monitor').post((req, res, next) => {
    console.log(req.body);
    monitorSchema.create(req.body, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            console.log(data);
            //res.json(data);
        }
    })
})

// Read students 
router.route('/').get((req, res) => {
    monitorSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

// Get single student 
router.route('/edit-monitor/:id').get((req, res) => {
    monitorSchema.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update student
router.route('/update-monitor/:id').put((req, res, next) => {
    monitorSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body

    }, (error,data) => {
        if(error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('Student updated successfully');
        }
    })
})

// Delete student
router.route('/delete-monitor/:id').delete((req, res, next) => {
    monitorSchema.findByIdAndRemove(req.params.id, (error,data) => {
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