const express = require('express');
const app = express();
const PORT = 8084;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8081"
    }
});

app.use(cors());


socketIO.on('connection', (socket) => {
    console.log("user just connected!")

    socket.on('message', (data) => {
       // console.log(data);
        socketIO.emit('messageResponse', data);
      });
      
    socket.on('monitor_', (data) => {
        console.log(data);
    });



    socket.on('disconnect', () => {
      console.log(' A user disconnected');
    });
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

