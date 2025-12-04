# 🛒 ShopCart Pro - Advanced E-Commerce Cart System

A production-ready, full-featured e-commerce cart system built with vanilla JavaScript demonstrating modern web development practices including OOP, localStorage, async operations, and advanced UI patterns.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

## ✨ Key Features

### 🛍️ Shopping Experience
- **Product Catalog** - 12 pre-loaded products across 4 categories
- **Advanced Filtering** - Filter by category, sort by price/name/rating
- **Real-time Search** - Instant product search
- **Product Details** - Images, ratings, reviews, stock info
- **Responsive Grid** - Auto-adjusting product layout

### 🛒 Cart Management
- **Add/Remove Products** - Smooth cart operations
- **Quantity Control** - Increment/decrement with stock validation
- **Real-time Updates** - Instant price calculations
- **Persistent Storage** - Cart saved in localStorage
- **Clear Cart** - One-click cart clearing

### 💰 Pricing & Discounts
- **Dynamic Pricing** - Real-time total calculation
- **Promo Codes** - Multiple discount codes support
- **Tax Calculation** - 18% GST included
- **Free Shipping** - On orders above ₹5000
- **Discount Display** - Visual savings indicator

### ❤️ Wishlist
- **Save Favorites** - Add products to wishlist
- **Move to Cart** - Quick wishlist to cart transfer
- **Persistent Storage** - Wishlist saved locally
- **Badge Counter** - Real-time wishlist count

### 📦 Order Management
- **Order Placement** - Complete checkout flow
- **Order History** - View all past orders
- **Order Details** - Items, pricing, status
- **Delivery Tracking** - Estimated delivery dates
- **Order Status** - Processing/Delivered indicators

### 🎨 UI/UX Features
- **Modern Design** - Clean, professional interface
- **Smooth Animations** - Polished transitions
- **Toast Notifications** - User feedback system
- **Modal Dialogs** - Checkout form modal
- **Empty States** - Helpful empty cart/wishlist messages
- **Loading States** - Processing indicators
- **Responsive Design** - Mobile, tablet, desktop support

### ⚙️ Technical Features
- **OOP Architecture** - Class-based design
- **localStorage API** - Persistent data storage
- **Async Operations** - Simulated payment processing
- **Event Delegation** - Efficient event handling
- **Keyboard Shortcuts** - Power user features
- **Performance Monitoring** - Load time tracking
- **Debug Console** - Development tools
- **Data Export/Import** - Backup functionality

## 🎯 Available Promo Codes

Try these codes at checkout:

| Code | Discount | Description |
|------|----------|-------------|
| `SAVE10` | 10% | 10% off your order |
| `SAVE20` | 20% | 20% off your order |
| `FLAT500` | ₹500 | Flat ₹500 discount |
| `FIRST100` | ₹100 | ₹100 off first order |
| `WELCOME` | 15% | 15% welcome discount |

## ⚙️ Tech Stack

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling (Flexbox, Grid, Animations)
- **JavaScript (ES6+)** - Vanilla JS with modern features

### JavaScript Concepts Demonstrated
- ✅ Object-Oriented Programming (Classes)
- ✅ DOM Manipulation
- ✅ Event Handling
- ✅ localStorage API
- ✅ Async/Await
- ✅ Array Methods (map, filter, reduce, sort)
- ✅ Template Literals
- ✅ Destructuring
- ✅ Spread Operator
- ✅ Arrow Functions
- ✅ Modules Pattern
- ✅ Singleton Pattern
- ✅ Error Handling

