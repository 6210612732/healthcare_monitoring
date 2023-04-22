let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// patient model
let chatSchema = require('../models/Chat')
let chatroomSchema = require('../models/ChatRoom')
let patientSchema = require('../models/Patient')

// create 
router.route('/create_chatroom').post((req, res, next) => 
{
    const temp = req.body;
    temp.status =  "0";
    chatroomSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    })
    res.json("ddd");
})

// following search
router.route('/see_chatroom/:d_id').get((req, res) => {
    const filter = { d_id:req.params.d_id }
    let data2 = []
    chatroomSchema.find(filter,(error,data) => {
        if(error) {
            return next(error);
        } else {
            for(let i = 0; i<data.length;i++){
                data2.push(data[i])
                data2[i].name = "sung"
            }
            console.log(data2);
            res.json(data2)
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