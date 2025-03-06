import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    const dbURI = getEnvVar('MONGODB_URL');
    const dbName = getEnvVar('MONGODB_DB');
    const dbUser = getEnvVar('MONGODB_USER');
    const dbPassword = getEnvVar('MONGODB_PASSWORD');

    const mongoUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbURI}/${dbName}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error with MongoDB connection:', error.message);
    process.exit(1);
  }
};

export default initMongoConnection;

