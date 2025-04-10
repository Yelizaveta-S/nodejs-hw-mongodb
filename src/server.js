import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRoutes from './routes/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';

const setupServer = () => {
    const app = express();

    app.use(cookieParser());

    app.use(cors());
    app.use(pino());
    app.use(express.json());
    app.use('/auth', authRoutes);

    app.get('/', (req, res) => {
        res.send('Server is up and running');
    });

    app.use('/contacts', contactsRoutes);

    const swaggerDocumentPath = path.resolve(
      process.cwd(),
      'docs',
      'swagger.json',
    );
    const swaggerDocument = JSON.parse(
      fs.readFileSync(swaggerDocumentPath, 'utf-8'),
    );

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};

export default setupServer;
