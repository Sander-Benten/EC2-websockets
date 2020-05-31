// server.js

const WebSocket = require('ws')  // Include the ws package

var transmitter  // To store transmitting connection
var receiver     // To store receiving connection

const wss = new WebSocket.Server({ port: 8080 })  // wss = a new WebSocketServer on port 8080

wss.on('connection', client => {  // Define behavior of the server
  console.log("client connected with IP => " + client._socket.remoteAddress) // Print the IP of the connected client

  client.on('message', message =>{  // When the server receives a message

    if (message == "transmitter"){  // If the client identifies itself as transmitter
      transmitter = client          // Save the transmitting client
      client.send("succesfully registered as transmitting client")

    }else if (message == "receiver") {  // If the client identifies itself as receiver
      receiver = client                 // Save the receiving client
      client.send("succesfully registered as receiving client")

    }else if (transmitter == client) {  // If a message comes from the transmitting client
      receiver.send(message)            // Send the message to the receiving client

    }else{  // If the message does not come from a transmitter and is not an identification.
      client.send("ERROR: cannot handle message")

    }

  })

  client.on('close', function(reasonCode, description) {  // get's called when a client disconnects
        console.log("a client disconnected")
    });

})
