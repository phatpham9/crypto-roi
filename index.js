const Calculator = require('./Calculator');

(async () => {
  (await Calculator.init({
    from: '2017-01-01',
    to: '2018-01-07',
    max: 1,
    ignores: [ 'USDT', 'DOGE' ],
    top: 10,
  })).print();
})();
