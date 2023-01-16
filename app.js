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

const topic = new Topic('/');

// ------------------------------------------------------

io.on('connect', (socket) => {
  socket.on('PUBLISH', (msg, ruta, callback) => {
    var list = [];
    eventos.publish(topic, ruta, msg,list);
    list.forEach(element => {
      console.log('Socket: '+element[1]+' Mensaje: '+element[0]);
    });
    escribirLog(socket, ruta, 'PUBLISH')
    callback("PUBLICASTE CON EXITO");
  });

  socket.on('SUBSCRIBE', (msg, ruta, callback) => {
    eventos.suscribe(topic, ruta, socket.id);

    escribirLog(socket, ruta, 'SUBSCRIBE');
    callback("SUBSCRIBE CON EXITO");
  });

  socket.on('UNSUBSCRIBE', (msg, ruta, callback) => {
    eventos.unsuscribe(topic,route,socket.id);

    escribirLog(socket, ruta, 'UNSUBSCRIBE');
    callback("UNSUBSCRIBE CON EXITO");
  });
});

//---------------------------------------------------------

server.listen(3000, () => {
  console.log('listening on *:3000');
});