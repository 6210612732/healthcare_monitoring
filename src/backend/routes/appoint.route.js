let mongoose = require('mongoose'),
    app = require('express'),
    router = app.Router();
const bcrypt = require('bcrypt');

let doctorSchema = require('../models/Doctor')
let patientSchema = require('../models/Patient')
let appointSchema = require('../models/Appointment')


// notuse 
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

// doc_schedule
router.route('/doc_schedule/:did').get( async (req, res,next) => {
    const data = await appointSchema.find({ d_id: req.params.did}).lean();
    let temp_ls = data;
        for(let i=0;i<data.length;i++){
            let j = data[i].p_id
            const data2 = await patientSchema.findOne({ _id:j}).lean();
            temp_ls[i].p_uname = data2.username
            temp_ls[i].p_urname = data2.detail[0].name_sur
        }
        res.json(temp_ls);
})
// p schedule
router.route('/p_schedule/:pid').get( async (req, res,next) => {
    const data = await appointSchema.find({ p_id: req.params.pid}).lean();
    let temp_ls = data;
        for(let i=0;i<data.length;i++){
            let j = data[i].p_id
            const data2 = await doctorSchema.findOne({ d_id:j}).lean();
            temp_ls[i].p_uname = data2.username
            temp_ls[i].p_urname = data2.detail[0].name_sur
        }
        res.json(temp_ls);
})

// delete apppoint
router.route('/delete_appoint').post((req, res) => {
    const filter = { _id:req.body._id }
    appointSchema.findByIdAndRemove(req.body._id , (error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json("cancel success");
        }
    })
});
/**
 
    
 */
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