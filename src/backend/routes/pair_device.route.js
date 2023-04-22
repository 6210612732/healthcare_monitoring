let mongoose = require('mongoose'),
    app = require('express'),
    router = app.Router();
const bcrypt = require('bcrypt');

let pair_deviceSchema = require('../models/Pair_device')




router.route('/create_pair').post((req, res) => {
    //const { p_id , device_token } = req.body;
    pair_deviceSchema.findOne({ device_token: req.body.device_token}, async (error, data)=> {
        if(error) {
            return next(error);
        } else {
            if(data === null){
                global.status_first="3"
                const temp = req.body
                temp.d_status = global.status_first;
                temp.timeStamp = Date().toLocaleString();

                pair_deviceSchema.findOne({ p_id: req.body.p_id},(err,data2) =>{
                    if(err) throw err;
                    if(data2 === null) { console.log("first"); 
                    temp.d_status = "1"
                    pair_deviceSchema.create(temp, (error, data) => {
                        if(error) { 
                            return  next(error);
                        } else {
                            res.json({message: "add device success"});
    
                        }
                    }) }
                    else{
                        temp.d_status = "0"
                        pair_deviceSchema.create(temp, (error, data) => {
                            if(error) { 
                                return  next(error);
                            } else {
                                res.json({message: "add device success"});
        
                            }
                        }) 
                    }
                  })
                
                
            }
            else{
                    res.json({message: "this device already pair"});
                }
        }
    })
});

router.route('/delete_pair').post((req, res) => {
    const filter = { p_id:req.body.p_id, device_token: req.body.device_token }
    const update = { d_status: "0"}
    console.log(filter.p_id + " ddd in " +filter.device_token )
    pair_deviceSchema.findOneAndRemove(filter , (error,data) => {
        if(error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('remove successfully');
        }
    })
});

// Read all
router.route('/me/:id').get((req, res) => {
    const filter = { p_id:req.params.id }
    pair_deviceSchema.find( filter,(error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Read all
router.route('/').get((req, res) => {
    pair_deviceSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

module.exports = router;
