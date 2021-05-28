const fs = require('fs')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)

writeFile('sample.txt', 'This is a sample text')
  .then(() => console.log('Successful write file'))
  .catch((error) => console.log('Something went wrong'))