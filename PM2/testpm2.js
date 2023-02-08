const http = require("http")

http
.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
  console.log(` / Worker ${process.pid} !`);
})
.listen(4000);
console.log(`Worker ${process.pid} started`);





/* 
pm2 start ./testpm2.js --name="test" --watch -i max -- 9000 
pm2 stop all
pm2 stop 4
pm2 restart 4
pm2 monit
*/