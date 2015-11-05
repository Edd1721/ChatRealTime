'use strict'
const os = require('os');
const fs = require('fs');
const path = require('path');
const async = require('async');
const uuid = require('uuid');
const dataUriBuffer = require('data-uri-to-buffer');
const eventEmitter = require('events').EventEmitter;
const listFiles = require('./helper/list')

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
		event.emit('log',`Converting ${filename}`)
	}
	
	
	function createVideo(done){
		done();
	}
	
	function codeVideo(done){
		done();
	}
	
	function cleanUp(done){
		event.emit('log','Cleaning up');
		listFiles(tmpDir,basename,function(err,files){
			if(err) return done(err)
			DeleteFiles(files,done);
		})
	}
	
	function DeleteFiles(files,done){
		async.each(files,deleteFile,done);
	}
	
	function deleteFile(file,done){
		fs.unlink(path.join(tmpDir,file,function(err){
			//Ignoro el error porque no es el foco de la aplicacion borrar temporales.
			done();
		}))
	}
	
	function convertFinished(err){
		setTimeout(function(){
			event.emit('video','éste es el video enviado')
			},1000);	
	}	
	
	return event;
}