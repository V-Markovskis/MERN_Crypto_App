const { MongoClient } = require('mongodb');

const URL = 'MY_URL';

let dbConnection;

module.exports = {
  connectToDB: (cb) => {
    MongoClient.connect(URL)
      .then((client) => {
        console.log('Connected to MongoDB');
        dbConnection = client.db();
        return cb;
      })
      .catch((err) => {
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
