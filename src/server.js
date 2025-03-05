import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import contactsRoutes from './routes/contacts.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(pino());
  app.use(express.json());

  app.use(contactsRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const dbURI = process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DB;

  if (!dbURI || !dbName) {
    console.error('Error: Missing MongoDB URL or database name in .env file');
    process.exit(1);
  }

  // mongoose.connect(dbURI, { 
  //   dbName: dbName, 
  //   useNewUrlParser: true, 
  //   useUnifiedTopology: true 
  // })
  //   .then(() => console.log('Connected to MongoDB'))
  //   .catch((error) => {
  //     console.log('Error connecting to MongoDB:', error);
  //     process.exit(1);
  //   });

  // process.on('SIGINT', () => {
  //   mongoose.connection.close(() => {
  //     console.log('MongoDB connection closed due to app termination');
  //     process.exit(0);
  //   });
  // });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
