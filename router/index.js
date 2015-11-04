'use strict'
const path = require('path');
const  st = require('st');
const jsonBody = require('body/json');
const helper = require('../helper');
const course = require('course');
const router = course();
const mount = st({
	path: path.join(__dirname,'..','public'),
	index: 'index.html',	
	passthrough: true
});

router.post('/process',function(req,res){
	jsonBody(req,res,{limit: 3 * 1024 * 1024},function(err,body){
		if(err) return faile(err,res);
				
		let converter = helper.convertVideo(body.images)
		converter.on('video',function(video){
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify({video: video}));
		});
		
		res.setHeader('Content-Type','application/json')
		res.end(JSON.stringify({ok: true}))
	});
});


function onRequest(req,res)
{
	mount(req,res,function(err){
		if(err){ return faile(err, res);}	
		
		router(req,res,function(err){
			if(err) faile(err,res);
			res.statusCode = 404;
		res.end(`Page not found ${req.url}`);
		});	
				
	});
}

function faile(err,res)
{
	res.statusCode = 500;
	res.setHeader('Content-Type','text/plain');
	res.end(err.message);
}

module.exports = onRequest