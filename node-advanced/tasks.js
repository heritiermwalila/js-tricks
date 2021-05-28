/**
 * Task runners
 * Run all promise based tasks
 * @author Heritier Mbumba
 */

const logUpdate = require('log-update')

const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))
const toX = () => 'X'


class PromiseQueue {
  constructor(promises, currentCount) {
    this.current = currentCount;
    this.todo = promises
    this.running = []
    this.completed = []

  }

  get runNext() {
    
    return (this.running.length < this.current) && this.todo.length > 0
  }

  graphTask()
  {
    const {todo, running, completed} = this

    logUpdate(`
    
      todo: [${todo.map(toX)}]
      running: [${running.map(toX)}]
      completed: [${completed.map(toX)}]
    
    `);
  }

  run() {
    
    while(this.runNext){
      
      const promise = this.todo.shift()
      // console.log(promise);
      promise.then(()=>{
        this.completed.push(this.running.shift())
        this.run()
        this.graphTask()
      })
      this.running.push(promise)
    }
  }


}

const tasks = [
  delay(10),
  delay(2),
  delay(6),
  delay(9),
  delay(3)
]


const taskRunner = new PromiseQueue(tasks, 2)

taskRunner.run()