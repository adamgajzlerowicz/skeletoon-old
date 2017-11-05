import express from 'express';

const port = process.env.PORT || 8080;
const path = require('path');

const app = express();

app.use(express.static('build'));

app.all('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(port);
console.log(`http://localhost:${port}`);
