// transmitter.js

const WebSocket = require('ws')  // Include the ws package
const url = 'ws://35.158.214.87:8080'  // The url of the server
const connection = new WebSocket(url)  // Create a connection with the client

connection.onopen = () => {  // when the connection opens

  connection.send("transmitter")  // Identify as a transmitter

  connection.send("This is a message from the transmitting client")  // Sent a message to the server that will be forwarded to the client

}


connection.onerror = (error) => {  // when there is a connection error to the server
  console.log(`WebSocket error: ${error}`)  // Print the error to the log
}

connection.onmessage = (message) => {  // when there is a message from the server
  console.log(message.data)  // Print the message in the log
}
