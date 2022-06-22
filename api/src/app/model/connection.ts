import { connect, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

const uri = MONGODB_URI
  || `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.gfw2a.mongodb.net/?retryWrites=true&w=majority`;

const options: ConnectOptions = {
  dbName: 'desafio-evnts',
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