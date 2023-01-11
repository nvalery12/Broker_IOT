const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const fs = require('fs');
const { Socket } = require('socket.io-client');

// Protocolos
// MQTT
const eventos = require('./protocolos/mqtt/funcionesDeManejo.js');
const { Topic } = require('./protocolos/mqtt/topico')

const topic = new Topic('/');

//--------------------------------
//Funciones de servidor

function escribirLog(socket, ruta, evento){
  fs.appendFile('./logs.txt', 'autor: ' + socket.conn.remoteAddress + ' Topico: '+ ruta + ' evento: ' + evento + '\n', (error)=>{
      if (error){
        throw error;
      }
  })
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

// ------------------------------------------------------
//Instancia de los topicos

const topico = new Topic('/')

// ------------------------------------------------------

io.on('connect', (socket) => {
  socket.on('PUBLISH', (msg, ruta, callback) => {
      
      // eventos.publish(topic, ruta, msg);

      escribirLog(socket, ruta, 'PUBLISH')
      callback("PUBLICASTE CON EXITO");
      console.log(socket.id);
  });

  socket.on('SUBSCRIBE', (msg, ruta, callback) => {
      // suscribe(topic,route,socket.id);

      // eventos.suscribe(topic, ruta, socket.id);

      escribirLog(socket, ruta, 'SUBSCRIBE');
      callback("SUBSCRIBE CON EXITO");
      console.log(socket.id);
  });

  socket.on('UNSUBSCRIBE', (msg, ruta, callback) => {
      // unsuscribe(topic,route,socket.id)

      escribirLog(socket, ruta, 'UNSUBSCRIBE')
      callback("UNSUBSCRIBE CON EXITO");
      console.log(socket.id);
  });

  console.log(socket.id);
  console.log(topico);
});

//---------------------------------------------------------

server.listen(3000, () => {
  console.log('listening on *:3000');
});