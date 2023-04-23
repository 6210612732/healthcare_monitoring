let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// patient model
let chatSchema = require('../models/Chat')
let chatroomSchema = require('../models/ChatRoom')
let patientSchema = require('../models/Patient')
let doctorSchema = require('../models/Doctor')


// create  chat message
router.route('/create_chatmessage/').post((req, res, next) => 
{
    const temp = req.body;
    const zz = new Date()
    temp.timestamp =  zz.getFullYear()+"-"+zz.getMonth()+"-"+zz.getDate() + " | " + zz.getHours() + ":" + zz.getMinutes();
    let filter2 = { p_id:req.body.p_id, d_id:req.body.d_id }
    let update = { last_message: req.body.message, time_last: temp.timestamp ,side: req.body.side }
    chatroomSchema.findOneAndUpdate( filter2,update,(error,data) => {
        if(error) {
            return next(error);
            console.log(error);
        }else{ }
    })
    chatSchema.create(temp, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
            res.json(data);
        }
    })
    
})



// read  chat message
router.route('/chat_list/:d_id/:p_id').get( async (req, res, next) => 
{   
    const filter = { p_id:req.params.p_id, d_id:req.params.d_id }
    const data = await chatSchema.find(filter).lean();
    const data2 = await doctorSchema.findOne({ _id:req.params.d_id }).lean();
    const data3 = await patientSchema.findOne({ _id:req.params.p_id }).lean();
    for(let i=0;i<data.length;i++){
        data[i].p_uname = data3.username
        data[i].p_realname = data3.detail[0].name_sur
        data[i].d_uname = data2.username
    }
    console.log(data)
    res.json(data)
})



// create  chatroom
router.route('/create_chatroom').post((req, res, next) => 
{
    const temp = req.body;
    temp.status =  "0";
    temp.side = "0"
    temp.last_message = ""
    temp.time_last = ""
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

// patient chatroom
router.route('/see_chatroom_p/:p_id').get( async (req, res) => {
        const filter = { p_id:req.params.p_id }
        const data = await chatroomSchema.find(filter).lean();
        for(let i=0;i<data.length;i++){
            let j = data[i].d_id
            let filter = { _id:j}
            const data2 = await doctorSchema.findOne(filter).lean();
            data[i].username = data2.username
        }
        res.json(data)
})

// doctor chatroom
router.route('/see_chatroom/:d_id').get( async (req, res) => {
    const filter = { d_id:req.params.d_id }
    const data = await chatroomSchema.find(filter).lean();
    for(let i=0;i<data.length;i++){
        let j = data[i].p_id
        let filter = { _id:j}
        const data2 = await patientSchema.findOne(filter).lean();
        data[i].username = data2.username
    }
    res.json(data)
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


/*
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
*/
module.exports = router;