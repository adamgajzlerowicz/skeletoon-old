const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.static('build'));

app.all('*', (req, res) => {
  // res.send('dupa'); // load the index.ejs file
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(port);
console.log(`The magic happens on port ${port}`);
