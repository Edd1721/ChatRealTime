'use strict'

const http = require('http');
const path = require('path');
const fs = require('fs');
const router = require('./router');
const port = process.env.PORT || 8081
const server = http.createServer();

server.on('request',router);
server.on('listening',onListening);
server.listen(port);

//Métodos
function onListening()
{
	console.log(`Servidor Corriendo en el puerto ${port}`);
}
