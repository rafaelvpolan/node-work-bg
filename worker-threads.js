
const massiveWork = require('./massive-work')

const { Worker, workerData, isMainThread, parentPort } = require('worker_threads');
 
if (isMainThread) {
  const worker1 = new Worker(__filename, { workerData: 'Worker Data 1'});
  worker1.on('message', message => console.log(message));
  const worker2 = new Worker(__filename, { workerData: 'Worker Data 2' });
  worker2.on('message', message => console.log(message));
} else {
  parentPort.postMessage('[PARENT] I am ' + workerData);
  massiveWork.init()
}


// setInterval(()=>{
//     W2.postMessage('[PARENT] I am :::::::::' )
// },2000)