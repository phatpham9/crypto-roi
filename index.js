const Calculator = require('./Calculator');

(async () => {
  (await Calculator.init({
    startDate: '2017-01-01',
    endDate: '2018-01-07',
    maxPrice: 1,
    ignores: [ 'USDT', 'DOGE' ],
    top: 10,
  })).print();
})();
