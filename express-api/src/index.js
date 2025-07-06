import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import portfolioRoutes from './routes/portfolio.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/portfolio', portfolioRoutes);

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/portfolio_db';
mongoose.connect(mongoUrl).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`Express API running on ${PORT}`));
});
