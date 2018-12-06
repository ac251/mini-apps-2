const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/prices', (req, res) => {
  const { start, end } = req.query;
  const queries = start && end ? { start, end } : undefined;
  request('https://api.coindesk.com/v1/bpi/historical/close.json',{
    method: 'GET',
    qs: queries
  })
  .pipe(res);
});

app.listen(3000);

