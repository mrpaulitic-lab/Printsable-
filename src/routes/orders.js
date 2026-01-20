const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const file = path.join(__dirname, '../data/orders.json');

const read = () => JSON.parse(fs.readFileSync(file));
const write = data => fs.writeFileSync(file, JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
  res.json(read());
});

router.post('/', (req, res) => {
  const data = read();
  const order = { id: Date.now(), status: 'new', ...req.body };
  data.push(order);
  write(data);
  res.json(order);
});

module.exports = router;
