const API = 'http://localhost:3000';

/* ======================
   PRODUCTS
====================== */

async function loadProducts() {
  const res = await fetch(`${API}/products`);
  const data = await res.json();
  const table = document.getElementById('products');
  table.innerHTML = '';

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name || 'Unnamed product'}</td>
      </tr>
    `;
  });
}

async function createProduct() {
  const input = document.getElementById('productName');
  const name = input.value.trim();
  if (!name) return;

  await fetch(`${API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  input.value = '';
  loadProducts();
}

/* ======================
   ORDERS
====================== */

async function loadOrders() {
  const res = await fetch(`${API}/orders`);
  const data = await res.json();
  const table = document.getElementById('orders');
  table.innerHTML = '';

  data.forEach(order => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.details}</td>
        <td>
          <span class="status ${order.status}">
            ${order.status.toUpperCase()}
          </span>
        </td>
        <td>
          ${order.status === 'pending' ? `<button onclick="fulfillOrder(${order.id})">Fulfill</button>` : ''}
        </td>
      </tr>
    `;
  });
}

async function createOrder() {
  const input = document.getElementById('orderDetails');
  const details = input.value.trim();
  if (!details) return;

  await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ details })
  });

  input.value = '';
  loadOrders();
}

async function fulfillOrder(id) {
  await fetch(`${API}/fulfillment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: id })
  });

  loadOrders();
}

/* ======================
   INITIAL LOAD
====================== */

loadProducts();
loadOrders();
