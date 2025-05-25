// Product data with Uniqlo-style information
const products = [
    {
        id: 1,
        name: "SUPIMA® Cotton T-Shirt",
        category: "UNISEX, XXS-3XL",
        price: 19.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Light Gray", hex: "#e8e8e8" },
            { name: "Dark Gray", hex: "#666666" },
            { name: "Black", hex: "#000000" },
            { name: "Navy", hex: "#1a237e" },
            { name: "Brown", hex: "#8d6e63" }
        ],
        rating: 4.7,
        reviewCount: 737,
        offer: "Limited-Time Offer until 5/29",
        gradient: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        image: "images/b36155f5-bf23-4cfe-8c0a-e7d4c648c091.png"
    },
    {
        id: 2,
        name: "AIRism Cotton Oversized T-Shirt | Half-Sleeve",
        category: "UNISEX, XXS-3XL",
        price: 19.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Light Blue", hex: "#81d4fa" },
            { name: "Gray", hex: "#9e9e9e" },
            { name: "Black", hex: "#000000" }
        ],
        rating: 4.8,
        reviewCount: 999,
        offer: null,
        gradient: "linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%)",
        image: null
    },
    {
        id: 3,
        name: "AIRism Cotton T-Shirt | Striped | Contrast Trim",
        category: "MEN, XS-3XL",
        price: 9.90,
        originalPrice: null,
        colors: [
            { name: "White/Navy", hex: "#ffffff" },
            { name: "Black/White", hex: "#000000" }
        ],
        rating: 4.8,
        reviewCount: 32,
        offer: "Limited-Time Offer until 5/29",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        image: null
    },
    {
        id: 4,
        name: "AIRism Cotton T-Shirt",
        category: "MEN, XS-3XL",
        price: 9.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Gray", hex: "#9e9e9e" },
            { name: "Black", hex: "#000000" },
            { name: "Navy", hex: "#1a237e" }
        ],
        rating: 4.4,
        reviewCount: 29,
        offer: "Limited-Time Offer until 5/29",
        gradient: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        image: null
    },
    {
        id: 5,
        name: "Dry Pique Short Sleeve Polo Shirt",
        category: "MEN, XS-3XL",
        price: 14.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Navy", hex: "#1a237e" },
            { name: "Black", hex: "#000000" },
            { name: "Gray", hex: "#9e9e9e" }
        ],
        rating: 4.6,
        reviewCount: 156,
        offer: null,
        gradient: "linear-gradient(135deg, #1a237e 0%, #303f9f 100%)",
        image: null
    },
    {
        id: 6,
        name: "Heattech Crew Neck Long Sleeve T-Shirt",
        category: "MEN, XS-3XL",
        price: 12.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Black", hex: "#000000" },
            { name: "Gray", hex: "#9e9e9e" },
            { name: "Navy", hex: "#1a237e" }
        ],
        rating: 4.5,
        reviewCount: 89,
        offer: null,
        gradient: "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
        image: null
    },
    {
        id: 7,
        name: "UT Graphic T-Shirt (Short Sleeve)",
        category: "UNISEX, XS-3XL",
        price: 14.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Black", hex: "#000000" },
            { name: "Navy", hex: "#1a237e" }
        ],
        rating: 4.3,
        reviewCount: 67,
        offer: null,
        gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
        image: null
    },
    {
        id: 8,
        name: "Oversized Crew Neck Short Sleeve T-Shirt",
        category: "MEN, XS-3XL",
        price: 12.90,
        originalPrice: null,
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Beige", hex: "#f5f5dc" },
            { name: "Gray", hex: "#9e9e9e" },
            { name: "Black", hex: "#000000" }
        ],
        rating: 4.2,
        reviewCount: 43,
        offer: null,
        gradient: "linear-gradient(135deg, #f5f5dc 0%, #ddd8c7 100%)",
        image: "images/9b056001-0ce9-470f-9633-3fc9a45ee3fa.png"
    }
];

// Shopping cart and favorites
let cart = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartDisplay();
    initializeNavigation();
    initializeFilters();
});

