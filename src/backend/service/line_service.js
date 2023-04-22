'use strict';

const line = require('@line/bot-sdk');
//const config = require('./config.json');

// create LINE SDK client
const config  =  {
  "channelAccessToken": "rui8Eowpp4GCYMmYwyGYQfe+Htgj70C13E0OvnRO9MaNF1JQ3nk4TuJN/sbF1IaBlvyEVK26j/10FinF44JFfHEUNow7K8TVqVISyUWEeyzwUEZj+ANYbP77u86dToKleupyDgy4118E50kmncd3cAdB04t89/1O/w1cDnyilFU=",
  "channelSecret": "8375a2b2921d00ebf4c193b56d1d3908"
}

const client = new line.Client(config);

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}
// heart rate 70-200
// pressure 60-220 upper/lower
// oxy 60-100%


function handleText(message, replyToken) {
    if(message.text == "status"){
      return replyText(replyToken, 'status\n heart rate : 116\n upper/lower: 125/83\n Oxi%: 98' );
    }
  return replyText(replyToken, '-');
}

function handleImage(message, replyToken) {
  return replyText(replyToken, '-');
}

function handleVideo(message, replyToken) {
  return replyText(replyToken, '-');
}

function handleAudio(message, replyToken) {
  return replyText(replyToken, '-');
}

function handleLocation(message, replyToken) {
  return replyText(replyToken, '-');
}

function handleSticker(message, replyToken) {
  return replyText(replyToken, '-');
}
