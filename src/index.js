import dotenv from 'dotenv';
dotenv.config();
import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';

const startServer = async () => {
  await initMongoConnection();

  const app = setupServer();
  const PORT = process.env.PORT || 3000;
const contactsRoutes = await import('./routes/contacts.js').then(
  (m) => m.default,
);
app.use('/contacts', contactsRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
