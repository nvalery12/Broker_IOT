const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//--------------------------------

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

// ------------------------------------------------------


io.on('connect', Socket =>{
  console.log('a user connected');

  Socket.on('PUBLISH', (msg, ruta, callback) =>{
    console.log(`Publicaste ${msg} en la ruta: ${ruta}`);
    callback('publicaste bonito');
  });

});

  
// ------------------------------------------------------

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=>{
  console.log(`Escuchando en el puerto ${PUERTO}...`);
});