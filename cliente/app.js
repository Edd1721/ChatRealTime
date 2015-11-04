'use strict'
const webrtc2images = require('webrtc2images');
const xhr = require('xhr');
const controlRecord = document.querySelector('#btnRecord');

const rtc = new webrtc2images({
	width: 200,
	heigth: 200,
	frames: 10,
	type: 'image/jpeg',
	quality: 0.4,
	interval: 200,
}); 

rtc.startVideo(function(err){
	
});

controlRecord.addEventListener('click',Grabar);


//Métodos
function Grabar(e)
{
	e.preventDefault();
	rtc.recordVideo(function(err,frames){
		xhr({
			uri: '/process',
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({images: frames})
		},function(err,res,body){
			if(err) return logError(err)
			console.log(JSON.parse(body));
		})
	});
	console.log('Grabación iniciada');
}

function logError(err)
{
	console.error(err);
}