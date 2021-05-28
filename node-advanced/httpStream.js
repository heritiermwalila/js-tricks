/**
 * Stream http content
 */
const { createReadStream, createWriteStream, stat } = require('fs')
const {createServer} = require('http')
const { promisify } = require('util')

const fileInfo = promisify(stat)

const filename = 'Setangibeach.mp4'


createServer(async (req, res) => {

    const {size} = await fileInfo(filename)

    const range = req.headers.range

    if(range){
        /**
         * Hanle range value
         */
        let [start, end] = range.replace(/bytes=/, '').split('-')
        start = parseInt(start)
        end = end ? parseInt(end) : size - 1

        res.writeHead(206, {
            'Content-Range': `bytes ${start} - ${end} / ${size}`,
            'Accept-Range': 'bytes',
            'Content-Lenght': (end - start) + 1,
            'Content-Type': 'video/mp4'
        })

        createReadStream(filename, {start, end}).pipe(res)
        

    }else {
        res.writeHead(200, {
            'Content-Type': 'video/mp4',
            'Content-Lenght': size
        })
        createReadStream(filename).pipe(res)
    }

    

}).listen(3000, () => console.log('Server is listening on 3000'))