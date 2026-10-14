import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas / Local Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Server] Sri Shakthi Vinayaga Metals API running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
    console.log(`[Server] Health check available at: http://localhost:${PORT}/api/health`);
  });
});
