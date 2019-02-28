import express from 'express';
import cors from 'cors';
import dbConnect from './db/dbConnect';
import server from './graphql';

require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

// allow cors-origin request
app.use(cors());

app.use('/image', express.static(process.env.UPLOAD_DIR));

dbConnect();

server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`); // eslint-disable-line
});
