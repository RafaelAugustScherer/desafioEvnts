import { connect, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  NODE_ENV,
} = process.env;

let uri: string;

if (NODE_ENV === 'production') {
  uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.gfw2a.mongodb.net/?retryWrites=true&w=majority`;
} else if (NODE_ENV === 'docker-development') {
  uri = 'mongodb://database:27017';
} else {
  uri = 'mongodb://localhost:3002';
}
console.log(uri);

const dbName = 'desafio-evnts';

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