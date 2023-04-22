let mongoose = require('mongoose'),
    app = require('express'),
    router = app.Router();
const bcrypt = require('bcrypt');

let doctorSchema = require('../models/Doctor')
let patientSchema = require('../models/Patient')


// authen
router.route('/authen').post((req, res) => {
    const rreq = req.body
    doctorSchema.findOne({ email: req.body.email}, (error, data)=> {
        if(error) {
            return next(error);
        } else {
            if(data === null){
                patientSchema.findOne({ email: req.body.email}, (error, data)=> {
                    if(error) {
                        return next(error);
                    } else {
                        if(data === null){
                            res.json({status: "email or password incorrect"});
                        }
                        else{
                            
                            //console.log(req.body.password + "  asdsd  " + data.password);
                            const result = bcrypt.compareSync(req.body.password, data.password );
                            if(result == true){
                                console.log("login success")
                                res.json({status: "login success", id: data._id, person: "patient"});
                            }
                            else{
                                console.log("password incorrect");
                                res.json({status: "email or password incorrect"});
                            }
                        }
                    }
                })
            }else{
                //console.log(req.body.password + "  asdsd  " + data.password);
                const result = bcrypt.compareSync(req.body.password, data.password );
                if(result == true){
                    console.log("login success")
                    res.json({status: "login success", id: data._id, person: "doctor"});
                    return 0;
                }
                else{
                    console.log("password incorrect");
                    res.json({status: "email or password incorrect"});
                    return 0;
                }
            }
        }
    })
})

// authen
// Read patient 
router.route('/').get((req, res) => {
    console.log("sda");
    doctorSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

module.exports = router;