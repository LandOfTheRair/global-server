
const { ObjectId } = require('mongodb');
const { DB } = require('../db');

exports.route = (app) => {
  app.get('/character', async (req, res) => {
    if(!req.query) return res.json({});

    const { username, charSlot } = req.query;
    if(!username || isNaN(+charSlot)) return res.json({});

    const account = await DB.$accounts.findOne({ username });
    if(!account) return res.json({});

    const player = await DB.$players.findOne({ _account: ObjectId(account._id), charSlot: +charSlot });
    if(!player) return res.json({});

    const items = await DB.$items.findOne({ _id: ObjectId(player._items) });
    if(!items) return res.json({});

    player.items = items;

    res.json(player);
  });
};