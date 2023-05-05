let mongoose = require('mongoose'),
    app = require('express'),
    router = app.Router();
const bcrypt = require('bcrypt');

let doctorSchema = require('../models/Doctor')
let patientSchema = require('../models/Patient')
let AppointmentSchema = require('../models/Appointment')

// authen
router.route('/authen').post((req, res) => {
    console.log("ok login")
    const rreq = req.body
    if(req.body.email == "healthcare@monitoring.com" && req.body.password == "Admin123"){
        res.json({status: "login success", id: "xxx0-xxx0", person: "admin",urname:"admin-001"});
    }
    else{
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
                                //console.log("login success")
                                res.json({status: "login success", id: data._id, person: "patient",urname:data.username});
                            }
                            else{
                                //console.log("password incorrect");
                                res.json({status: "email or password incorrect"});
                            }
                        }
                    }
                })
            }else{
                //console.log(req.body.password + "  asdsd  " + data.password);
                const result = bcrypt.compareSync(req.body.password, data.password );
                if(result == true){
                    //console.log("login success")
                    res.json({status: "login success", id: data._id, person: "doctor",urname:data.username});
                    return 0;
                }
                else{
                    //console.log("password incorrect");
                    res.json({status: "email or password incorrect"});
                    return 0;
                }
            }
        }
    })
    }
})

// make appointment
router.route('/make_appointment').post( async (req, res, next) => 
{
    const temp = req.body;
    if(temp.appoint[0].session == "session1")
        temp.appoint[0].describe_session = "10:00 - 11:00"
    else if(temp.appoint[0].session == "session2")
        temp.appoint[0].describe_session = "11:00 - 12:00"
    else if(temp.appoint[0].session == "session3")
        temp.appoint[0].describe_session = "13:00 - 14:00"
    else if(temp.appoint[0].session == "session4")
        temp.appoint[0].describe_session = "14:00 - 15:00"
    else if(temp.appoint[0].session == "session5")
        temp.appoint[0].describe_session = "15:00 - 16:00"
    
    
    const filter = { d_id:req.body.d_id, 'appoint.session':req.body.appoint[0].session, 'appoint.date': req.body.appoint[0].date }
    const data2 = await AppointmentSchema.find(filter).lean();
    //console.log(data2);
    if(data2[0]== null){
        AppointmentSchema.create(temp, (error, data) => {
            if(error) { 
                return  next(error);
            } else {
                //console.log("success ap");
                res.json("make appoint success");
            }
        })
    }
    else{
        //console.log("fail ap");
        res.json("That time has already appoint");
    }
})


// Read patient 
router.route('/').get((req, res) => {
    //console.log("sda");
    doctorSchema.find((error,data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);

        }
    })
})

module.exports = router;