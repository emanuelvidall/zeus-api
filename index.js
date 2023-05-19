import express from 'express';
import connectDB from './src/utils/db.js';
import cors from 'cors';
import router from './src/routes/index.js'

export const dbpass = process.env.DB_PASSWORD;

const port = 3001;
const app = express();

app.use(cors());
app.options('*', cors());

app.all('*', router);

app.get('/', (req, res) => {
  return res.send('API Backend Running for ZEUS⚡!')
});

app.listen(port, () => {
  console.log(`App running on https://localhost:${port}`);
});

connectDB();