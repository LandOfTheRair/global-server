const { MongoClient } = require('mongodb');

const DB_URI = process.env.MONGODB_URI;
if(!DB_URI) {
  console.error('No env.MONGODB_URI set. Set one.');
  process.exit(0);
}

class Database {
  constructor() {
    this.isReady = new Promise((resolve, reject) => {
      MongoClient.connect(DB_URI, (err, client) => {
        if(err) {
          return reject(err);
        }

        console.log('Connected to ' + DB_URI);

        this.$statistics = client.collection('characterStatistics');
        resolve();
      });
    });
  }
}

exports.DB = new Database();