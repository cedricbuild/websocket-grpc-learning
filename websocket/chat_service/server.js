const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const port = 6969;
const app = express();
app.use(express.static(path.join(__dirname, '/static')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})