## 🚀 Getting Started

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahul700raj/ecommerce-cart-system.git
   cd ecommerce-cart-system
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file access
   open index.html
   
   # Option 2: Using Python server
   python -m http.server 8000
   
   # Option 3: Using Node.js
   npx serve
   ```

3. **Start shopping!**
   - Browse products
   - Add items to cart
   - Apply promo codes
   - Complete checkout

### No Build Process Required!
This is a pure vanilla JavaScript project - no npm, webpack, or build tools needed.

## 📁 Project Structure

```
ecommerce-cart-system/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles
├── js/
│   ├── products.js        # Product data & promo codes
│   ├── storage.js         # localStorage manager (OOP)
│   ├── cart.js            # Cart manager (OOP)
│   ├── ui.js              # UI manager (OOP)
│   └── app.js             # Main application entry
└── README.md              # Documentation
```

## 💻 Usage Examples

### Adding Products to Cart
```javascript
// Programmatically add product
cartManager.addToCart(product, quantity);

// Via UI
ui.addToCart(productId);
```

### Applying Promo Codes
```javascript
// Apply discount
cartManager.applyPromoCode('SAVE20');

// Remove discount
cartManager.removePromoCode();
```

### Managing Wishlist
```javascript
// Add to wishlist
cartManager.addToWishlist(product);

// Move to cart
cartManager.moveToCart(productId);
```

### Placing Orders
```javascript
// Place order with customer info
await cartManager.placeOrder({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    paymentMethod: 'card'
});
```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus search bar
- `Ctrl/Cmd + 1` - Go to Products
- `Ctrl/Cmd + 2` - Go to Cart
- `Ctrl/Cmd + 3` - Go to Wishlist
- `Ctrl/Cmd + 4` - Go to Orders
- `Esc` - Close modal

## 🔧 Advanced Features

### Debug Console
Open browser console and try:
```javascript
// Get app info
app.getDebugInfo();

// Export data
app.exportData();

// Clear all data
app.clearAllData();

// Get storage info
storage.getStorageInfo();

// Get order summary
cartManager.getOrderSummary();
```

### Data Persistence
All data is automatically saved to localStorage:
- Cart items
- Wishlist items
- Order history
- Applied promo codes
- User preferences

### Performance Monitoring
The app tracks:
- Page load time
- Memory usage
- Storage usage
- Operation timing

## 📚 Learning Outcomes

This project teaches:

1. **DOM Manipulation** - Dynamic content rendering
2. **Event Handling** - User interactions
3. **OOP in JavaScript** - Class-based architecture
4. **localStorage** - Client-side data persistence
5. **Async Operations** - Simulated API calls
6. **State Management** - Application state handling
7. **UI/UX Design** - Modern interface patterns
8. **Responsive Design** - Mobile-first approach
9. **Error Handling** - Graceful failure management
10. **Code Organization** - Modular architecture

## 🎨 Customization

### Adding Products
Edit `js/products.js`:
```javascript
const productsData = [
    {
        id: 13,
        name: "Your Product",
        category: "electronics",
        price: 1999,
        originalPrice: 2999,
        image: "image-url",
        rating: 4.5,
        reviews: 100,
        stock: 20,
        description: "Product description"
    }
];
```

### Adding Promo Codes
Edit `js/products.js`:
```javascript
const promoCodes = {
    'NEWCODE': { 
        discount: 25, 
        type: 'percentage', 
        description: '25% off' 
    }
};
```

### Styling
Modify `css/style.css` CSS variables:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
    /* ... */
}
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🔒 Security Features

- Input validation
- XSS prevention
- Safe localStorage usage
- Error boundary handling

## 🚀 Future Enhancements

Potential additions:
- [ ] User authentication
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Product reviews system
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Email notifications
- [ ] PWA support
- [ ] Dark mode
- [ ] Multi-currency support

## 🤝 Contributing

Contributions welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for learning or commercial projects!

## 👨‍💻 Author

**Rahul Mishra**
- GitHub: [@rahul700raj](https://github.com/rahul700raj)
- Email: rm2778643@gmail.com

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Font Awesome](https://fontawesome.com)
- Inspiration from modern e-commerce platforms

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review code comments

---

⭐ **Star this repo if you found it helpful!**

Built with ❤️ using Vanilla JavaScript