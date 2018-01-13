const fetch = require('node-fetch');
const Table = require('cli-table');

const getHistorialUrl = date => {
  const formatDate = date => date.replace(/-/g, '');

  return `https://scraper.fun/scrape?s-url=https%3A%2F%2Fcoinmarketcap.com%2Fhistorical%2F${formatDate(date)}%2F&s-scope=table%23currencies-all%20tbody%20tr&name=.currency-name%20.currency-name-container&symbol=.col-symbol&price=.price&marketCap=.market-cap&s-limit=100`;
};

const presentUrl = 'https://scraper.fun/scrape?s-url=https%3A%2F%2Fcoinmarketcap.com&s-scope=table%23currencies%20tbody%20tr&s-limit=100&name=.currency-name%20.currency-name-container&symbol=.currency-name%20.currency-symbol&price=.price&marketCap=.market-cap';

const formatCoins = data => data.map(({ name, symbol, price, marketCap }, index) => {
  const extractMoney = money => {
    const res = /^\$([0-9\.]+)$/.exec(money);
  
    return res && res[1] ? +res[1] : 0;
  };

  return {
    index: index + 1,
    symbol,
    name,
    price: +extractMoney(price),
    marketCap: +extractMoney(marketCap),
  };
});

const fetchCoins = async date => {
  const res = await fetch(date ? getHistorialUrl(date) : presentUrl);
  const data = await res.json();

  return formatCoins(data);
};

const filterCoinsByPrice = (coins, minPrice, maxPrice) => coins.filter(({ price }) => {
  if (minPrice && maxPrice) {
    return minPrice <= price && price <= maxPrice;
  } else if (minPrice) {
    return minPrice <= price;
  } else if (maxPrice) {
    return price <= maxPrice;
  }

  return true;
});

const filterCoinsByCoins = (coins, ignores) => coins.filter(({ symbol }) => ignores.indexOf(symbol) === -1);

const getTopHoldings = (coinsOnStartDate, coinsOnEndDate, minPrice, maxPrice, ignores, top) => {
  const topHoldings = filterCoinsByCoins(filterCoinsByPrice(coinsOnStartDate, minPrice, maxPrice), ignores).slice(0, top);

  return topHoldings.map(({ index, symbol, name, price, marketCap }) => {
    const coin = coinsOnEndDate.find((coinOnEndDate) => coinOnEndDate.symbol === symbol);

    return {
      symbol,
      name,
      lastIndex: index,
      lastPrice: price,
      lastMarketCap: marketCap,
      index: coin ? coin.index : undefined,
      price: coin ? coin.price : undefined,
      marketCap: coin ? coin.marketCap : undefined,
    };
  });
};

const calculateROI = (coins, investmentOfEach) => {
  const totalInvestment = investmentOfEach * coins.length;
  const totalReturn = coins.reduce((total, { lastPrice, price }) => total + (investmentOfEach * (price || 0) / lastPrice), 0);
  const returnRate = totalReturn / totalInvestment;

  return {
    totalInvestment,
    totalReturn,
    returnRate,
  };
};

class Calculator {
  static async init(options) {
    const cal = new Calculator(options);
    await cal._calculate();

    return cal;
  }

  constructor({ startDate, endDate, minPrice = 0, maxPrice = 0, ignores = [], top = 10, investmentOfEach = 1000 }) {
    this.options = {
      startDate,
      endDate,
      minPrice,
      maxPrice,
      ignores,
      top,
      investmentOfEach,
    };
  }

  async _calculate() {
    const { startDate, endDate, minPrice, maxPrice, ignores, top, investmentOfEach } = this.options;

    const coinsOnStartDate = await fetchCoins(startDate);
    const coinsOnEndDate = await fetchCoins(endDate);
    
    const topHoldings = getTopHoldings(coinsOnStartDate, coinsOnEndDate, minPrice, maxPrice, ignores, top);

    const { totalInvestment, totalReturn, returnRate } = calculateROI(topHoldings, investmentOfEach);

    this.investment = {
      coins: topHoldings,
      investmentOfEach,
      totalInvestment,
      totalReturn,
      returnRate,
    };
  }

  printCSV() {
    const { startDate, endDate } = this.options;
    const { coins, investmentOfEach, totalInvestment, totalReturn, returnRate } = this.investment;
  
    const csv = [`#,Coin,${startDate},Profit/Loss Rate,${endDate},#`];
  
    coins.forEach(({ symbol, name, lastIndex, lastPrice, lastMarketCap, index, price, marketCap }) => csv.push(`${lastIndex},${symbol} - ${name},${lastPrice},${price ? Math.round(price / lastPrice) : 'N/A'},${price ? price : 'N/A'},${index ? index : 'N/A'}`));
    
    csv.push(`,Total Investment,${totalInvestment},${Math.round(returnRate)},${totalReturn},`);

    console.log(csv.join('\n'));
  }

  print() {
    const { startDate, endDate } = this.options;
    const { coins, investmentOfEach, totalInvestment, totalReturn, returnRate } = this.investment;
  
    const table = new Table({
      head: [
        '#',
        'Coin',
        `${startDate}`,
        'Profit/Loss Rate',
        `${endDate}`,
        '#'
      ],
    });
  
    coins.forEach(({ symbol, name, lastIndex, lastPrice, lastMarketCap, index, price, marketCap }) => {
      table.push([
        lastIndex,
        `${symbol} - ${name}`,
        lastPrice,
        price ? Math.round(price / lastPrice) : 'N/A',
        price ? price : 'N/A',
        index ? index : 'N/A',
      ]);
    });
    
    table.push([
      '',
      'Total Investment',
      totalInvestment,
      Math.round(returnRate),
      totalReturn,
      '',
    ]);
  
    console.log(table.toString());
  }
}

module.exports = Calculator;
