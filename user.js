// ============================================
// FILE: js/user.js
// User-side Functions
// ============================================

// Menu Data
const menuData = {
    coffee: [
        { id: 1, name: 'Cappuccino', price: 150, category: 'Coffee', emoji: '☕', description: 'Classic Italian coffee with steamed milk foam' },
        { id: 2, name: 'Latte', price: 160, category: 'Coffee', emoji: '☕', description: 'Espresso with steamed milk' },
        { id: 3, name: 'Espresso', price: 120, category: 'Coffee', emoji: '☕', description: 'Strong and bold coffee shot' },
        { id: 4, name: 'Americano', price: 130, category: 'Coffee', emoji: '☕', description: 'Espresso with hot water' },
        { id: 5, name: 'Mocha', price: 180, category: 'Coffee', emoji: '☕', description: 'Chocolate-flavored coffee' },
        { id: 6, name: 'Cold Coffee', price: 170, category: 'Coffee', emoji: '🧊', description: 'Chilled coffee delight' }
    ],
    pastries: [
        { id: 7, name: 'Croissant', price: 120, category: 'Pastries', emoji: '🥐', description: 'Buttery French pastry' },
        { id: 8, name: 'Chocolate Cake', price: 180, category: 'Pastries', emoji: '🍰', description: 'Rich chocolate sponge cake' },
        { id: 9, name: 'Blueberry Muffin', price: 100, category: 'Pastries', emoji: '🧁', description: 'Moist muffin with fresh blueberries' },
        { id: 10, name: 'Danish Pastry', price: 140, category: 'Pastries', emoji: '🥐', description: 'Sweet filled pastry' },
        { id: 11, name: 'Donut', price: 80, category: 'Pastries', emoji: '🍩', description: 'Glazed ring donut' },
        { id: 12, name: 'Cheesecake', price: 200, category: 'Pastries', emoji: '🍰', description: 'Creamy New York style cheesecake' }
    ],
    food: [
        { id: 13, name: 'Club Sandwich', price: 220, category: 'Food', emoji: '🥪', description: 'Triple-decker sandwich with chicken' },
        { id: 14, name: 'Pasta Alfredo', price: 280, category: 'Food', emoji: '🍝', description: 'Creamy Italian pasta' },
        { id: 15, name: 'Veg Burger', price: 180, category: 'Food', emoji: '🍔', description: 'Vegetarian burger with fresh veggies' },
        { id: 16, name: 'Chicken Wrap', price: 200, category: 'Food', emoji: '🌯', description: 'Grilled chicken wrap' },
        { id: 17, name: 'Caesar Salad', price: 190, category: 'Food', emoji: '🥗', description: 'Fresh romaine with Caesar dressing' },
        { id: 18, name: 'Pizza Margherita', price: 320, category: 'Food', emoji: '🍕', description: 'Classic Italian pizza' }
    ],
    beverages: [
        { id: 19, name: 'Fresh Juice', price: 120, category: 'Beverages', emoji: '🥤', description: 'Freshly squeezed orange juice' },
        { id: 20, name: 'Smoothie', price: 150, category: 'Beverages', emoji: '🥤', description: 'Mixed fruit smoothie' },
        { id: 21, name: 'Iced Tea', price: 100, category: 'Beverages', emoji: '🍵', description: 'Refreshing lemon iced tea' },
        { id: 22, name: 'Milkshake', price: 160, category: 'Beverages', emoji: '🥛', description: 'Thick chocolate milkshake' },
        { id: 23, name: 'Hot Chocolate', price: 140, category: 'Beverages', emoji: '☕', description: 'Rich hot chocolate drink' },
        { id: 24, name: 'Green Tea', price: 90, category: 'Beverages', emoji: '🍵', description: 'Healthy green tea' }
    ]
};

// Load Menu on Menu Page
function loadMenu() {
    loadMenuCategory('coffeeMenu', menuData.coffee);
    loadMenuCategory('pastriesMenu', menuData.pastries);
    loadMenuCategory('foodMenu', menuData.food);
    loadMenuCategory('beveragesMenu', menuData.beverages);
}

