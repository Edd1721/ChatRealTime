const fs = require('fs');


module.exports = function(folder,filter,callback)
{
	fs.readdir(folder,onReadDir);
	
	function onReadDir(err, result){
		if(err) return callback(err);
		
		let files = result.filter(filterFiles);
				
		callback('null',files);
	}
	
	function filterFiles(file){
		return file.startsWith(filter);
	}
	
}