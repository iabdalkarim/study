// pm2 start express-pm2.js -i 0
// -i 0 -> will let pm2 to figure out how many instances can be spaned depending on the number of cores 
// pm2 list
// pm2 show [application name]
// pm2 monit
// pm2 delete express-pm2.js

const express = require("express");
const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get("/", (req, res) => {
  doWork(5000);
  res.send("Hi there");
});

app.listen(3000);
