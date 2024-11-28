const menuItems = [
  { id: 1, name: 'Special Zinger Burger', category: 'burgers', price: '$7.99', image: '../images/zinger_burger.jpeg' },
  { id: 2, name: 'Original Recipe Chicken', category: 'chicken', price: '$7.99', image: '../images/original_chicken.jpeg' },
  { id: 3, name: 'Hot Wings', category: 'chicken', price: '$4.99', image: '../images/hot_wings.jpeg' },
  { id: 4, name: 'Pepsi', category: 'beverages', price: '$1.99', image: '../images/pepsi.jpeg' },
  { id: 5, name: 'Chicken Popcorn', category: 'chicken', price: '$3.99', image: '../images/chicken_popcorn.jpeg' },
  { id: 6, name: 'Coke', category: 'beverages', price: '$1.99', image: '../images/coke.jpeg' },
  { id: 7, name: 'Zinger Burger', category: 'burgers', price: '$5.29', image: '../images/zinger_burger1.jpeg' },
  { id: 8, name: 'Chicken Crispy Burger', category: 'burgers', price: '$4.29', image: '../images/zinger_burger3.jpeg' },
  { id: 9, name: 'Chicken Burger', category: 'burgers', price: '$3.29', image: '../images/zinger_burger2.jpeg' },
  { id: 10, name: 'Chicken Bucket', category: 'chicken', price: '$4.99', image: '../images/CHICKEN1.jpeg' },
  { id: 11, name: 'Chicken Leg', category: 'chicken', price: '$2.99', image: '../images/CHICKEN2.jpeg' },
  { id: 12, name: 'Chicken Fried', category: 'chicken', price: '$5.40', image: '../images/CHICKEN3.jpeg' },
  { id: 13, name: 'Chicken China', category: 'chicken', price: '$6.40', image: '../images/CHICKEN4.jpeg' },
  { id: 14, name: 'Chicken Delicious', category: 'chicken', price: '$4.40', image: '../images/CHICKEN5.jpeg' },
  { id: 15, name: 'Glaza Donut', category: 'beverages', price: '$1.99', image: '../images/coke1.jpeg' },
  { id: 16, name: 'Mtn Dew', category: 'beverages', price: '$1.99', image: '../images/coke2.jpeg' },
];

let cart = []; // Array to store cart items

const menuContainer = document.getElementById('menu');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalAmountContainer = document.getElementById('total-amount'); // New element for the total price

// Function to update the cart count
function updateCartCount() {
  cartCount.textContent = cart.length; // Update cart count dynamically
}

// Function to calculate the total amount in the cart
function calculateTotal() {
  let total = 0;
  cart.forEach(item => {
    // Remove the '$' and convert the price to a float for calculation
    total += parseFloat(item.price.replace('$', ''));
  });
  return total.toFixed(2); // Return the total amount with two decimal points
}

// Function to display the menu
function displayMenu(items) {
  menuContainer.innerHTML = '';
  items.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: <span>${item.price}</span></p>
      <button class="order-btn" onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuContainer.appendChild(menuItem);
  });
}

// Function to display the cart
function displayCart() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    const itemCounts = {}; // Object to keep track of item quantities
    cart.forEach(item => {
      itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
    });

    // Loop through item counts and display each item with its quantity
    for (const [itemId, quantity] of Object.entries(itemCounts)) {
      const item = menuItems.find(item => item.id == itemId);
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h4>${item.name} x${quantity}</h4>
          <p>Price: <span>${item.price}</span></p>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    }
  }

  const totalAmount = calculateTotal();
  totalAmountContainer.textContent = `Total: $${totalAmount}`; // Update total amount

  updateCartCount(); // Update the cart count
}

// Function to add item to the cart (allowing duplicate items)
function addToCart(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  cart.push(item);  // Add item to the cart even if it's already there
  displayCart();
}

// Function to remove item from the cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  displayCart();
}

// Function to toggle the cart modal visibility
function toggleCartModal() {
  cartModal.classList.toggle('visible');
  updateCartCount(); // Ensure the cart count is updated when the modal is closed
}

// Function to filter the menu based on category
function filterMenu(category) {
  if (category === 'all') {
    displayMenu(menuItems);
  } else {
    const filteredItems = menuItems.filter(item => item.category === category);
    displayMenu(filteredItems);
  }
}

// Function to place an order
function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Clear the cart and navigate to the thank-you page
  cart = [];
  updateCartCount();
  displayCart();
  window.location.href = '../thankyou.html'; // Redirect to the "Thank You" page
}

// Initial display
displayMenu(menuItems);
displayCart();

 // Toggle menu
 const menutoggle = document.querySelector('.toggle');
 const categories = document.querySelector('.categories');
 menutoggle.onclick = function() {
   menutoggle.classList.toggle('active');
   categories.classList.toggle('active');
 };