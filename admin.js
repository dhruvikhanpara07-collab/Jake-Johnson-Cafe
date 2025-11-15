// ============================================
// FILE: js/admin.js
// Admin-side Functions
// ============================================

// Menu Items Storage
let adminMenuItems = [
    { id: 1, name: 'Cappuccino', category: 'Coffee', price: 150, description: 'Classic Italian coffee', available: true },
    { id: 2, name: 'Latte', category: 'Coffee', price: 160, description: 'Espresso with steamed milk', available: true },
    { id: 3, name: 'Espresso', category: 'Coffee', price: 120, description: 'Strong coffee shot', available: true },
    { id: 4, name: 'Croissant', category: 'Pastries', price: 120, description: 'Buttery French pastry', available: true },
    { id: 5, name: 'Chocolate Cake', category: 'Pastries', price: 180, description: 'Rich chocolate cake', available: true },
    { id: 6, name: 'Club Sandwich', category: 'Food', price: 220, description: 'Triple-decker sandwich', available: true },
    { id: 7, name: 'Pasta Alfredo', category: 'Food', price: 280, description: 'Creamy Italian pasta', available: true },
    { id: 8, name: 'Fresh Juice', category: 'Beverages', price: 120, description: 'Fresh orange juice', available: true }
];

// Orders Storage
let adminOrders = [
    { id: 'ORD001', customer: 'John Doe', items: 2, total: 350, status: 'preparing', time: '2 mins ago', itemsList: 'Cappuccino x2' },
    { id: 'ORD002', customer: 'Sarah Smith', items: 3, total: 520, status: 'completed', time: '15 mins ago', itemsList: 'Latte, Croissant x2' },
    { id: 'ORD003', customer: 'Mike Johnson', items: 1, total: 150, status: 'new', time: 'Just now', itemsList: 'Cappuccino x1' },
    { id: 'ORD004', customer: 'Emma Wilson', items: 4, total: 680, status: 'completed', time: '25 mins ago', itemsList: 'Club Sandwich, Pasta, Juice x2' },
    { id: 'ORD005', customer: 'David Brown', items: 2, total: 420, status: 'preparing', time: '30 mins ago', itemsList: 'Chocolate Cake, Coffee x1' },
    { id: 'ORD006', customer: 'Lisa Anderson', items: 3, total: 540, status: 'new', time: '5 mins ago', itemsList: 'Espresso x3' },
    { id: 'ORD007', customer: 'Tom Wilson', items: 2, total: 400, status: 'cancelled', time: '1 hour ago', itemsList: 'Pasta, Juice' }
];