// Load products into the grid
function loadProducts() {
    // Show loading animation
    productGrid.innerHTML = '<div class="loading">Loading products...</div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        productGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        // Add animation to product cards
        animateProductCards();
    }, 800);
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create color swatches
    const colorSwatchesHtml = product.colors.map((color, index) => 
        `<div class="color-swatch ${index === 0 ? 'active' : ''}" 
              style="background-color: ${color.hex};" 
              title="${color.name}"
              onclick="selectColor(${product.id}, ${index})"></div>`
    ).join('');
    
    // Create rating stars
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const starsHtml = 
        '★'.repeat(fullStars) + 
        (hasHalfStar ? '☆' : '') + 
        '☆'.repeat(emptyStars);
    
    // Create offer badge if available
    const offerBadgeHtml = product.offer ? 
        `<div class="offer-badge">${product.offer}</div>` : '';
    
    // Create image content
    const imageContent = product.image ? 
        `<img src="${product.image}" alt="${product.name}">` :
        `<div class="tshirt-mockup">
            <div class="tshirt-base" style="background: ${product.gradient};">
                <div class="tshirt-display">👕</div>
            </div>
        </div>`;

    // Check if product is in favorites
    const isFavorite = favorites.includes(product.id);

    card.innerHTML = `
        <div class="product-image" style="background: #f5f5f5;">
            ${offerBadgeHtml}
            <button class="favorite-heart ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                <i class="fa${isFavorite ? 's' : 'r'} fa-heart"></i>
            </button>
            ${imageContent}
        </div>
        <div class="product-info">
            <div class="color-swatches">
                ${colorSwatchesHtml}
            </div>
            <div class="product-category">${product.category}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">
                $${product.price}
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
            </div>
            ${product.offer ? `<div class="product-offer">${product.offer}</div>` : ''}
            <div class="product-rating">
                <span class="rating-stars">${starsHtml}</span>
                <span>${product.rating} (${product.reviewCount})</span>
            </div>
        </div>
    `;
    
    // Add click event to add to cart when clicking on the card (except interactive elements)
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.favorite-heart') && !e.target.closest('.color-swatch')) {
            addToCart(product.id);
        }
    });
    
    return card;
}

// Select color swatch
function selectColor(productId, colorIndex) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`) || 
                       Array.from(document.querySelectorAll('.product-card')).find(card => 
                           card.innerHTML.includes(`onclick="selectColor(${productId},`));
    
    if (productCard) {
        const swatches = productCard.querySelectorAll('.color-swatch');
        swatches.forEach((swatch, index) => {
            swatch.classList.toggle('active', index === colorIndex);
        });
    }
}

