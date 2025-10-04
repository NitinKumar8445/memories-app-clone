import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';



dotenv.config();
await connectDB();

const app = express();
// serve uploaded images  BEFORE any body-parser
//  app.use('/uploads', express.static(path.join('uploads')));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


// routes
app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));