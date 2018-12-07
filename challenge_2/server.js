const express = require('express');
const path = require('path');
const request = require('request');
const redis = require('redis');
const dra = require('date-range-array');
const moment = require('moment');
const { API_KEY } = require('./config.js');

const app = express();

const client = redis.createClient();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/prices', (req, res) => {
  
  end = moment(req.query.end).add(1, 'day').format('YYYY-MM-DD');
  start = moment(req.query.start).subtract(1, 'months').format('YYYY-MM-DD');

  const endSeconds = Math.round((new Date(end)).getTime() / 1000);
  const startSeconds = Math.round((new Date(start)).getTime() / 1000);

  const dates = dra(start, end);

  client.hmget('bitcoin', dates, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    let allDatesCovered = true;
    for (let value of data) {
      if (value === null) {
        allDatesCovered = false;
        break;
      }
    }

    if (allDatesCovered) {
      const response = dates.map((date, idx) => [date, data[idx]]);
      return res.status(200).json(response);
    }
    
    const queries = {
      endSeconds,
      api_key: API_KEY,
      toTs: endSeconds,
      fsym: 'BTC',
      tsym: 'USD',
      limit: Math.max(1, (endSeconds - startSeconds) / 86400),
    };

    request('https://min-api.cryptocompare.com/data/histoday', {
      method: 'GET',
      qs: queries
    }, (err, response, body) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const priceData = JSON.parse(body).Data;
      console.log('API RESULTS length', priceData.length);
      console.log('DateRange length', dates.length);
      const resData = [];
      const keyValPairsForRedis = [];
      // for (let date in dates) {
      //   data.push([date, bpi[date]]);
      //   keyValPairsForRedis.push(date, bpi[date]);
      // }

      dates.forEach((date, idx) => {
        resData.push([date, priceData[idx].close]);
        keyValPairsForRedis.push(date, priceData[idx].close);
      });


      res.status(200).send(resData);
      console.log(resData);
      client.hmset('bitcoin', keyValPairsForRedis);

    });

  })
  
});

app.listen(3000);

