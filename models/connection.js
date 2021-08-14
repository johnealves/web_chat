// require('dotenv').config();
const { MongoClient } = require('mongodb');

let schema = null;
DB_URL= 'mongodb://localhost:27017/webchat/';
DB_NAME= 'webchat';  

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
