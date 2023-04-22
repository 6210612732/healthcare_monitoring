'use strict';
const { handleEvent } = require("./line_service");
require("./mqtt_service");
const line = require('@line/bot-sdk');
//import "./line_service";
let express = require('express');
//const config = require('./config.json');

// create LINE SDK client
const config  =  {
  "port" : "8083",
  "channelAccessToken": "rui8Eowpp4GCYMmYwyGYQfe+Htgj70C13E0OvnRO9MaNF1JQ3nk4TuJN/sbF1IaBlvyEVK26j/10FinF44JFfHEUNow7K8TVqVISyUWEeyzwUEZj+ANYbP77u86dToKleupyDgy4118E50kmncd3cAdB04t89/1O/w1cDnyilFU=",
  "channelSecret": "8375a2b2921d00ebf4c193b56d1d3908"
}

const app = express();

// webhook callback
app.post('/webhook/line', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  // handle events separately
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    // check verify webhook event
    if (event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff') {
      return;
    }
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});





const port = config.port;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});