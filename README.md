# crypto-roi-calculator
A simple calculator of cryptocurrency investment in top coins on coinmarketcap.com

## Usage

### Installation
Make sure you have NodeJS >= 9, yarn (most prefered) or npm installed. And install dependencies:

```bash
yarn
```

### Start

```bash
yarn start
```

### Options

- startDate: string (get from https://coinmarketcap.com/historical)
- endDate: string
- minPrice: number
- maxPrice: number
- ignores: array of string
- top: number

### Sample

I want to calculate the ROI of `top 10 coins` on CoinMarketCap that have `max price is 1$`, `exclude USDT & DOGE` `from 2017-01-01 to 2018-01-07`:

- startDate: 2017-01-01
- endDate: 2018-01-08
- maxPrice: 1
- ignores: [ "USDT", "DOGE" ]
- top: 10

The result will be like this:

<div style="text-align: center;">
  <img src="./images/20170101-20180107-0-1-USDT,DOGE-10.png">
</div>

## Author

Phat Pham | [Website](https://onroads.xyz) | [GitHub](https://github.com/phatpham9)
