import mongoose from 'mongoose';
import { env } from '@/shared/utils/env';

const connectDB = async (): Promise<boolean> => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

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
