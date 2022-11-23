const express = require('express');
const path = require('path');

// Starting Express app
const app = express();

// Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, 'build')));

// Any routes will be redirected to the angular app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Starting server

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server started!');
  console.log(`on port ${port}`);
});
