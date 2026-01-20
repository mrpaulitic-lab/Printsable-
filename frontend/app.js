// In-memory data, now synced with localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

let productId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
let orderId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;

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
  saveProducts();
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

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
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
  saveOrders();
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

function fulfillOrder(id) {
  const order = orders.find(o => o.id === id);
  if (!order) return;

  order.status = 'fulfilled';
  saveOrders();
  renderOrders();
}

function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

/* ======================
   INITIAL RENDER
====================== */

renderProducts();
renderOrders();
