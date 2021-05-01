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
        this.$accounts = db.collection('account');
        this.$players = db.collection('player');
        this.$accountBanks = db.collection('account-bank');
        this.$statistics = db.collection('player-statistics');
        this.$items = db.collection('player-items');
        resolve();
      });
    });
  }
}

exports.DB = new Database();