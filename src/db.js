const { MongoClient } = require('mongodb');

const DB_URI = process.env.MONGODB_URI;
if(!DB_URI) {
  console.error('No env.MONGODB_URI set. Set one.');
  process.exit(0);
}

class Database {
  constructor() {
    this.isReady = new Promise((resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
      client.connect().then(() => {

        console.log('Connected to ' + DB_URI);
  
        const db = client.db('landoftherair2');
        this.$statistics = db.collection('player-statistics');
        resolve();
      });
    });
  }
}

exports.DB = new Database();