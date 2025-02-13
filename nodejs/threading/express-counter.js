const { Worker } = require("worker_threads");

const express = require("express");
const app = express();

const THREAD_COUNT = 4;

// 1 thread => Counter total is 20000000000 in 9621 ms
// 4 thread => Counter total is 20000000000 in 3043 ms

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./counter-worker.js", {
      workerData: {
        numberOfThreads: THREAD_COUNT,
      },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(error);
    });
  });
}

app.get("/", async (req, res) => {
  const workerPromises = [];

  const start = Date.now();

  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const threadResults = await Promise.all(workerPromises);

  const total = threadResults.reduce((prev, curr) => prev + curr, 0);

  res.send(`Counter total is ${total} in ${Date.now() - start} ms`);
});

app.listen(3000);
