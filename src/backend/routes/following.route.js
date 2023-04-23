let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const bcrypt = require('bcrypt');

// patient model
let followingSchema = require('../models/Following')
let patientSchema = require('../models/Patient')
let doctorSchema = require('../models/Doctor')
let chatroomSchema = require('../models/ChatRoom')
// create 
router.route('/create_request').post((req, res, next) => 
{
    const temp = req.body;
    //console.log(req.body+" dff ddd");
    temp.status =  "1";
    followingSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            //console.log(data);
            res.json(data);
        }
    })
})

// patient find request 
router.route('/my_request/:p_id').get( async (req, res) => {
    let filter2 = { p_id:req.params.p_id , status:"1"}
    const data = await followingSchema.find(filter2).lean();
    let temp_ls = data;
            for(let i=0;i<data.length;i++){
                let j = data[i]._id
                let filter = { d_id:j}
                const data2 = await doctorSchema.findOne(filter).lean();
                temp_ls[i].doc_uname = data2.username
                temp_ls[i].doc_tel = data2.tel
                temp_ls[i].doc_hos = data2.detail[0].hospital
            }
            res.json(temp_ls);
})




// following accept
router.route('/accept_request').post((req, res, next) => {
    let filter2 = { p_id:req.body.p_id, d_id:req.body.d_id }
    let update = { status: "2"}
    followingSchema.findOneAndUpdate( filter2,update,(error,data) => {
        if(error) {
            return next(error);
            console.log(error);
        }else{ }
    })
    const temp = {
        p_id: req.body.p_id,
        d_id: req.body.d_id,
        status: "0",
        last_message: "",
        time_last: "",
        side:  ""
    }
    chatroomSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            //console.log(data);
            res.json("request accepted");
        }
    })
})

// doctor search following 
router.route('/search_request').post( async (req, res) => {
    //console.log(req.body.mode + " gg " + req.body.search)
    let filter2 = {}
    if(req.body.mode == "rna") {
        filter2 = { "detail.name_sur":{ $regex: '.*' +  req.body.search + '.*' }}}      
    else if(req.body.mode == "una"){
        filter2 = { username:{ $regex: '.*' +  req.body.search + '.*' }}}
    
    const data = await patientSchema.find(filter2).lean();
    let temp_ls = data;
            for(let i=0;i<data.length;i++){
                let j = data[i]._id
                let filter = { p_id:j , d_id:req.body.d_id }
                const data2 = await followingSchema.findOne(filter).lean();
                if(data2 == null){
                temp_ls[i].bt_status = "0"
            }
                else{
                temp_ls[i].bt_status = data2.status
            }
            }
            res.json(temp_ls);
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