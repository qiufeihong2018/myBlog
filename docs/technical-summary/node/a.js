var fs = require('fs');
var process = require('process');

fs.open("/home/devue/myItem/vuepress-blog/docs/technical-summary/node/log.txt",'w',function(err, fd){
	console.log(fd);
	while(true)
	{
		fs.write(fd,process.pid+"\n",function(){});
	}
});
