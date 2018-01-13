# crypto-roi-calculator
A simple calculator of cryptocurrency investment in top coins on coinmarketcap.com

[![Package Version](https://img.shields.io/github/package-json/v/phatpham9/crypto-roi-calculator.svg)]()
[![Travis](https://img.shields.io/travis/phatpham9/crypto-roi-calculator.svg)](https://travis-ci.org/phatpham9/crypto-roi-calculator)
[![David](https://img.shields.io/david/phatpham9/crypto-roi-calculator.svg)](https://github.com/phatpham9/crypto-roi-calculator)
[![David Dev](https://img.shields.io/david/dev/phatpham9/crypto-roi-calculator.svg)](https://github.com/phatpham9/crypto-roi-calculator)
[![NPM Version](https://img.shields.io/npm/v/phatpham9/crypto-roi-calculator.svg)](https://www.npmjs.com/package/phatpham9/crypto-roi-calculator)
[![NPM Downloads](https://img.shields.io/npm/dt/phatpham9/crypto-roi-calculator.svg)](https://www.npmjs.com/package/phatpham9/crypto-roi-calculator)

## Getting Started

### Installation
Make sure you have NodeJS >= 9, yarn (most prefered) or npm installed. Then install the tool:

```bash
yarn global add crypto-roi-calculator
```

### Usage

I want to calculate the ROI of `top 10 coins` on CoinMarketCap `from 2017-01-01 to 2018-01-07` that have `price is less than 1$` and `exclude USDT & DOGE`:

```bash
roi 10 -f 2017-01-01 -t 2018-01-07 --max 1 -i USDT,DOGE
```

The result will be like this:

<div style="text-align: center;">
  <img src="./images/20170101-20180107-0-1-USDT,DOGE-10.png">
</div>

## Author & Contributors

- Phat Pham | Author | [Website](https://onroads.xyz) | [GitHub](https://github.com/phatpham9)
- Khang Huynh | [GitHub](https://github.com/khanghuynh92)
