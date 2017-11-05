const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(express.static('build'));

app.all('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(port);
console.log(` Listening on port ${port}`);
