
const { sample } = require('lodash');

const { DB } = require('../db');

const factoids = [

  // total characters
  async () => {
    const totalCharacters = await DB.$players.countDocuments({});

    return `created ${totalCharacters.toLocaleString()} characters!`;
  },

  // total gold
  async () => {

    const cursor = await DB.$accountBanks.aggregate([
      { $group: {
        _id: null,
        value: { $sum: '$deposits.gold' }
      } }
    ]);

    const value = (await cursor.toArray())[0].value;

    return `banked ${value.toLocaleString()} gold!`;
  },

  // total monsters killed
  async () => {

    const cursor = await DB.$statistics.aggregate([
      { $group: {
        _id: null,
        value: { $sum: '$statistics.kills' }
      } }
    ]);

    const value = (await cursor.toArray())[0].value;

    return `killed ${value.toLocaleString()} monsters!`;
  },

  // total deaths
  async () => {

    const cursor = await DB.$statistics.aggregate([
      { $group: {
        _id: null,
        value: { $sum: '$statistics.deaths' }
      } }
    ]);

    const value = (await cursor.toArray())[0].value;

    return `died ${value.toLocaleString()} times!`;
  },

  // total quests
  async () => {

    const cursor = await DB.$statistics.aggregate([
      { $group: {
        _id: null,
        value1: { $sum: '$statistics.repeatablequests' },
        value2: { $sum: '$statistics.dailyquests' }
      } }
    ]);

    const res = (await cursor.toArray())[0];
    const value = res.value1 + res.value2;

    return `completed ${value.toLocaleString()} quests!`;
  },

  // total levels
  async () => {

    // this should really subtract $players.count() to account for level 1
    // but it's a simple factoid and honestly less db queries is nicer
    const cursor = await DB.$players.aggregate([
      { $group: {
        _id: null,
        value: { $sum: '$level' },
      } }
    ]);

    const value = (await cursor.toArray())[0].value;

    return `leveled up ${value.toLocaleString()} times!`;
  }
];

exports.route = (app) => {
  app.get('/factoid', async (req, res) => {

    const totalAccounts = await DB.$accounts.countDocuments({});

    /* debugging
    factoids.forEach(async fact => {
      console.log(await fact())
    })
    */

    res.json({
      factoid: `Join the ${totalAccounts.toLocaleString()} players who have ${await sample(factoids)()}`
    });
    
  });
}
