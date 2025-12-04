// UI Manager Class - OOP Pattern
class UIManager {
    constructor() {
        this.currentPage = 'products';
        this.filteredProducts = [...productsData];
        this.initializeEventListeners();
        this.renderProducts();
        this.updateBadges();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPage(e.target.closest('.nav-btn').dataset.page);
            });
        });

        // Filters
        document.getElementById('category-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('sort-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('search-input').addEventListener('input', () => this.applyFilters());

        // Cart actions
        document.getElementById('apply-promo').addEventListener('click', () => this.applyPromoCode());
        document.getElementById('clear-cart-btn').addEventListener('click', () => this.clearCart());
        document.getElementById('checkout-btn').addEventListener('click', () => this.openCheckoutModal());

        // Modal
        document.querySelector('.close-modal').addEventListener('click', () => this.closeCheckoutModal());
        document.getElementById('checkout-form').addEventListener('submit', (e) => this.handleCheckout(e));

        // Close modal on outside click
        document.getElementById('checkout-modal').addEventListener('click', (e) => {
            if (e.target.id === 'checkout-modal') {
                this.closeCheckoutModal();
            }
        });
    }

    // Switch between pages
    switchPage(page) {
        this.currentPage = page;
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        // Update pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.toggle('active', p.id === `${page}-page`);
        });

        // Render content based on page
        switch(page) {
            case 'products':
                this.renderProducts();
                break;
            case 'cart':
                this.renderCart();
                break;
            case 'wishlist':
                this.renderWishlist();
                break;
            case 'orders':
                this.renderOrders();
                break;
        }
    }

    // Apply filters and sorting
    applyFilters() {
        const category = document.getElementById('category-filter').value;
        const sort = document.getElementById('sort-filter').value;
        const search = document.getElementById('search-input').value.toLowerCase();

        // Filter by category
        this.filteredProducts = category === 'all' 
            ? [...productsData]
            : productsData.filter(p => p.category === category);

        // Filter by search
        if (search) {
            this.filteredProducts = this.filteredProducts.filter(p => 
                p.name.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
            );
        }

        // Sort products
        switch(sort) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }

        this.renderProducts();
    }

    // Render products
    renderProducts() {
        const grid = document.getElementById('products-grid');
        
        if (this.filteredProducts.length === 0) {
            grid.innerHTML = this.getEmptyState('No products found', 'Try adjusting your filters');
            return;
        }

        grid.innerHTML = this.filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${this.getDiscountBadge(product)}
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${this.getStars(product.rating)}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ₹${product.price.toLocaleString()}
                        <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-primary" onclick="ui.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="wishlist-btn ${cartManager.isInWishlist(product.id) ? 'active' : ''}" 
                                onclick="ui.toggleWishlist(${product.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render cart
    renderCart() {
        const cartItems = cartManager.getCart();
        const container = document.getElementById('cart-items');

        if (cartItems.length === 0) {
            container.innerHTML = this.getEmptyState('Your cart is empty', 'Add some products to get started!');
            this.updateCartSummary();
            return;
        }

        container.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="ui.updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="ui.updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-btn" onclick="ui.removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    // Update cart summary
    updateCartSummary() {
        const summary = cartManager.getOrderSummary();
        
        document.getElementById('subtotal').textContent = `₹${summary.subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
        document.getElementById('discount').textContent = `-₹${summary.discount.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
        document.getElementById('shipping').textContent = summary.shipping === 0 ? 'FREE' : `₹${summary.shipping.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
        document.getElementById('tax').textContent = `₹${summary.tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
        document.getElementById('total').textContent = `₹${summary.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;

        // Update promo input
        if (summary.appliedPromo) {
            document.getElementById('promo-input').value = summary.appliedPromo.code;
        }
    }

    // Render wishlist
    renderWishlist() {
        const wishlist = cartManager.getWishlist();
        const grid = document.getElementById('wishlist-grid');

        if (wishlist.length === 0) {
            grid.innerHTML = this.getEmptyState('Your wishlist is empty', 'Save your favorite items here!');
            return;
        }

        grid.innerHTML = wishlist.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">₹${product.price.toLocaleString()}</div>
                    <div class="product-actions">
                        <button class="btn-primary" onclick="ui.moveToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Move to Cart
                        </button>
                        <button class="btn-secondary" onclick="ui.removeFromWishlist(${product.id})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render orders
    renderOrders() {
        const orders = cartManager.getOrders();
        const container = document.getElementById('orders-list');

        if (orders.length === 0) {
            container.innerHTML = this.getEmptyState('No orders yet', 'Your order history will appear here');
            return;
        }

        container.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">
                            ${new Date(order.placedAt).toLocaleDateString('en-IN', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </div>
                    </div>
                    <span class="order-status ${order.status}">${order.status}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name} × ${item.quantity}</span>
                            <span>₹${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <div>
                        <strong>Delivery by:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}
                    </div>
                    <div class="order-total">₹${order.summary.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                </div>
            </div>
        `).join('');
    }

    // Cart actions
    addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        const result = cartManager.addToCart(product);
        this.showToast(result.message, result.success ? 'success' : 'error');
        this.updateBadges();
        if (this.currentPage === 'cart') this.renderCart();
    }

    removeFromCart(productId) {
        const result = cartManager.removeFromCart(productId);
        this.showToast(result.message, 'success');
        this.updateBadges();
        this.renderCart();
    }

    updateQuantity(productId, quantity) {
        const result = cartManager.updateQuantity(productId, quantity);
        if (!result.success) {
            this.showToast(result.message, 'error');
        }
        this.updateBadges();
        this.renderCart();
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            const result = cartManager.clearCart();
            this.showToast(result.message, 'success');
            this.updateBadges();
            this.renderCart();
        }
    }

    // Wishlist actions
    toggleWishlist(productId) {
        const product = productsData.find(p => p.id === productId);
        const isInWishlist = cartManager.isInWishlist(productId);
        
        const result = isInWishlist 
            ? cartManager.removeFromWishlist(productId)
            : cartManager.addToWishlist(product);
        
        this.showToast(result.message, result.success ? 'success' : 'error');
        this.updateBadges();
        this.renderProducts();
        if (this.currentPage === 'wishlist') this.renderWishlist();
    }

    removeFromWishlist(productId) {
        const result = cartManager.removeFromWishlist(productId);
        this.showToast(result.message, 'success');
        this.updateBadges();
        this.renderWishlist();
    }

    moveToCart(productId) {
        const result = cartManager.moveToCart(productId);
        this.showToast(result.message, result.success ? 'success' : 'error');
        this.updateBadges();
        this.renderWishlist();
    }

    // Promo code
    applyPromoCode() {
        const code = document.getElementById('promo-input').value.trim();
        
        if (!code) {
            this.showPromoMessage('Please enter a promo code', false);
            return;
        }

        const result = cartManager.applyPromoCode(code);
        this.showPromoMessage(result.message, result.success);
        
        if (result.success) {
            this.renderCart();
        }
    }

    showPromoMessage(message, success) {
        const messageEl = document.getElementById('promo-message');
        messageEl.textContent = message;
        messageEl.className = `promo-message ${success ? 'success' : 'error'}`;
        
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'promo-message';
        }, 3000);
    }

    // Checkout
    openCheckoutModal() {
        if (cartManager.getCartCount() === 0) {
            this.showToast('Your cart is empty!', 'error');
            return;
        }

        const summary = cartManager.getOrderSummary();
        document.getElementById('modal-total').textContent = `₹${summary.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
        document.getElementById('checkout-modal').classList.add('active');
    }

    closeCheckoutModal() {
        document.getElementById('checkout-modal').classList.remove('active');
        document.getElementById('checkout-form').reset();
    }

    async handleCheckout(e) {
        e.preventDefault();

        const customerInfo = {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            phone: document.getElementById('customer-phone').value,
            address: document.getElementById('customer-address').value,
            paymentMethod: document.getElementById('payment-method').value
        };

        // Show loading
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        const result = await cartManager.placeOrder(customerInfo);

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (result.success) {
            this.closeCheckoutModal();
            this.showToast(result.message, 'success');
            this.updateBadges();
            this.switchPage('orders');
        } else {
            this.showToast(result.message, 'error');
        }
    }

    // Update badges
    updateBadges() {
        document.querySelector('.cart-badge').textContent = cartManager.getCartCount();
        document.querySelector('.wishlist-badge').textContent = cartManager.getWishlistCount();
    }

    // Helper methods
    getStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        return stars;
    }

    getDiscountBadge(product) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        return discount > 0 ? `<span class="product-badge">${discount}% OFF</span>` : '';
    }

    getEmptyState(title, message) {
        return `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="btn-primary" onclick="ui.switchPage('products')">
                    <i class="fas fa-shopping-bag"></i> Browse Products
                </button>
            </div>
        `;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Create singleton instance
const ui = new UIManager();