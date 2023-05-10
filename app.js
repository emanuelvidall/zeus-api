const express = require('express');
const dotenv = require ('dotenv');
const connectDB = require('./src/utils/db');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config({ path: ".env" });

const port = 3001;
const app = express();

connectDB();

app.use(cors());
app.options('*', cors());

app.all('*', require('./src/routes/index'));

app.get('/', (req, res) => {
  return res.send('OK!')
});

app.listen(port, () => {
  console.log(`App running on https://localhost:${port}`);
});