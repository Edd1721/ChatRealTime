'use strict'

const http = require('http');
const port = process.env.PORT || 8081
const server = http.createServer();

server.on('request',onRequest);
server.on('listening',onListening);
server.listen(port);

//Métodos
function onRequest(req,res)
{
	res.end('Hola Node js');
}

function onListening()
{
	console.log('Servidor Corriendo en el puerto $(port)')
}