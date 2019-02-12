import dbConnect from './db/dbConnect';
import server from './graphql';

require('dotenv').config();

const PORT = process.env.PORT || 4000;

dbConnect();

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`); // eslint-disable-line
});
