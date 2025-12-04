// Cart Manager Class - OOP Pattern
class CartManager {
    constructor() {
        this.cart = storage.getCart();
        this.wishlist = storage.getWishlist();
        this.appliedPromo = storage.getPromoCode();
        this.shippingCost = 0;
        this.freeShippingThreshold = 5000;
        this.taxRate = 0.18; // 18% GST
    }

    // Add product to cart
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            if (existingItem.quantity > product.stock) {
                existingItem.quantity = product.stock;
                return { success: false, message: 'Maximum stock reached!' };
            }
        } else {
            this.cart.push({
                ...product,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        return { success: true, message: 'Added to cart!' };
    }

    // Remove product from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        return { success: true, message: 'Removed from cart!' };
    }

    // Update quantity
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        
        if (item) {
            const product = productsData.find(p => p.id === productId);
            
            if (quantity > product.stock) {
                return { success: false, message: 'Exceeds available stock!' };
            }
            
            if (quantity <= 0) {
                return this.removeFromCart(productId);
            }
            
            item.quantity = quantity;
            this.saveCart();
            return { success: true, message: 'Quantity updated!' };
        }
        
        return { success: false, message: 'Item not found!' };
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        this.appliedPromo = null;
        storage.removePromoCode();
        this.saveCart();
        return { success: true, message: 'Cart cleared!' };
    }

    // Get cart items
    getCart() {
        return this.cart;
    }

    // Get cart count
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Calculate subtotal
    getSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Apply promo code
    applyPromoCode(code) {
        const promo = promoCodes[code.toUpperCase()];
        
        if (!promo) {
            return { success: false, message: 'Invalid promo code!' };
        }

        this.appliedPromo = { code: code.toUpperCase(), ...promo };
        storage.savePromoCode(this.appliedPromo);
        
        return { 
            success: true, 
            message: `Promo code applied! ${promo.description}`,
            promo: this.appliedPromo
        };
    }

    // Remove promo code
    removePromoCode() {
        this.appliedPromo = null;
        storage.removePromoCode();
        return { success: true, message: 'Promo code removed!' };
    }

    // Calculate discount
    getDiscount() {
        if (!this.appliedPromo) return 0;

        const subtotal = this.getSubtotal();
        
        if (this.appliedPromo.type === 'percentage') {
            return (subtotal * this.appliedPromo.discount) / 100;
        } else {
            return Math.min(this.appliedPromo.discount, subtotal);
        }
    }

    // Calculate shipping
    getShipping() {
        const subtotal = this.getSubtotal();
        return subtotal >= this.freeShippingThreshold ? 0 : this.shippingCost;
    }

    // Calculate tax
    getTax() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        return (subtotal - discount) * this.taxRate;
    }

    // Calculate total
    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const shipping = this.getShipping();
        const tax = this.getTax();
        
        return subtotal - discount + shipping + tax;
    }

    // Get order summary
    getOrderSummary() {
        return {
            subtotal: this.getSubtotal(),
            discount: this.getDiscount(),
            shipping: this.getShipping(),
            tax: this.getTax(),
            total: this.getTotal(),
            itemCount: this.getCartCount(),
            appliedPromo: this.appliedPromo
        };
    }

    // Save cart to storage
    saveCart() {
        storage.saveCart(this.cart);
    }

    // Wishlist methods
    addToWishlist(product) {
        const exists = this.wishlist.find(item => item.id === product.id);
        
        if (exists) {
            return { success: false, message: 'Already in wishlist!' };
        }

        this.wishlist.push({
            ...product,
            addedAt: new Date().toISOString()
        });
        
        this.saveWishlist();
        return { success: true, message: 'Added to wishlist!' };
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        return { success: true, message: 'Removed from wishlist!' };
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    getWishlist() {
        return this.wishlist;
    }

    getWishlistCount() {
        return this.wishlist.length;
    }

    saveWishlist() {
        storage.saveWishlist(this.wishlist);
    }

    // Move from wishlist to cart
    moveToCart(productId) {
        const product = this.wishlist.find(item => item.id === productId);
        
        if (product) {
            this.removeFromWishlist(productId);
            return this.addToCart(product);
        }
        
        return { success: false, message: 'Product not found!' };
    }

    // Place order
    async placeOrder(customerInfo) {
        if (this.cart.length === 0) {
            return { success: false, message: 'Cart is empty!' };
        }

        // Simulate async payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        const order = {
            id: 'ORD' + Date.now(),
            items: [...this.cart],
            customer: customerInfo,
            summary: this.getOrderSummary(),
            status: 'processing',
            placedAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Save order
        const orders = storage.getOrders();
        orders.unshift(order);
        storage.saveOrders(orders);

        // Clear cart
        this.clearCart();

        return { 
            success: true, 
            message: 'Order placed successfully!',
            order: order
        };
    }

    // Get orders
    getOrders() {
        return storage.getOrders();
    }
}

// Create singleton instance
const cartManager = new CartManager();