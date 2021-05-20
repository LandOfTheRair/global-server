const { get } = require('lodash');
const numeral = require('numeral');

const { DB } = require('../db');

const RUNNER_UPS = 5;

const ALWAYS_FIELDS = { 'name': 1, 'baseClass': 1 };

const allQueries = [
  { cat: 'Experience Leaders' },

  {
    name: 'Most Experienced',
    query: { 'xp': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'xp': 1, 'level': 1 },
    params: { sort: { 'xp': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `xp`, 0)).format('0.000a')} XP (Lv. ${get(x, 'level', 0)})`,
        exactValue: get(x, 'xp', 0).toLocaleString()
      };
    }
  },

  { cat: 'World Leaders' },

  {
    name: 'Most Steps Taken',
    query: { 'statistics.steps': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.steps': 1 },
    params: { sort: { 'statistics.steps': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.steps`)).format('0.0a')} Steps`,
        exactValue: get(x, `statistics.steps`).toLocaleString()
      };
    }
  },

  {
    name: 'Most NPCs Greeted',
    query: { 'statistics.npcsgreeted': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.npcsgreeted': 1 },
    params: { sort: { 'statistics.npcsgreeted': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.npcsgreeted`)).format('0.0a')} NPCs`,
        exactValue: get(x, `statistics.npcsgreeted`).toLocaleString()
      };
    }
  },

  {
    name: 'Most Daily Quests Completed',
    query: { 'statistics.dailyquests': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.dailyquests': 1 },
    params: { sort: { 'statistics.dailyquests': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.dailyquests`)).format('0.0a')} Quests`,
        exactValue: get(x, `statistics.dailyquests`).toLocaleString()
      };
    }
  },

  {
    name: 'Most Repeatable Quests Completed',
    query: { 'statistics.repeatablequests': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.repeatablequests': 1 },
    params: { sort: { 'statistics.repeatablequests': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.repeatablequests`)).format('0.0a')} Quests`,
        exactValue: get(x, `statistics.repeatablequests`).toLocaleString()
      };
    }
  },
  
  { cat: 'Slaying Leaders' },

  {
    name: 'Most Kills',
    query: { 'statistics.kills': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.kills': 1 },
    params: { sort: { 'statistics.kills': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.kills`)).format('0.0a')} Kills`,
        exactValue: get(x, `statistics.kills`).toLocaleString()
      };
    }
  },

  {
    name: 'Most Deaths',
    query: { 'statistics.deaths': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.deaths': 1 },
    params: { sort: { 'statistics.deaths': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.deaths`)).format('0.0a')} Deaths`,
        exactValue: get(x, 'statistics.deaths').toLocaleString()
      };
    }
  },
  
  {
    name: 'Most Times Stripped',
    query: { 'statistics.strips': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.strips': 1 },
    params: { sort: { 'statistics.strips': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.strips`)).format('0.0a')} Times`,
        exactValue: get(x, `statistics.strips`).toLocaleString()
      };
    }
  },
  
  {
    name: 'Most Lairs Killed',
    query: { 'statistics.killslair': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.killslair': 1 },
    params: { sort: { 'statistics.killslair': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.killslair`)).format('0.0a')} Times`,
        exactValue: get(x, `statistics.killslair`).toLocaleString()
      };
    }
  },
  
  { cat: 'Crafting Leaders' },
  
  {
    name: 'Most Alchemy Crafts',
    query: { 'statistics.alchemycrafts': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.alchemycrafts': 1 },
    params: { sort: { 'statistics.alchemycrafts': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.alchemycrafts`)).format('0.0a')} Crafts`,
        exactValue: get(x, `statistics.alchemycrafts`).toLocaleString()
      };
    }
  },
  
  {
    name: 'Most Metalworking Crafts',
    query: { 'statistics.metalworkingcrafts': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.metalworkingcrafts': 1 },
    params: { sort: { 'statistics.metalworkingcrafts': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.metalworkingcrafts`)).format('0.0a')} Crafts`,
        exactValue: get(x, `statistics.metalworkingcrafts`).toLocaleString()
      };
    }
  },
  
  {
    name: 'Most Spellforging Crafts',
    query: { 'statistics.spellforgingcrafts': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.spellforgingcrafts': 1 },
    params: { sort: { 'statistics.spellforgingcrafts': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'name', '???'),
        value: `${numeral(get(x, `statistics.spellforgingcrafts`)).format('0.0a')} Crafts`,
        exactValue: get(x, `statistics.spellforgingcrafts`).toLocaleString()
      };
    }
  },
];

exports.route = (app) => {
  app.get('/leaderboard', async (req, res) => {

    const validQueryData = allQueries.map(x => x.cat ? x : { ...x, results: DB.$statistics.find(x.query, { projection: x.fields, ...x.params }) });

    const cursors = await Promise.all(validQueryData);

    for(cursor of cursors) {
      if(cursor.cat) continue;
      cursor.arr = await cursor.results.toArray();
    }

    const retData = cursors.map(x => {
      if(x.cat) return x;

      return {
        name: x.name,
        results: x.arr.map(y => x.formatter(y))
      };
    });

    const sortedRetData = [];
    for(data of retData) {
      if(data.cat) {
        sortedRetData.push({ cat: data.cat, children: [] });
      } else {
        const curCat = sortedRetData[sortedRetData.length - 1];
        curCat.children.push(data);
      }
    }

    res.json(sortedRetData);
    
  });
}
