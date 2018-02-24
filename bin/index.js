#!/usr/bin/env node

const Calculator = require('../');

(async () => {
  const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .example('$0 10 -f 2017-01-01 -t 2018-01-07 --min 1 --max 10 -i USDT,DOGE')
  .alias('f', 'from')
  .string('f')
  .describe('f', 'From (get from https://coinmarketcap.com/historical)')
  .alias('t', 'to')
  .string('t')
  .describe('t', 'To (get to https://coinmarketcap.com/historical)')
  .number('min')
  .describe('min', 'Min of price')
  .number('max')
  .describe('max', 'Max of price')
  .alias('i', 'ignores')
  .string('i')
  .describe('i', 'Exclude coins on CoinMarketCap')
  .help('h')
  .alias('h', 'help')
  .epilog('Phat Pham | Copyright 2018')
  .argv;

  const top = argv._[0] || 10;
  const { min, max, from = '2017-01-01', to = '2018-01-07', ignores } = argv;

  console.log(`If you put $1,000 in each coin, you will make...`);

  console.log((await Calculator.init({
    top,
    from,
    to,
    max,
    min,
    ignores: ignores ? ignores.split(',') : [],
  })).print());
})();
