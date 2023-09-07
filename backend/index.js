import express from 'express';
import { MONGO_URL, PORT } from './config.js';
import mongoose from 'mongoose';
import router from './routes/booksRoute.js';
import cors from 'cors';

//Configuration
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://localhost:4000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/books', router);

mongoose.connect(MONGO_URL).then(() => {
  console.log('App connected to database.');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});
