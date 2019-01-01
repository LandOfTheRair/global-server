const { get } = require('lodash');
const numeral = require('numeral');

const { DB } = require('../db');

const RUNNER_UPS = 5;

const ALWAYS_FIELDS = { 'statistics.name': 1, 'statistics.baseClass': 1, 'username': 1 };

const numToSkill = (num) => {
  if(num < 100) return 0;
  const value = Math.log(num / 100) / Math.log(1.55);
  return 1 + Math.floor(value);
};

const mostTradeskill = (tradeskill) => {
  return {
    name: `Most ${tradeskill} Uses`,
    query: { [`statistics.crafts${tradeskill}`]: { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, [`statistics.crafts${tradeskill}`]: 1 },
    params: { sort: { [`statistics.crafts${tradeskill}`]: -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.crafts${tradeskill}`)).format('0.0a')} Uses`,
        exactValue: get(x, `statistics.crafts${tradeskill}`).toLocaleString()
      };
    }
  };
};

const bestTradeskill = (tradeskill) => {
  return {
    name: `Strongest ${tradeskill} Users`,
    query: { [`statistics.skills.${tradeskill.toLowerCase()}`]: { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, [`statistics.skills.${tradeskill.toLowerCase()}`]: 1 },
    params: { sort: { [`statistics.skills.${tradeskill.toLowerCase()}`]: -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `Skill ${numToSkill(get(x, `statistics.skills.${tradeskill.toLowerCase()}`))}`,
        exactValue: get(x, `statistics.skills.${tradeskill.toLowerCase()}`).toLocaleString()
      };
    }
  };
};

const allQueries = [
  { cat: 'Experience Leaders' },

  {
    name: 'Most Experienced',
    query: { 'statistics.xp': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.xp': 1, 'statistics.level': 1 },
    params: { sort: { 'statistics.xp': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.xp`)).format('0.000a')} XP (Lv. ${get(x, 'statistics.level')})`,
        exactValue: get(x, 'statistics.xp').toLocaleString()
      };
    }
  },

  {
    name: 'Most Ancient',
    query: { 'statistics.axp': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.axp': 1 },
    params: { sort: { 'statistics.axp': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.axp`)).format('0.0a')} AXP`,
        exactValue: get(x, 'statistics.axp').toLocaleString()
      };
    }
  },

  { cat: 'World Leaders' },

  {
    name: 'Most Steps Taken',
    query: { 'statistics.stepsTaken': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.stepsTaken': 1 },
    params: { sort: { 'statistics.stepsTaken': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.stepsTaken`)).format('0.0a')} Steps`,
        exactValue: get(x, `statistics.stepsTaken`).toLocaleString()
      };
    }
  },

  {
    name: 'Most NPCs Greeted',
    query: { 'statistics.npcsGreeted': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.npcsGreeted': 1 },
    params: { sort: { 'statistics.npcsGreeted': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.npcsGreeted`)).format('0.0a')} NPCs`,
        exactValue: get(x, `statistics.npcsGreeted`).toLocaleString()
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
        name: get(x, 'statistics.name'),
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
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.deaths`)).format('0.0a')} Deaths`,
        exactValue: get(x, 'statistics.deaths').toLocaleString()
      };
    }
  },

  {
    name: 'Biggest Killstreak',
    query: { 'statistics.bestKillstreak': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.bestKillstreak': 1 },
    params: { sort: { 'statistics.bestKillstreak': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.bestKillstreak`)).format('0.0a')} Kills`,
        exactValue: get(x, 'statistics.bestKillstreak').toLocaleString()
      };
    }
  },
  
  {
    name: 'Most Times Stripped',
    query: { 'statistics.timesStripped': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.timesStripped': 1 },
    params: { sort: { 'statistics.timesStripped': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.timesStripped`)).format('0.0a')} Times`,
        exactValue: get(x, `statistics.timesStripped`).toLocaleString()
      };
    }
  },
  
  {
    name: 'Most Lairs Killed',
    query: { 'statistics.lairsKilled': { $gt: 0 } },
    fields: { ...ALWAYS_FIELDS, 'statistics.lairsKilled': 1 },
    params: { sort: { 'statistics.lairsKilled': -1 }, limit: RUNNER_UPS },
    formatter: (x) => {
      return {
        name: get(x, 'statistics.name'),
        value: `${numeral(get(x, `statistics.lairsKilled`)).format('0.0a')} Times`,
        exactValue: get(x, `statistics.lairsKilled`).toLocaleString()
      };
    }
  },

  { cat: 'Frequent Crafters' },

  mostTradeskill('Alchemy'),
  mostTradeskill('Survival'),
  mostTradeskill('Spellforging'),
  mostTradeskill('Metalworking'),
  mostTradeskill('Runewriting'),

  { cat: 'Strongest Crafters' },

  bestTradeskill('Alchemy'),
  bestTradeskill('Survival'),
  bestTradeskill('Spellforging'),
  bestTradeskill('Metalworking'),
  bestTradeskill('Runewriting'),
];

exports.route = (app) => {
  app.get('/leaderboard', async (req, res) => {

    const validQueryData = allQueries.map(x => x.cat ? x : { ...x, results: DB.$statistics.find(x.query, x.fields, x.params) });

    const cursors = await Promise.all(validQueryData);

    for(cursor of cursors) {
      if(!cursor.results) continue;
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