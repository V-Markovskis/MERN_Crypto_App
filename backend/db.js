const {MongoClient} = require("mongodb");
require('dotenv').config();

const URI = process.env.DATABASE_URI;

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URI).then((client) => {
            dbConnection = client.db();
            console.log('Connected successfully')
            console.log(URI);
            return cb();
        }).catch((err) => {
            console.log(err);
            return cb(err);
        })
    },
    getDb: () => dbConnection
}