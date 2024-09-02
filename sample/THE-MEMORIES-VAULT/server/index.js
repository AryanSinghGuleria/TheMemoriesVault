
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const CONNECTION_URL = `mongodb+srv://${username}:${password}@cluster0.qvprcty.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

