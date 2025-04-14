//cart function

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const paymentForm = document.getElementById('payment-form');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartNotification() {
        // Update cart count in navigation
        const navCartCount = document.querySelector('nav .cart-icon #cart-count');
        if (navCartCount) {
            navCartCount.textContent = cart.length;
            navCartCount.style.display = cart.length > 0 ? 'block' : 'none';
        }
    }

    function updateCart() {
        // Clear existing cart items
        cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;

        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <span class="cart-item-remove" onclick="removeFromCart(${index})">Remove</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);

            subtotal += parseFloat(item.price);
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        // Update cart count
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }

        // Update totals
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart notification
        updateCartNotification();
    }

    window.addToCart = function(name, price, image) {
        cart.push({ name, price, image });
        updateCart();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    }

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment processed successfully! Thank you for your purchase.');
        cart = [];
        updateCart();
    });

    // Initial cart update
    updateCart();
});