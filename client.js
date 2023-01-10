// CommonJS
const { io } = require("socket.io-client");

let msg = 'saludo desde mi sofa';
let ruta = '/home/room/tv/';
let socket = io.connect("http://localhost:3000", { forceNew: true });

socket.on("connect", () => {
  console.log('cliente conectado: ' + socket.connected); // true
});

// socket.emit("PUBLISH", msg, ruta, (callback) => {
//   console.log(callback); // "got it"
// });