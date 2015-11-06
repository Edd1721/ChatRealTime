'use strict'
const os = require('os');
const path = require('path');
const spawn = require('child_process').spawn;

module.exports = function(options,callback){
	if(!options.baseName) return callback(new TypeError('Debe especificar un nombre base'));
	
	let folder = options.folder || os.tmpDir;
	let baseName = options.baseName;
	let fileSrc = path.join(folder,`${basename}-%d.jpg`);
	let fileDestino = path.join(folder,`${baseName}.webm`)
	
	let ffmpeg = spawn('ffmpeg',[
		'-i',
		fileSrc,
		'-filter:v',
		'setpts=2.5*PTS',
		'-vcodec',
		'libvpx',
		'-an',
		fileDestino
	]);
	
	ffmpeg.dtsout.on('close',function(code){
		//Cuando termina el codigo de ejecucion devuelve un númer.
		//Cuando el número es cero entonces todo terminó bien. Si es distinto de ceró falló.
		if(!code) return callback(null);
		
		callback(new Error(`ffmpeg termino con el código ${code}`));
	})
}