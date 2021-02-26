//server.js

const WebSocket = require('ws')  // Include the ws package

var transmittingClients = []  // To store transmitting connections
var receivingClients = []    // To store receiving connections

const wss = new WebSocket.Server({ port: 8080 })  // wss = a new WebSocketServer on port 8080

wss.on('connection', client => {  // Define behavior of the server
  console.log("client connected with IP => " + client._socket.remoteAddress) // Print the IP of the connected client

  client.on('message', message =>{  // When the server receives a message

    if (message == "transmitter"){  // If the client identifies itself as transmitter
      transmittingClients.push(client)          // Save the transmitting client
      client.send("succesfully registered as transmitting client")
      console.log("client identified as transmitter with IP => " + client._socket.remoteAddress) // Print the IP of the connected client


    }else if (message == "receiver") {  // If the client identifies itself as receiver
      receivingClients.push(client)                 // Save the receiving client
      client.send("succesfully registered as receiving client")
      console.log("client identified as receiver with IP => " + client._socket.remoteAddress) // Print the IP of the connected client


    }else if (transmittingClients.includes(client)) {  // If a message comes from a transmitting client
      receivingClients.forEach(function(value){
        value.send("message from (" + client._socket.remoteAddress + ") => " + message)
      })
      console.log("message from (" + client._socket.remoteAddress + ") => " + message)

    }else{  // If the message does not come from a transmitter and is not an identification
      client.send("ERROR: cannot handle message")
      console.log("Unusable Message from (" + client._socket.remoteAddress + ")")
    }

  })

  client.on('close', function(reasonCode, description) {  // get's called when a client disconnects
        console.log("a client disconnected")
        console.log(reasonCode)
        console.log(description)
    });

})

