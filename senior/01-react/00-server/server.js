

const http = require('http');

const server = http.createServer((req,res)=>{
	res.setHeader('access-Control-Allow-Origin','*')
	res.end(JSON.stringify(['hhhhh','llllll']))
})
server.listen('3000','127.0.0.1',()=>{
	console.log('server is lister at http://127.0.0.1:3000')
})