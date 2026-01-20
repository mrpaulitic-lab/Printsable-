const API = 'http://localhost:3000';

async function loadProducts() {
  const res = await fetch(`${API}/products`);
  const data = await res.json();
  const list = document.getElementById('products');
  list.innerHTML = '';
  data.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.id} - ${p.name || 'Unnamed product'}`;
    list.appendChild(li);
  });
}

async function createProduct() {
  const name = document.getElementById('productName').value;
  await fetch(`${API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  loadProducts();
}

async function loadOrders() {
  const res = await fetch(`${API}/orders`);
  const data = await res.json();
  const list = document.getElementById('orders');
  list.innerHTML = '';
  data.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `${o.id} - ${o.status}`;
    list.appendChild(li);
  });
}

async function createOrder() {
  const notes = document.getElementById('orderDetails').value;
  await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes })
  });
  loadOrders();
}

async function createFulfillment() {
  const orderId = document.getElementById('fulfillmentOrderId').value;
  await fetch(`${API}/fulfillment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId })
  });
  alert('Fulfillment created');
}

loadProducts();
loadOrders();
