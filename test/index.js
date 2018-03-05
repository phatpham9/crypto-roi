const CryptoROI = require('../');

(async () => {
  const result = await CryptoROI.calculate({
    from: '2017-01-01',
    to: '2018-01-07',
  });
  
  console.log(result);
})();
