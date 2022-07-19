const express = require('express');
const app = express();

const path = require('path');

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('Please use the production server'));
}

app.list(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening on port ' + port);
});
