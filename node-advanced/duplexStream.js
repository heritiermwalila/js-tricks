/**
 * Duplix stream is the stream which handle the read stream and the write stream
 */

const fs = require('fs')
const { PassThrough } = require('stream')

const readStream = fs.createReadStream('./Setangibeach.mp4')
const writeStream = fs.createWriteStream('./Setangibeach-Copy.mp4')

const report = new PassThrough()


let total = 0;

report.on('data', (chunk) => {

  total += chunk.length;
  console.log('bytes:', total);

})


readStream.pipe(report).pipe(writeStream).on('error', console.error)