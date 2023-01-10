const express = require('express');
const app = express();

//--------------------------------

app.get('/', (req, res)=>{
  res.send('mi primer servidor con Express. Cursos ♥')
});

// ------------------------------------------------------

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=>{
  console.log(`Escuchando en el puerto ${PUERTO}...`);
});