document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort');
  const productGrid = document.querySelector('.product-grid');
  let products = Array.from(document.querySelectorAll('.product-card'));

  // Filter by category
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.dataset.category;
      products.forEach(product => {
        const match = product.dataset.category === category || category === 'all';
        product.style.display = match ? 'block' : 'none';
      });
    });
  });

  // Sort by option
  sortSelect.addEventListener('change', () => {
    let sorted;
    switch (sortSelect.value) {
      case 'az':
        sorted = products.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        break;
      case 'za':
        sorted = products.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        break;
      case 'lowhigh':
        sorted = products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        break;
      case 'highlow':
        sorted = products.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        break;
      case 'best':
        sorted = products.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
        break;
      default:
        sorted = products;
    }
    productGrid.innerHTML = '';
    sorted.forEach(item => productGrid.appendChild(item));
  });
});

// ✅ Helper to find the correct product card
function getProductCardByName(name) {
  return Array.from(document.querySelectorAll('.product-card'))
    .find(card => card.querySelector('p')?.innerText.trim() === name.trim());
}

// ✅ Add to Cart with image support
function addToCart(name) {
  const productCard = getProductCardByName(name);
  const price = parseFloat(productCard?.dataset.price || 0);
  const image = productCard?.querySelector('img')?.src || '';

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`🛒 ${name} added to cart`);
}

// ✅ Add to Wishlist with image support
function addToWishlist(name) {
  const productCard = getProductCardByName(name);
  const price = parseFloat(productCard?.dataset.price || 0);
  const image = productCard?.querySelector('img')?.src || '';

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (!wishlist.some(item => item.name === name)) {
    wishlist.push({ name, price, image });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`💖 ${name} added to wishlist`);
  } else {
    alert(`💖 ${name} is already in wishlist`);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // Set the countdown duration (in hours, minutes, seconds)
    let hours = 20;
    let minutes = 58;
    let seconds = 40;
    
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        // Display the current time
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Decrement the time
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Countdown finished
                    clearInterval(countdownInterval);
                    document.querySelector('.flash-sale-bar').innerHTML = 
                        'FLASH SALE ENDED • Thank you for shopping!';
                    return;
                }
            }
        }
    }
    
    // Update immediately to avoid initial delay
    updateCountdown();
    
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
});