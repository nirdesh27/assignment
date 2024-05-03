import mongoose from 'mongoose';

import { app } from './app';
process.env.JWT_KEY="asdfasdf" // for local setup only
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    //await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    await mongoose.connect('mongodb://localhost:27017/auth', {
      // 'useNewUrlParser': true,
      // 'useUnifiedTopology': true,
      // 'useCreateIndex': true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
    throw new Error("mongoConnection fails : exiting");
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