// Load Menu Items in Admin
function loadMenuItemsAdmin() {
    const tbody = document.getElementById('menuItemsTable');
    if (!tbody) return;
    
    let html = '';
    adminMenuItems.forEach(item => {
        html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₹${item.price}</td>
                <td>
                    <span class="badge ${item.available ? 'bg-success' : 'bg-danger'}">
                        ${item.available ? 'Available' : 'Unavailable'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary me-1" onclick="editMenuItem(${item.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMenuItem(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

// Add Menu Item
function addMenuItem() {
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const price = document.getElementById('itemPrice').value;
    const description = document.getElementById('itemDescription').value;
    const available = document.getElementById('itemAvailable').checked;
    
    if (!name || !price) {
        alert('Please fill in required fields');
        return;
    }
    
    const newItem = {
        id: adminMenuItems.length > 0 ? Math.max(...adminMenuItems.map(i => i.id)) + 1 : 1,
        name: name,
        category: category,
        price: parseInt(price),
        description: description,
        available: available
    };
    
    adminMenuItems.push(newItem);
    
    // Close modal and reload
    bootstrap.Modal.getInstance(document.getElementById('addItemModal')).hide();
    loadMenuItemsAdmin();
    
    // Clear form
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemAvailable').checked = true;
}

// Edit Menu Item
function editMenuItem(id) {
    const item = adminMenuItems.find(i => i.id === id);
    if (!item) return;
    
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemCategory').value = item.category;
    document.getElementById('editItemPrice').value = item.price;
    document.getElementById('editItemDescription').value = item.description;
    document.getElementById('editItemAvailable').checked = item.available;
    
    const modal = new bootstrap.Modal(document.getElementById('editItemModal'));
    modal.show();
}

// Update Menu Item
function updateMenuItem() {
    const id = parseInt(document.getElementById('editItemId').value);
    const item = adminMenuItems.find(i => i.id === id);
    
    if (!item) return;
    
    item.name = document.getElementById('editItemName').value;
    item.category = document.getElementById('editItemCategory').value;
    item.price = parseInt(document.getElementById('editItemPrice').value);
    item.description = document.getElementById('editItemDescription').value;
    item.available = document.getElementById('editItemAvailable').checked;
    
    bootstrap.Modal.getInstance(document.getElementById('editItemModal')).hide();
    loadMenuItemsAdmin();
}

// Delete Menu Item
function deleteMenuItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        adminMenuItems = adminMenuItems.filter(i => i.id !== id);
        loadMenuItemsAdmin();
    }
}

// Load Orders
function loadOrders(filter = 'all') {
    const tbody = document.getElementById('ordersTable');
    if (!tbody) return;
    
    let filteredOrders = adminOrders;
    if (filter !== 'all') {
        filteredOrders = adminOrders.filter(o => o.status === filter);
    }
    
    let html = '';
    filteredOrders.forEach(order => {
        const statusClass = {
            'new': 'primary',
            'preparing': 'warning',
            'completed': 'success',
            'cancelled': 'danger'
        }[order.status];
        
        html += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.items}</td>
                <td>₹${order.total}</td>
                <td>
                    <span class="badge bg-${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                </td>
                <td>${order.time}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewOrderDetails('${order.id}')">View</button>
                    ${order.status !== 'completed' && order.status !== 'cancelled' ? 
                        `<button class="btn btn-sm btn-success" onclick="updateOrderStatus('${order.id}')">Next Status</button>` 
                        : ''}
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No orders found</td></tr>';
}

// Filter Orders
function filterOrders(status) {
    // Update active button
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadOrders(status);
}

// View Order Details
function viewOrderDetails(orderId) {
    const order = adminOrders.find(o => o.id === orderId);
    if (!order) return;
    
    document.getElementById('modalOrderId').textContent = orderId;
    
    const html = `
        <div class="mb-3">
            <strong>Customer:</strong> ${order.customer}
        </div>
        <div class="mb-3">
            <strong>Status:</strong> 
            <span class="badge bg-${
                order.status === 'new' ? 'primary' :
                order.status === 'preparing' ? 'warning' :
                order.status === 'completed' ? 'success' : 'danger'
            }">${order.status.toUpperCase()}</span>
        </div>
        <div class="mb-3">
            <strong>Items:</strong><br>
            ${order.itemsList}
        </div>
        <div class="mb-3">
            <strong>Total Amount:</strong> ₹${order.total}
        </div>
        <div class="mb-3">
            <strong>Order Time:</strong> ${order.time}
        </div>
    `;
    
    document.getElementById('orderDetailsBody').innerHTML = html;
    
    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
}

// Update Order Status
function updateOrderStatus(orderId) {
    const order = adminOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const statusFlow = {
        'new': 'preparing',
        'preparing': 'completed'
    };
    
    order.status = statusFlow[order.status];
    loadOrders();
}

// Save Cafe Settings
function saveCafeSettings() {
    const alertDiv = document.getElementById('cafeSettingsAlert');
    alertDiv.innerHTML = '<div class="alert alert-success">Cafe settings saved successfully!</div>';
    
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000);
}

// Save Operating Hours
function saveOperatingHours() {
    const alertDiv = document.getElementById('hoursAlert');
    alertDiv.innerHTML = '<div class="alert alert-success">Operating hours updated successfully!</div>';
    
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000);
}

// Save Tax Settings
function saveTaxSettings() {
    const alertDiv = document.getElementById('taxAlert');
    alertDiv.innerHTML = '<div class="alert alert-success">Tax rate updated successfully!</div>';
    
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000);
}

// Update Admin Profile
function updateAdminProfile() {
    const alertDiv = document.getElementById('profileAlert');
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmNewPassword').value;
    
    if (newPass && newPass !== confirmPass) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Passwords do not match!</div>';
        return;
    }
    
    if (newPass && newPass.length < 6) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Password must be at least 6 characters!</div>';
        return;
    }
    
    alertDiv.innerHTML = '<div class="alert alert-success">Profile updated successfully!</div>';
    
    // Clear password fields
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000);
}

// Save System Settings
function saveSystemSettings() {
    const acceptOrders = document.getElementById('acceptOrders').checked;
    const maintenance = document.getElementById('maintenanceMode').checked;
    
    if (maintenance) {
        if (!confirm('Enabling maintenance mode will make the site unavailable to users. Continue?')) {
            document.getElementById('maintenanceMode').checked = false;
            return;
        }
    }
    
    alert('System settings saved successfully!');
}

// Admin Logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
    }
}