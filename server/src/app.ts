import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/error.middleware';

// try to require the api router module and fallback to a simple router if it's missing
let apiV1: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  apiV1 = require('./api/v1').default;
} catch (e) {
  const router = express.Router();
  router.get('/', (_req, res) => res.json({ message: 'API v1' }));
  apiV1 = router;
}

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/v1', apiV1);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

main();