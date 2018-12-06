const fs = require('fs');

const jsonIn = fs.readFileSync(__dirname + '/db.json');

const data = JSON.parse(jsonIn);

data.events.forEach((event, index) => {
  event.id = index + 1;
});

fs.writeFileSync(__dirname + '/newdb.json', JSON.stringify(data, null, 2));
