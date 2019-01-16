import express from 'express';
import cors from 'cors';
import dbConnect from './db/dbConnect';
import server from './graphql';

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

// allow cors-origin request
app.use(cors());

dbConnect();

server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`); // eslint-disable-line
});
