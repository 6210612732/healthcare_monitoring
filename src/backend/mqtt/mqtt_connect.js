import React, { useState, Fragment } from "react";
var mqtt = require('mqtt')

/*
const url = 'wss://b0e4bc29b2b04d229cbc0d068e519c0d.s2.eu.hivemq.cloud:8884/mqtt'
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'sadad',
    username: 'Abcde55',
    password: 'Abcdef55',
  }
  */
  //80 : MQTT over unencrypted WebSockets (note: URL must be /mqtt )
const url = 'wss://mqtt.eclipseprojects.io:443/mqtt'
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'abcdef',
  }
const client  = mqtt.connect(url, options)

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('panIot');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('panIot', 'im in');


function Mqx() {
 
  
 
  return (
    <div >
        <h1>Hello MQTT in React</h1>
        <p>The message payload is: </p>
    </div>
  );
}
export default Mqx;