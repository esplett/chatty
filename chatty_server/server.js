// server.js
const express = require('express');
const Ws = require('ws')
const SocketServer = Ws.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      console.log(client.readyState, Ws.OPEN)
    if (client.readyState === Ws.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

// receiving data
ws.on('message', function (data) {
    console.log("message received")
    const message = JSON.parse(data);
    switch (message.type) {
      case "postMessage":
      message.id = uuid();
      message.type = "incomingMessage";
      wss.broadcast(JSON.stringify(message));
      break;
      case "postNotification": 
      message.id = uuid();
      message.type = "incomingNotification";
      wss.broadcast(JSON.stringify(message));
      break;
    }
});


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
    
});


