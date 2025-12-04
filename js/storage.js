// Storage Manager Class - OOP Pattern
class StorageManager {
    constructor() {
        this.storageAvailable = this.checkStorageAvailability();
    }

    // Check if localStorage is available
    checkStorageAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return false;
        }
    }

    // Get data from localStorage
    get(key) {
        if (!this.storageAvailable) return null;
        
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    }

    // Set data to localStorage
    set(key, value) {
        if (!this.storageAvailable) return false;
        
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error writing to localStorage:', e);
            return false;
        }
    }

    // Remove data from localStorage
    remove(key) {
        if (!this.storageAvailable) return false;
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }

    // Clear all data
    clear() {
        if (!this.storageAvailable) return false;
        
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }

    // Get cart from storage
    getCart() {
        return this.get('cart') || [];
    }

    // Save cart to storage
    saveCart(cart) {
        return this.set('cart', cart);
    }

    // Get wishlist from storage
    getWishlist() {
        return this.get('wishlist') || [];
    }

    // Save wishlist to storage
    saveWishlist(wishlist) {
        return this.set('wishlist', wishlist);
    }

    // Get orders from storage
    getOrders() {
        return this.get('orders') || [];
    }

    // Save orders to storage
    saveOrders(orders) {
        return this.set('orders', orders);
    }

    // Get applied promo code
    getPromoCode() {
        return this.get('promoCode') || null;
    }

    // Save promo code
    savePromoCode(code) {
        return this.set('promoCode', code);
    }

    // Remove promo code
    removePromoCode() {
        return this.remove('promoCode');
    }

    // Get user preferences
    getPreferences() {
        return this.get('preferences') || {
            theme: 'light',
            currency: 'INR',
            notifications: true
        };
    }

    // Save user preferences
    savePreferences(preferences) {
        return this.set('preferences', preferences);
    }

    // Export all data (for backup)
    exportData() {
        return {
            cart: this.getCart(),
            wishlist: this.getWishlist(),
            orders: this.getOrders(),
            promoCode: this.getPromoCode(),
            preferences: this.getPreferences(),
            exportDate: new Date().toISOString()
        };
    }

    // Import data (for restore)
    importData(data) {
        try {
            if (data.cart) this.saveCart(data.cart);
            if (data.wishlist) this.saveWishlist(data.wishlist);
            if (data.orders) this.saveOrders(data.orders);
            if (data.promoCode) this.savePromoCode(data.promoCode);
            if (data.preferences) this.savePreferences(data.preferences);
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    }

    // Get storage usage info
    getStorageInfo() {
        if (!this.storageAvailable) return null;

        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }

        return {
            used: (totalSize / 1024).toFixed(2) + ' KB',
            items: localStorage.length,
            available: this.storageAvailable
        };
    }
}

// Create singleton instance
const storage = new StorageManager();