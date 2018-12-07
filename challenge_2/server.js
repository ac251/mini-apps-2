const express = require('express');
const path = require('path');
const request = require('request');
const redis = require('redis');
const dra = require('date-range-array');
const moment = require('moment');

const app = express();

const client = redis.createClient();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/prices', (req, res) => {
  let { start, end } = req.query;
  
  end = end || moment().format('YYYY-MM-DD');
  start = start || moment(end).subtract(1, 'months').format('YYYY-MM-DD');
  

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
    
    const queries = { start, end };

    request('https://api.coindesk.com/v1/bpi/historical/close.json', {
      method: 'GET',
      qs: queries
    }, (err, response, body) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const { bpi } = JSON.parse(body);
      console.log(bpi);
      const data = [];
      const keyValPairsForRedis = [];
      for (let date in bpi) {
        data.push([date, bpi[date]]);
        keyValPairsForRedis.push(date, bpi[date]);
      }
      data.sort((a, b) => {
        for (let i = 0; i < 3; i++) {
          const aNum = parseInt(a[0][i]);
          const bNum = parseInt(b[0][i]);
          if (aNum - bNum) {
            return aNum - bNum;
          }
        }
        return 0;
      });

      res.status(200).send(data);
      console.log(data);
      client.hmset('bitcoin', keyValPairsForRedis);

    });

  })
  
});

app.listen(3000);

