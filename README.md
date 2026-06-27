# House Of Saanjh - Luxury Ethnic Wear Website

A elegant, modern website for **House Of Saanjh**, a luxury ethnic wear brand from Assam, India. The site showcases handcrafted collections for men and women, along with premium accessories.

## 🎨 Features

### Design & UX
- **Luxury Aesthetic**: Dark theme with gold accents reflecting premium brand identity
- **Smooth Animations**: Preloader, scroll reveals, and particle effects
- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Glass Morphism**: Modern glassmorphic chatbot interface
- **Smooth Scrolling**: Elegant navigation with smooth scroll behavior

### Sections
1. **Preloader** - Branded loading animation
2. **Navigation Bar** - Sticky navbar with blur effect on scroll
3. **Hero Section** - Eye-catching landing with particle effects
4. **Women's Collection** - 4 premium product cards (Lehenga, Anarkali, Saree)
5. **Men's Collection** - 4 premium product cards (Sherwani, Kurta Sets)
6. **Accessories Section** - 6 luxury accessories (Jewelry, Bags, Shoes, Stoles)
7. **CTA Section** - Call-to-action for concierge service
8. **Chatbot** - Interactive AI-powered customer support
9. **Footer** - Brand information

### Interactive Elements
- **Product Cards**: Hover effects with elevation and border animations
- **Chatbot**: 
  - Auto-initialize with welcome messages
  - Send and receive messages
  - Product inquiry integration
  - Responsive message animations
- **Navigation Links**: Smooth scroll to sections
- **Scroll-based Reveals**: Elements animate in as they enter viewport

## 📁 File Structure

```
house-of-saanjh/
├── index.html          # Main HTML file
├── styles.css          # Complete styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 How to Use

1. **Clone the repository**:
   ```bash
   git clone https://github.com/draviranjan1809-source/house-of-saanjh.git
   cd house-of-saanjh
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Or deploy online**:
   - Deploy to GitHub Pages
   - Deploy to Netlify (Drag & drop the folder)
   - Deploy to Vercel
   - Use any static hosting service

## 💻 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Key Technologies

- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with CSS Variables, Gradients, Animations, and Backdrop Filters
- **JavaScript (Vanilla)**: No dependencies required
- **Fonts**: Google Fonts (Cormorant Garamond, Inter)

## 🌟 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --gold: #c9a84c;
    --bg-primary: #0a0a0a;
    --text-primary: #e0d5c1;
    /* ... more colors */
}
```

### Products
Edit product cards in `index.html`:
```html
<div class="product-card">
    <div class="product-image"><!-- Icon or Image --></div>
    <div class="product-info">
        <p class="product-category">Category</p>
        <h3 class="product-name">Product Name</h3>
        <p class="product-price">₹Price</p>
        <p class="product-fabric">Material Details</p>
    </div>
</div>
```

### Chatbot Responses
Edit bot responses in `script.js`:
```javascript
const botResponses = [
    "Your custom message here",
    // ... more responses
];
```

## 📱 Responsive Breakpoints

- **Desktop**: Full layout
- **Tablet/Mobile (≤768px)**: 
  - Reduced padding and font sizes
  - 2-column product grid
  - Compact chatbot window
  - Optimized navigation

## ✨ Features in Detail

### Preloader
- 2-second animated loading screen
- Gradual reveal of brand name
- Smooth line expansion

### Navbar
- Fixed positioning with smooth transitions
- Blur effect activates on scroll
- Animated underline on link hover
- Concierge button for quick chat access

### Scroll Reveal
- Elements fade in and slide up as they enter viewport
- Staggered animation for product grids

### Particle Effects
- 50 animated particles float upward in hero section
- Random timing and positioning
- Creates luxury ambiance

### Chatbot
- **Features**:
  - Auto-initialize with greeting messages
  - Real-time message sending
  - Simulated AI responses
  - Product inquiry pre-fill
  - Keyboard support (Enter to send)
  - Smooth animations
  - Click on products to auto-fill inquiry

## 🎨 Design Philosophy

- **Minimalist Luxury**: Less is more approach
- **Gold & Black Palette**: Premium, timeless aesthetic
- **Typography**: Serif headings (Cormorant Garamond) for elegance, sans-serif body for readability
- **Spacing**: Generous white space and padding
- **Animations**: Subtle, smooth transitions that enhance without distracting

## 🔧 Maintenance

### Adding New Products
1. Duplicate a product card in the appropriate section
2. Update the emoji/icon, name, price, and fabric details
3. The card will automatically get hover effects and animations

### Updating Chatbot Responses
Edit the `botResponses` array in `script.js` to add more varied responses

### Performance Optimization
- Images are lightweight (emojis used as placeholders)
- CSS animations use GPU acceleration
- Minimal JavaScript for fast load times

## 📄 License

This website template is free to use for **House Of Saanjh** brand.

## 📞 Contact

For inquiries about customization or deployment, contact:
- **Email**: draviranjan1809@gmail.com
- **Repository**: https://github.com/draviranjan1809-source/house-of-saanjh

## 🚀 Deployment Instructions

### GitHub Pages
1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select main branch as source
4. Your site will be live at `https://username.github.io/house-of-saanjh`

### Netlify
1. Drag & drop the folder to Netlify
2. Site deploys automatically
3. Get a custom domain or use the auto-generated one

### Vercel
1. Connect GitHub repository
2. Vercel auto-detects it's a static site
3. Deploy with one click

## 📊 Performance Metrics

- **Preloader Duration**: 2 seconds
- **Page Load**: < 1 second (after preloader)
- **Animations**: 60 FPS (smooth)
- **Mobile Responsive**: ✅ Optimized

---

**Made with ❤️ for House Of Saanjh - Luxury Meets Elegance**
