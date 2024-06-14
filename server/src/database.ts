import mongoose from 'mongoose';

import { env } from '@/common/utils/envConfig';
import { logger } from '@/server';

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('MongoDB connected');
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error connecting to MongoDB: ${error?.message}`);
      process.exit(1);
    }
  }
};

export { connectDB };
