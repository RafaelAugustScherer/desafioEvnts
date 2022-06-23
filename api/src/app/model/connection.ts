import { connect, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const {
  MONGODB_URI,
  MONGODB_DATABASE,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
} = process.env;

const uri = MONGODB_URI
  || `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.gfw2a.mongodb.net/?retryWrites=true&w=majority`;

const dbName = MONGODB_DATABASE || 'desafio-evnts';

const options: ConnectOptions = {
  dbName,
  autoIndex: true,
};

const connectToDatabase = (
  connectionUri = uri,
  connectionOptions = options,
) => connect(connectionUri, connectionOptions, (err) => {
  if (err) {
    console.info(
      `ℹ️ Could not connect to MongoDB: ${err.message}`,
    );
  }
  else {
    console.info(
      'ℹ️ Successfully connected to MongoDB',
    );
  }
});

export {
  connectToDatabase,
};