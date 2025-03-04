import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Импортируем dotenv для работы с переменными окружения
import contactsRoutes from './routes/contacts.js'; // Импорт роута контактов

// Загружаем переменные окружения из .env файла
dotenv.config();

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(pino());
  app.use(express.json()); // Для обработки JSON тела запроса

  // Используем руты для контактов
  app.use('/api', contactsRoutes);

  // Обработчик несуществующих роутов
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Получаем URI и имя базы данных из переменных окружения
  const dbURI = process.env.MONGODB_URL; // Используем значение из .env файла
  const dbName = process.env.MONGODB_DB; // Используем значение из .env файла

  // Проверяем наличие переменных окружения
  if (!dbURI || !dbName) {
    console.error('Error: Missing MongoDB URL or database name in .env file');
    process.exit(1); // Прерываем запуск сервера, если переменные окружения отсутствуют
  }

  // Подключаемся к MongoDB
  mongoose.connect(dbURI, { 
    dbName: dbName, // Имя базы данных
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error);
      process.exit(1); // Завершаем приложение в случае ошибки подключения
    });

  // Обрабатываем завершение работы сервера и закрытие соединения с MongoDB
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
  });

  // Запуск сервера
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
