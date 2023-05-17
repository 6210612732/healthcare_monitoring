const { io } = require("socket.io-client");
let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let socket = io("http://localhost:8084",{
    reconnection: true
})

// student model
let monitorSchema = require('../models/Monitor')

// create student
router.route('/sniff-monitor').post((req, res, next) => {
    //console.log(req.body);
    monitorSchema.create(req.body, (error, data) => {
        if(error) { 
            return  next(error);
        } else {
             socket.emit('all_device',"update_"+JSON.stringify( data._id));
            console.log(JSON.stringify( data._id));
            res.json(data);
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
            //console.log('Student updated successfully');
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


// mini monitor
router.route('/mini_monitor/:token/:device').get( async (req, res) => {
    let filter2 = { device_token:req.params.token }
    const data = await monitorSchema.find(filter2).lean();
    let temp_ls = data;
    let d_data = []
    //console.log(data)
    res.json(data)
    /*
    if(req.params.device == "oxi"){
        for(let i=0;i<temp_ls.length;i++){
            if('Oximeter' in temp_ls[i]){
                console.log(temp_ls[i].Oximeter[0].SAT)
                d_data.push({time:temp_ls[i].time, date:temp_ls[i].date, sat:temp_ls[i].Oximeter[0].SAT})
                //res.json(d_data)
            }
        } */ // else{ temp_ls.splice(i, 1);    i--;   }
    //}
})

module.exports = router;