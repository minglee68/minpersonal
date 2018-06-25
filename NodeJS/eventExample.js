var fs = require('fs');
var events = require('events');

const myEvent = new events.EventEmitter();

fs.readFile('text.txt', function(err, data){
	myEvent.emit('read');
	console.log('File has been read');
});

myEvent.on('read', function(data){
	console.log('Finished file read and event emit');
});

