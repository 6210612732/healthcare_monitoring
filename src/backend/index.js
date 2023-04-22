let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db')

// express route
const patientRoute = require('../backend/routes/patient.route');
const monitorRoute = require('../backend/routes/monitor.route');
const doctorRoute = require('../backend/routes/doctor.route');
const appRoute = require('../backend/routes/app.route');
const pairRoute = require('../backend/routes/pair_device.route');
const appointRoute = require('../backend/routes/appoint.route');
const followingRoute = require('../backend/routes/following.route');
const chatRoute = require('../backend/routes/chat.route');

// connecting mongodb database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/mntdb', {
    useNewUrlParser: true
}).then(() => {
    console.log('Database successful connected');
},
    error => {
        console.log('could not connect to database: ' + error)

    }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());
app.use('/api/patient', patientRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/monitor', monitorRoute);
app.use('/api/pair', pairRoute);
app.use('/api/appointment', appointRoute);
app.use('/api/following', followingRoute);
app.use('/api/chat', chatRoute);
app.use('/api/app', appRoute);

// port
const port = process.env.PORT || 8082;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})


// 404 error
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})

