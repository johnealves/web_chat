const connection = require('./connection');

// const getAll = () => connection().then(
//   (db) => db.collection('messages').find().toArray(),
// );

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM messages'
  )

  return result
}

const saveMessage = async (message, nickname, timestamp) => {
  await connection.execute(
    'INSERT INTO messages (message, nickname, timestamp) VALUES (? ,? , ?)',
      [message, nickname, timestamp],
  );
} 

// const saveMessage = (message, nickname, timestamp) => connection()
//   .then((db) => db.collection('messages').insertOne(
//     { message, nickname, timestamp },
//   ));

module.exports = {
  getAll,
  saveMessage,
};
