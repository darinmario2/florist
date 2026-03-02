// 1. Initialize Cart Array
let cart = [];

// 2. Function to Open/Close Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// 3. Function to Add Item to Cart
function addToCart(productName, productPrice) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If exists, just increase quantity
        existingItem.quantity += 1;
    } else {
        // If not, add new item object
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Update the UI
    updateCartDisplay();
    
    // Optional: Open sidebar automatically when adding
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar.classList.contains('active')) {
        toggleCart();
    }
}

// 4. Function to Render Cart Items & Calculate Totals
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    // Clear current HTML
    cartItemsContainer.innerHTML = '';

    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        // Loop through cart array and create HTML for each item
        cart.forEach((item, index) => {
            totalQuantity += item.quantity;
            totalPrice += (item.price * item.quantity);

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            itemDiv.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="item-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // Update Header Count and Footer Total
    cartCountSpan.innerText = totalQuantity;
    cartTotalSpan.innerText = totalPrice.toFixed(2);
}

// 5. Function to Handle + and - buttons in cart
function changeQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        // If quantity goes to 0, remove item (optional: ask for confirmation)
        cart.splice(index, 1);
    }
    updateCartDisplay();
}
