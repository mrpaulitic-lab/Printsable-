// In-memory data (no database yet)
let products = [];
let orders = [];

let productId = 1;
let orderId = 1;

/* ======================
   PRODUCTS
====================== */

function createProduct() {
  const input = document.getElementById('productName');
  const name = input.value.trim();

  if (!name) return;

  const product = {
    id: productId++,
    name
  };

  products.push(product);
  input.value = '';

  renderProducts();
}

function renderProducts() {
  const table = document.getElementById('products');
  table.innerHTML = '';

  products.forEach(product => {
    table.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
      </tr>
    `;
  });
}

/* ======================
   ORDERS
====================== */

function createOrder() {
  const input = document.getElementById('orderDetails');
  const details = input.value.trim();

  if (!details) return;

  const order = {
    id: orderId++,
    details,
    status: 'pending'
  };

  orders.push(order);
  input.value = '';

  renderOrders();
}

function renderOrders() {
  const table = document.getElementById('orders');
  table.innerHTML = '';

  orders.forEach(order => {
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

/* ======================
   FULFILL ORDER
====================== */

function fulfillOrder(id) {
  const order = orders.find(o => o.id === id);
  if (!order) return;

  order.status = 'fulfilled';
  renderOrders();
}
