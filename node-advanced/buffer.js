const fs = require('fs')
const http = require('http')

http.createServer((req, res)=> {
  fs.readFile('./Setangibeach.mp4', (error, data) => {
    if(error){
      console.log('ERROR', error);
    }
    res.writeHead(200, {'Content-Type': 'video/mp4'})
    res.end(data)
  })
})
.listen(3900, () => {
  console.log('Buffer listening');
})