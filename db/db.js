let colors = require('colors');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017'

const dbName = 'simplestart'

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err, 'You probably need to start your database, try calling '.bgBlack.green + 'mongod --dbpath=./'.bgBlack.red + ' in a new terminal window'.bgBlack.green);
  console.log('Connet to DB'.bgBlue.bold.red)

  const db = client.db(dbName);

  client.close();
})