// Load Menu Category
function loadMenuCategory(elementId, items) {
    const container = document.getElementById(elementId);
    if (!container) return;

    let html = '';
    items.forEach(item => {
        html += `
            <div class="col-md-4 col-sm-6">
                <div class="card h-100 shadow-sm">
                    <div class="card-body text-center">
                        <div class="item-emoji mb-2">${item.emoji}</div>
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted small">${item.description}</p>
                        <h6 class="text-primary mb-3">₹${item.price}</h6>
                        <button class="btn btn-sm btn-primary" onclick="addToCartFromMenu(${item.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Shopping Cart
let cart = [];

// Add to cart from menu
function addToCartFromMenu(itemId) {
    const allItems = [...menuData.coffee, ...menuData.pastries, ...menuData.food, ...menuData.beverages];
    const item = allItems.find(i => i.id === itemId);
    
    if (item) {
        const existingItem = cart.find(i => i.id === itemId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        // Show success message
        showToast(`${item.name} added to cart!`);
    }
}

// Show Toast Notification
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Initialize Order Page
function initializeOrder() {
    loadOrderItems();
    updateCartDisplay();
}

// Load Order Items
function loadOrderItems() {
    const container = document.getElementById('orderItems');
    if (!container) return;

    const allItems = [...menuData.coffee, ...menuData.pastries, ...menuData.food, ...menuData.beverages];
    
    let html = '';
    allItems.forEach(item => {
        html += `
            <div class="card mb-3 order-item-card" onclick="toggleOrderItem(${item.id})">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-2 text-center">
                            <span style="font-size: 2rem;">${item.emoji}</span>
                        </div>
                        <div class="col-6">
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.description}</small>
                            <div class="mt-1"><strong class="text-primary">₹${item.price}</strong></div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="quantity-controls" id="qty-controls-${item.id}" style="display: none;">
                                <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation(); decreaseQuantity(${item.id})">-</button>
                                <span class="quantity-display" id="qty-${item.id}">1</span>
                                <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation(); increaseQuantity(${item.id})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Toggle Order Item Selection
function toggleOrderItem(itemId) {
    const card = event.currentTarget;
    const controls = document.getElementById(`qty-controls-${itemId}`);
    const allItems = [...menuData.coffee, ...menuData.pastries, ...menuData.food, ...menuData.beverages];
    const item = allItems.find(i => i.id === itemId);
    
    if (card.classList.contains('selected')) {
        // Remove from cart
        card.classList.remove('selected');
        controls.style.display = 'none';
        cart = cart.filter(i => i.id !== itemId);
    } else {
        // Add to cart
        card.classList.add('selected');
        controls.style.display = 'flex';
        cart.push({ ...item, quantity: 1 });
        document.getElementById(`qty-${itemId}`).textContent = '1';
    }
    
    updateCartDisplay();
}

// Increase Quantity
function increaseQuantity(itemId) {
    const cartItem = cart.find(i => i.id === itemId);
    if (cartItem) {
        cartItem.quantity++;
        document.getElementById(`qty-${itemId}`).textContent = cartItem.quantity;
        updateCartDisplay();
    }
}

// Decrease Quantity
function decreaseQuantity(itemId) {
    const cartItem = cart.find(i => i.id === itemId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        document.getElementById(`qty-${itemId}`).textContent = cartItem.quantity;
        updateCartDisplay();
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
        subtotalEl.textContent = '₹0';
        taxEl.textContent = '₹0';
        totalEl.textContent = '₹0';
        placeOrderBtn.disabled = true;
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <div class="cart-item">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="small">${item.name}</span>
                    <button class="btn btn-sm btn-link text-danger p-0" onclick="removeFromCart(${item.id})">×</button>
                </div>
                <div class="d-flex justify-content-between text-muted small">
                    <span>${item.quantity} × ₹${item.price}</span>
                    <strong>₹${itemTotal}</strong>
                </div>
            </div>
        `;
    });
    
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    
    cartItemsDiv.innerHTML = html;
    subtotalEl.textContent = `₹${subtotal}`;
    taxEl.textContent = `₹${tax}`;
    totalEl.textContent = `₹${total}`;
    placeOrderBtn.disabled = false;
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    
    const card = document.querySelector(`[onclick*="toggleOrderItem(${itemId})"]`);
    if (card) {
        card.classList.remove('selected');
        document.getElementById(`qty-controls-${itemId}`).style.display = 'none';
    }
    
    updateCartDisplay();
}

// Place Order
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Generate order number
    const orderNumber = 'ORD' + Math.floor(Math.random() * 10000).toString().padStart(5, '0');
    
    // Store order (in real app, send to backend)
    const order = {
        orderNumber: orderNumber,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toISOString()
    };
    
    window.lastOrder = order;
    
    // Show success modal
    document.getElementById('orderNumber').textContent = orderNumber;
    const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
    modal.show();
    
    // Clear cart
    cart = [];
    
    // Reset UI after modal is hidden
    document.getElementById('orderSuccessModal').addEventListener('hidden.bs.modal', function () {
        const cards = document.querySelectorAll('.order-item-card.selected');
        cards.forEach(card => {
            card.classList.remove('selected');
            const itemId = card.getAttribute('onclick').match(/\d+/)[0];
            document.getElementById(`qty-controls-${itemId}`).style.display = 'none';
        });
        updateCartDisplay();
    }, { once: true });
}

// Contact Form Submit
function submitContact() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    const alertDiv = document.getElementById('contactAlert');
    
    alertDiv.innerHTML = '';
    
    if (!name || !email || !phone || !subject || !message) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please fill in all fields</div>';
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please enter a valid email</div>';
        return;
    }
    
    // Success
    alertDiv.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully. We\'ll get back to you soon.</div>';
    
    // Clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
}

// Logout Function (imported from auth.js but defined here for convenience)
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
    }
}