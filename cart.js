


let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cartItemsList');
let total = 0;

function renderCart() {
  cartList.innerHTML = '';
  total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cartItem';

    const img = document.createElement('img');
    img.src = item.image || 'images/placeholder.png';
    img.alt = item.name;

    const info = document.createElement('div');
    info.className = 'cartInfo';
    info.innerHTML = `<strong>${item.name}</strong><br>Qty: ${item.quantity}<br>Price: ₹${item.price * item.quantity}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'removeCartBtn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeItem(index);

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(removeBtn);
    cartList.appendChild(li);

    total += item.price * item.quantity;
  });
  document.getElementById('cartTotal').textContent = `Total: ₹${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  if (confirm("Clear all items from cart?")) {
    localStorage.removeItem('cart');
    cart = [];
    renderCart();
  }
}

renderCart();