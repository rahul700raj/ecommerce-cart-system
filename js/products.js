// Product Data - Array of Objects
const productsData = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 2999,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        rating: 4.5,
        reviews: 234,
        stock: 15,
        description: "Premium wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 5999,
        originalPrice: 8999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        rating: 4.8,
        reviews: 456,
        stock: 8,
        description: "Advanced fitness tracking and notifications"
    },
    {
        id: 3,
        name: "Leather Wallet",
        category: "fashion",
        price: 899,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        rating: 4.3,
        reviews: 123,
        stock: 25,
        description: "Genuine leather wallet with RFID protection"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "sports",
        price: 3499,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        rating: 4.6,
        reviews: 789,
        stock: 12,
        description: "Lightweight running shoes with cushioned sole"
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "home",
        price: 4999,
        originalPrice: 7999,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
        rating: 4.4,
        reviews: 345,
        stock: 6,
        description: "Automatic coffee maker with timer"
    },
    {
        id: 6,
        name: "Backpack",
        category: "fashion",
        price: 1999,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        rating: 4.7,
        reviews: 567,
        stock: 20,
        description: "Water-resistant laptop backpack"
    },
    {
        id: 7,
        name: "Wireless Mouse",
        category: "electronics",
        price: 799,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        rating: 4.2,
        reviews: 234,
        stock: 30,
        description: "Ergonomic wireless mouse with precision tracking"
    },
    {
        id: 8,
        name: "Yoga Mat",
        category: "sports",
        price: 1299,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        rating: 4.5,
        reviews: 432,
        stock: 18,
        description: "Non-slip yoga mat with carrying strap"
    },
    {
        id: 9,
        name: "Table Lamp",
        category: "home",
        price: 1499,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        rating: 4.3,
        reviews: 156,
        stock: 14,
        description: "Modern LED table lamp with adjustable brightness"
    },
    {
        id: 10,
        name: "Sunglasses",
        category: "fashion",
        price: 1999,
        originalPrice: 3499,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        rating: 4.6,
        reviews: 289,
        stock: 22,
        description: "UV protection polarized sunglasses"
    },
    {
        id: 11,
        name: "Portable Speaker",
        category: "electronics",
        price: 2499,
        originalPrice: 3999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        rating: 4.7,
        reviews: 678,
        stock: 10,
        description: "Waterproof Bluetooth speaker with 12-hour battery"
    },
    {
        id: 12,
        name: "Dumbbell Set",
        category: "sports",
        price: 3999,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
        rating: 4.8,
        reviews: 543,
        stock: 7,
        description: "Adjustable dumbbell set for home workout"
    }
];

// Promo Codes
const promoCodes = {
    'SAVE10': { discount: 10, type: 'percentage', description: '10% off' },
    'SAVE20': { discount: 20, type: 'percentage', description: '20% off' },
    'FLAT500': { discount: 500, type: 'fixed', description: '₹500 off' },
    'FIRST100': { discount: 100, type: 'fixed', description: '₹100 off for first order' },
    'WELCOME': { discount: 15, type: 'percentage', description: '15% welcome discount' }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, promoCodes };
}