const fs = require('fs')
const http = require('http')
const {Readable, Transform} = require('stream')

/**
 * Stream movie with low memory consumption
 */
const server = http.createServer((req, res)=> {

  res.writeHead(200, {'Content-Type':'video/mp4'})

  fs.createReadStream('./Setangibeach.mp4')
  .pipe(res)
  .on('error', () => console.log('something went wrong'))

})


/**
 * Create a readable steam
 */
class ReadArrayFromSteam extends Readable {
  constructor(array)
  {
    super({
      objectMode: true
    })
    this.array = array
    this.index = 0
  }

  _read() {
    if(this.index <= this.array.length){
      const chunk = {
        data: this.array[this.index],
        index: this.index
      }
      this.push(chunk)
      this.index += 1
    }else {
      this.push(null)
    }
    
  }
}

const peaks = [
  'Heritier',
  'Mbumba',
  'Chenani',
  'Rukiya',
  'Hyacinth',
  'Mukekwa',
  'Nyira',
  'Matama'
]

const readPeaks = new ReadArrayFromSteam(peaks)

readPeaks.on('data', (data) => console.log(data))
readPeaks.on('end', () => console.log('Ended'))


/**
 * =============================
 * Backpressure stream
 * ============================

  const readStream = fs.createReadStream('./Setangibeach.mp4')
  const writeStream = fs.createWriteStream('./setangi-copy.mp4')

  readStream.on('data', (chunk) => {
    const result = writeStream.write(chunk)

    if(!result){
      console.log('Back pressure happened');
      readStream.pause()
    }
  })


  writeStream.on('drain', () => {
    console.log('Drained');
    readStream.resume()
  })

  writeStream.on('close', () => {
    process.stdout.write('File copied!')
  })

  END
 */

/**
 * ============================================
 * Pipe stream handle on the event on the 
 * read stream and write stream
 * =============================================

  readStream.pipe(writeStream)

  */

 /**
  * ===============================
  * Transform streams
  * ===============================
  */
 
 class ReplaceText extends Transform {

  constructor(char)
  {
    super()
    this.replaceChar = char
  }

   _transform(chunk, encoding, callback){

    const transformChunk = chunk.toString()
    .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar)

    this.push(transformChunk)
    callback()

   }

   _flush(cb)
   {
     this.push('more stuff is being passed...')
     cb();
   }
 }


 const xStream = new ReplaceText('x')

 process.stdin.pipe(xStream).pipe(process.stdout)

