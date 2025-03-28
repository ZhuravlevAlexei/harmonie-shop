import mongoose from 'mongoose';
import { env } from '@/utils/env';

const connectDB = async (): Promise<boolean> => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    const user = env({ name: 'MONGODB_USER' });
    const pwd = env({ name: 'MONGODB_PASSWORD' });
    const url = env({ name: 'MONGODB_URL' });
    const db = env({ name: 'MONGODB_DB' });

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`
    );
    // console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.log('Error while setting up Mongo connection', err);
    throw err;
  }
};

export default connectDB;
