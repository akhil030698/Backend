const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db.js');
const authRouter = require('./Routes/AuthRouter');
const productRouter = require('./Routes/ProductRouter');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());


app.use('/auth', authRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