// Toggle favorite
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    const heartButton = document.querySelector(`[onclick="toggleFavorite(${productId})"]`);
    const heartIcon = heartButton.querySelector('i');
    
    if (index > -1) {
        favorites.splice(index, 1);
        heartButton.classList.remove('active');
        heartIcon.className = 'far fa-heart';
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push(productId);
        heartButton.classList.add('active');
        heartIcon.className = 'fas fa-heart';
        showNotification('Added to favorites', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        showAddToCartAnimation();
        showNotification('Added to cart!', 'success');
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Removed from cart', 'info');
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => {
            const imageContent = item.image ? 
                `<img src="${item.image}" alt="${item.name}" class="cart-item-image">` :
                `<div class="cart-item-mockup" style="background: ${item.gradient};">
                    <div class="cart-mockup-display">👕</div>
                </div>`;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image-container">
                        ${imageContent}
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Size: M</p>
                    </div>
                    <div class="cart-item-price">
                        $${(item.price * item.quantity).toFixed(2)}
                        <button onclick="removeFromCart(${item.id})" 
                                style="display: block; margin-top: 8px; background: #ff0000; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px;">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart modal
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    toggleCart();
    openCheckout();
}

// Open checkout modal
function openCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    // Display order summary
    checkoutItems.innerHTML = cart.map(item => {
        const imageContent = item.image ? 
            `<img src="${item.image}" alt="${item.name}" class="checkout-item-image">` :
            `<div class="checkout-item-mockup" style="background: ${item.gradient};">
                <div class="checkout-mockup-display">👕</div>
            </div>`;
        
        return `
            <div class="checkout-item">
                <div class="checkout-item-image-container">
                    ${imageContent}
                </div>
                <div class="checkout-item-info">
                    <h5>${item.name}</h5>
                    <p>Quantity: ${item.quantity} | Size: M</p>
                    <p class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
    
    // Show modal
    checkoutModal.style.display = 'block';
    
    // Add form submit handler
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.onsubmit = handleCheckoutSubmit;
}

// Close checkout modal
function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'none';
    
    // Reset form
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.reset();
}

// Handle checkout form submission
function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const customerInfo = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        country: formData.get('country'),
        specialInstructions: formData.get('specialInstructions')
    };
    
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        closeCheckout();
        showThankYou(customerInfo);
        cart = [];
        updateCartDisplay();
        showNotification('Order placed successfully!', 'success');
    }, 2000);
}

// Show thank you modal
function showThankYou(customerInfo) {
    const thankYouModal = document.getElementById('thankYouModal');
    const deliveryAddress = document.getElementById('deliveryAddress');
    const orderSummary = document.getElementById('orderSummary');
    
    deliveryAddress.innerHTML = `
        <div class="address-info">
            <p><strong>${customerInfo.firstName} ${customerInfo.lastName}</strong></p>
            <p>${customerInfo.address}</p>
            <p>${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}</p>
            <p>${customerInfo.country}</p>
            ${customerInfo.specialInstructions ? `<p><em>Special Instructions: ${customerInfo.specialInstructions}</em></p>` : ''}
        </div>
    `;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    orderSummary.innerHTML = `
        <div class="final-order-info">
            <p><strong>Items:</strong> ${itemCount} item${itemCount > 1 ? 's' : ''}</p>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            <p><strong>Email:</strong> ${customerInfo.email}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        </div>
    `;
    
    thankYouModal.style.display = 'block';
}

// Close thank you modal
function closeThankYou() {
    const thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.display = 'none';
}

// Initialize navigation
function initializeNavigation() {
    // Navigation link interactions
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // You could add filtering logic here based on the clicked category
            showNotification(`Viewing: ${this.textContent}`, 'info');
        });
    });
}

// Initialize filters
function initializeFilters() {
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.options[0].text;
            const selectedValue = this.value;
            
            if (selectedValue !== this.options[0].value) {
                showNotification(`Filter applied: ${filterType} - ${selectedValue}`, 'info');
                // Add actual filtering logic here
            }
        });
    });
}

// Animate product cards
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Show add to cart animation
function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.1)';
        cartIcon.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    const thankYouModal = document.getElementById('thankYouModal');
    
    if (event.target === cartModal) {
        toggleCart();
    }
    if (event.target === checkoutModal) {
        closeCheckout();
    }
    if (event.target === thankYouModal) {
        closeThankYou();
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    const thankYouModal = document.getElementById('thankYouModal');
    
    if (event.key === 'Escape') {
        if (cartModal.style.display === 'block') {
            toggleCart();
        } else if (checkoutModal && checkoutModal.style.display === 'block') {
            closeCheckout();
        } else if (thankYouModal && thankYouModal.style.display === 'block') {
            closeThankYou();
        }
    }
});

// Search functionality
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div class="loading">No products found matching your search.</div>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        animateProductCards();
    }
}

// Filter by category
function filterByCategory(category) {
    let filteredProducts = products;
    
    if (category && category !== 'all') {
        filteredProducts = products.filter(product => 
            product.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div class="loading">No products found in this category.</div>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        animateProductCards();
    }
}

// Sort products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order
            break;
    }
    
    productGrid.innerHTML = '';
    sortedProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    animateProductCards();
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateCartDisplay,
        searchProducts,
        filterByCategory,
        sortProducts,
        products
    };
}
