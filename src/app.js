const express = require('express');
const cors = require('cors');

const products = require('./routes/products');
const orders = require('./routes/orders');
const fulfillment = require('./routes/fulfillment');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', products);
app.use('/orders', orders);
app.use('/fulfillment', fulfillment);

app.get('/', (req, res) => {
  res.json({ status: 'Printsable API OK' });
});

module.exports = app;
