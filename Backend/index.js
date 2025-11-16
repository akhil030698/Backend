const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db.js');
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('ping');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


