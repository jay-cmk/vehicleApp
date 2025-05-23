import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './Database/mongoDatabase.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


connectDB();


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
