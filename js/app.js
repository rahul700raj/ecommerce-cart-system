// Main Application Entry Point
class ShopCartApp {
    constructor() {
        this.version = '1.0.0';
        this.init();
    }

    init() {
        console.log(`%c ShopCart Pro v${this.version} `, 'background: #6366f1; color: white; padding: 5px 10px; border-radius: 5px;');
        console.log('🛒 E-Commerce Cart System Initialized');
        
        // Check storage availability
        this.checkStorage();
        
        // Load initial data
        this.loadInitialData();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Log app info
        this.logAppInfo();
    }

    checkStorage() {
        if (!storage.storageAvailable) {
            console.warn('⚠️ localStorage not available. Data will not persist.');
            ui.showToast('Warning: Data will not be saved!', 'error');
        } else {
            console.log('✅ localStorage available');
            const info = storage.getStorageInfo();
            console.log(`📊 Storage: ${info.used} used, ${info.items} items`);
        }
    }

    loadInitialData() {
        console.log('📦 Loading cart data...');
        const cart = cartManager.getCart();
        const wishlist = cartManager.getWishlist();
        const orders = cartManager.getOrders();
        
        console.log(`🛒 Cart: ${cart.length} items`);
        console.log(`❤️ Wishlist: ${wishlist.length} items`);
        console.log(`📦 Orders: ${orders.length} orders`);
        
        // Update UI
        ui.updateBadges();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('search-input').focus();
            }
            
            // Ctrl/Cmd + 1-4: Switch pages
            if ((e.ctrlKey || e.metaKey) && ['1', '2', '3', '4'].includes(e.key)) {
                e.preventDefault();
                const pages = ['products', 'cart', 'wishlist', 'orders'];
                ui.switchPage(pages[parseInt(e.key) - 1]);
            }
            
            // Escape: Close modal
            if (e.key === 'Escape') {
                ui.closeCheckoutModal();
            }
        });
        
        console.log('⌨️ Keyboard shortcuts enabled');
        console.log('  Ctrl+K: Search');
        console.log('  Ctrl+1-4: Switch pages');
        console.log('  Esc: Close modal');
    }

    setupPerformanceMonitoring() {
        // Monitor page load time
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        });

        // Monitor memory usage (if available)
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMemory = (memory.usedJSHeapSize / 1048576).toFixed(2);
                const totalMemory = (memory.totalJSHeapSize / 1048576).toFixed(2);
                
                if (usedMemory / totalMemory > 0.9) {
                    console.warn(`⚠️ High memory usage: ${usedMemory}MB / ${totalMemory}MB`);
                }
            }, 60000); // Check every minute
        }
    }

    logAppInfo() {
        console.log('\n📱 App Information:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Version: ${this.version}`);
        console.log(`Products: ${productsData.length}`);
        console.log(`Promo Codes: ${Object.keys(promoCodes).length}`);
        console.log(`Available Codes: ${Object.keys(promoCodes).join(', ')}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    // Public API for debugging
    getDebugInfo() {
        return {
            version: this.version,
            cart: cartManager.getCart(),
            wishlist: cartManager.getWishlist(),
            orders: cartManager.getOrders(),
            storage: storage.getStorageInfo(),
            summary: cartManager.getOrderSummary()
        };
    }

    // Export data
    exportData() {
        const data = storage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `shopcart-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        console.log('📥 Data exported successfully');
    }

    // Import data
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (storage.importData(data)) {
                    console.log('📤 Data imported successfully');
                    location.reload();
                } else {
                    console.error('❌ Failed to import data');
                }
            } catch (error) {
                console.error('❌ Invalid data file:', error);
            }
        };
        reader.readAsText(file);
    }

    // Clear all data
    clearAllData() {
        if (confirm('⚠️ This will delete all your data. Are you sure?')) {
            storage.clear();
            location.reload();
            console.log('🗑️ All data cleared');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ShopCartApp();
});

// Make app available globally for debugging
window.ShopCartApp = ShopCartApp;

// Service Worker registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('❌ Service Worker registration failed:', err));
    });
}