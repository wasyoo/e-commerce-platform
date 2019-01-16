import mongoose from 'mongoose';

export default async function dbConnect() {
  mongoose.connection
    .on('error', (error) => { console.log(`MongoDB Connection error ${error}`); }) // eslint-disable-line
    .on('close', () => { console.log('Mongodb closed!'); }) // eslint-disable-line
    .once('open', () => {
      console.log('connected to database'); // eslint-disable-line
    });
  await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', { useNewUrlParser: true });
}

