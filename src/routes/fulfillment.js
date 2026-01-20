const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const file = path.join(__dirname, '../data/fulfillment.json');

const read = () => JSON.parse(fs.readFileSync(file));
const write = data => fs.writeFileSync(file, JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
  res.json(read());
});

router.post('/', (req, res) => {
  const data = read();
  const job = { id: Date.now(), ...req.body };
  data.push(job);
  write(data);
  res.json(job);
});

module.exports = router;
