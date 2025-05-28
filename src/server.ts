// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import {connectDB} from './lib/db'; // Import the database connection

dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to the database
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


