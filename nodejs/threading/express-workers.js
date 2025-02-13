const express = require('express');
const { Worker } = require('worker_threads');

const app = express();
 
app.get('/', (req, res) => {
  const worker = new Worker('./worker.js');
 
  // If this thread is a Worker, this is a MessagePort allowing communication with the parent thread. 
  // Messages sent using parentPort.postMessage() are available in the parent thread using worker.on('message'), 
  // and messages sent from the parent thread using worker.postMessage() are available in this thread using parentPort.on('message').
  worker.on('message', function (message) {
    console.log(message);
    res.send('' + message);
  });
 
  worker.postMessage('start!');
});
 
app.get('/fast', (req, res) => {
  res.send('This was fast!');
});
 
app.listen(3000);
