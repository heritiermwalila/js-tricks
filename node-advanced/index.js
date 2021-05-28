/**
 * Callback using process.nextTick to avoid code blocking
 * @param {*} str 
 * @param {*} cb 
 */
function hideString(str, cb){
  process.nextTick(()=>{
    cb(str.replace(/[a-zA-Z]/g, 'X').replace(' ', '-'))
  })
  
}

hideString("Hello world", (result) => {
  console.log(result);
})

console.log('End');


/**
 * 
 * @param {*} seconds 
 * @param {*} callback 
 */
function delay(seconds, callback){

  setTimeout(callback, seconds * 1000)

}

console.log('start delays');
delay(2, () => {
  console.log('two seconds finished');
  delay(1, () => {
    console.log('tree seconds finished');
    delay(1, () => {
      
      console.log('four seconds finished');
    })
  })
})


/**
 * Delays with promise
 * @param {*} seconds 
 * @returns 
 */
  const delay = (seconds) => new Promise((resolve)=> {
    setTimeout(resolve, seconds * 100)
  })




/**
 * Promisify callbacks
 */
 const { promisify } = require('util')

  const delay = (seconds, callback) => {
    if(seconds > 3){
      callback(new Error('Seconds two long to handle'))
    }else {
      
      setTimeout(()=>
        callback(null, `the ${seconds} second delay is over`),
        seconds
      )

    }
  }
  const promiseDelay = promisify(delay)

  promiseDelay(5)
    .then(console.log)
    .catch((error) => console.log(error.message))


