console.log(__dirname);
console.log(__filename);

setTimeout(()=>{
	console.log('File execution One - 2s'); 
}, 2000);

setTimeout(()=>{
        console.log('File execution Two - 5s');
}, 5000);

setTimeout(()=>{
        console.log('File execution Three - 1s');
}, 1000);

setInterval(()=>{
        console.log('File execution Repeat - 5s');
}, 5000);

