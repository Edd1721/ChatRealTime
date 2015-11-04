'use strict'
const os = require('os');
const fs = require('fs');
const path = require('path');
const async = require('async');
const uuid = require('uuid');
const dataUriBuffer = require('data-uri-to-buffer');
const eventEmitter = require('events').EventEmitter;

module.exports = function(images)
{
	let event = new eventEmitter();
	let cont = 0;
	let basename = uuid.v4();
	let tmpDir = os.tmpDir();
	
	async.series([
		decodeImages,
		createVideo,
		codeVideo,
		cleanUp		
	],convertFinished);
	
	function decodeImages(done){
		async.eachSeries(images,decodeImage,done);
	}
	
	function decodeImage(item,done){
		let filename = `${basename}-${count++}.jpg`
		let buffer = dataUriBuffer(item);
		let wrStr = fs.createWriteStream(path.join(tmpDir,filename))
		
		wrStr.on('error',done)
			 .end(buffer,done)
		event.emit('log',`${filename}`)
	}
	
	
	function createVideo(done){
		done();
	}
	
	function codeVideo(done){
		done();
	}
	
	function cleanUp(done){
		done();
	}
	
	function convertFinished(err){
		setTimeout(function(){
			event.emit('video','éste es el video enviado')
			},1000);	
	}	
	
	return event;
}