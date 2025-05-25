# TeeStyle - T-Shirt Store Website

## How to Add Your Own T-Shirt Images

### Method 1: Local Images (Recommended for Development)

1. **Create an images folder:**
   ```
   my-project/
   ├── images/
   │   ├── white-tshirt.jpg
   │   ├── black-tshirt.jpg
   │   ├── blue-tshirt.jpg
   │   └── ...
   ├── index.html
   ├── styles.css
   └── script.js
   ```

2. **Add image paths to your products in `script.js`:**
   ```javascript
   const products = [
       {
           id: 1,
           name: "Classic White Essential",
           description: "Premium 100% organic cotton tee",
           price: 24.99,
           originalPrice: 29.99,
           color: "#ffffff",
           gradient: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
           badge: "Bestseller",
           category: "essentials",
           image: "images/white-tshirt.jpg" // Add this line
       },
       // Add image property to other products...
   ];
   ```

### Method 2: Online Images (CDN/URLs)

You can also use online image URLs:

```javascript
{
    id: 1,
    name: "Classic White Essential",
    // ... other properties
    image: "https://example.com/path-to-your-image.jpg"
}
```

### Method 3: Multiple Images per Product

For products with multiple views or colors:

```javascript
{
    id: 1,
    name: "Classic White Essential",
    // ... other properties
    images: [
        "images/white-tshirt-front.jpg",
        "images/white-tshirt-back.jpg",
        "images/white-tshirt-side.jpg"
    ],
    image: "images/white-tshirt-front.jpg" // Primary image
}
```

## Image Requirements

### Recommended Specifications:
- **Format:** JPG, PNG, or WebP
- **Size:** 800x800px to 1200x1200px (square aspect ratio works best)
- **File size:** Under 500KB for fast loading
- **Background:** White or transparent for consistency

### Image Optimization Tips:
1. Use tools like TinyPNG or ImageOptim to compress images
2. Consider using WebP format for better compression
3. Ensure consistent lighting and angles across all product photos

## Complete Example

Here's how to add a complete product with an image:

```javascript
{
    id: 9,
    name: "Your Custom T-Shirt",
    description: "Amazing custom design with premium quality fabric",
    price: 28.99,
    originalPrice: 35.99,
    color: "#ff6b6b",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    badge: "New",
    category: "custom",
    image: "images/your-custom-tshirt.jpg"
}
```

## Fallback Design

If you don't provide an image, the website will automatically show a beautiful gradient-based mockup using the `gradient` property you specify. This ensures your site always looks professional even without product photos.

## Advanced: Dynamic Image Loading

For better performance, you can implement lazy loading:

```javascript
// The website already includes lazy loading functionality
// Images will load as users scroll to them
```

## Troubleshooting

### Image Not Showing?
1. Check the file path is correct
2. Ensure the image file exists in the specified location
3. Verify the image format is supported (JPG, PNG, WebP)
4. Check browser console for any error messages

### Image Quality Issues?
1. Use higher resolution source images
2. Ensure proper compression without over-compression
3. Consider the `object-fit: cover` CSS property for consistent sizing

## Website Features Implemented

✅ **Enhanced Visual Design**
- Modern gradient backgrounds
- Google Fonts (Inter & Playfair Display)
- Improved typography and spacing
- Enhanced shadows and hover effects

✅ **Professional Product Display**
- Flexible image system (real photos or styled mockups)
- Product badges (Bestseller, Premium, Eco-Friendly, etc.)
- Sale pricing with strikethrough original prices
- Consistent card heights with aligned buttons

✅ **Fixed Add to Cart Alignment**
- All "Add to Cart" buttons are perfectly aligned
- Enhanced button styling with gradients and animations
- Improved hover and active states

✅ **Demo T-Shirt Collection**
- 8 diverse t-shirt designs with different colors and styles
- Professional product descriptions
- Varied pricing to show range
- Category system for organization

✅ **Modern UX Improvements**
- Smooth animations and transitions
- Loading states and micro-interactions
- Responsive design for all devices
- Enhanced cart functionality with notifications

## Next Steps

1. Add your t-shirt images to the `images/` folder
2. Update the product data in `script.js` with your image paths
3. Customize product names, descriptions, and prices
4. Test the website by opening `index.html` in your browser

Your website is now ready for professional use with a modern, attractive design that will engage customers and drive sales!
