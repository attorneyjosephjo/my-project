// Product data with enhanced demo t-shirts
const products = [
    {
        id: 1,
        name: "Classic White Essential",
        description: "Premium 100% organic cotton tee with perfect fit and ultra-soft feel",
        price: 24.99,
        originalPrice: 29.99,
        color: "#ffffff",
        gradient: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        badge: "Bestseller",
        category: "essentials",
        image: "images/b36155f5-bf23-4cfe-8c0a-e7d4c648c091.png"
    },
    {
        id: 2,
        name: "Midnight Black Premium",
        description: "Luxurious black tee with superior fabric quality and modern cut",
        price: 27.99,
        originalPrice: 32.99,
        color: "#2c3e50",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        badge: "Premium",
        category: "premium",
        image: "images/9b056001-0ce9-470f-9633-3fc9a45ee3fa.png"
    },
    {
        id: 3,
        name: "Ocean Blue Comfort",
        description: "Breathable cotton blend in stunning ocean blue with relaxed fit",
        price: 22.99,
        color: "#3498db",
        gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        category: "comfort"
    },
    {
        id: 4,
        name: "Forest Green Eco",
        description: "Sustainable bamboo-cotton blend tee in earthy forest green",
        price: 29.99,
        color: "#27ae60",
        gradient: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
        badge: "Eco-Friendly",
        category: "eco"
    },
    {
        id: 5,
        name: "Sunset Orange Vintage",
        description: "Retro-inspired tee with vintage wash and comfortable vintage fit",
        price: 26.99,
        color: "#e67e22",
        gradient: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
        badge: "Vintage",
        category: "vintage"
    },
    {
        id: 6,
        name: "Royal Purple Elite",
        description: "Sophisticated purple tee with premium fabric and elegant design",
        price: 31.99,
        color: "#9b59b6",
        gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
        badge: "Elite",
        category: "premium"
    },
    {
        id: 7,
        name: "Crimson Red Bold",
        description: "Eye-catching red tee perfect for making a statement with confidence",
        price: 25.99,
        color: "#e74c3c",
        gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
        category: "bold"
    },
    {
        id: 8,
        name: "Charcoal Gray Modern",
        description: "Contemporary charcoal tee with modern fit and versatile styling",
        price: 23.99,
        color: "#7f8c8d",
        gradient: "linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)",
        category: "modern"
    }
];

// Shopping cart
let cart = [];

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
    initializeAnimations();
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
    }, 1000);
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create badge HTML if product has a badge
    const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    
    // Create price HTML with original price if available
    const priceHtml = product.originalPrice ? 
        `<div class="product-price">
            $${product.price} 
            <span style="text-decoration: line-through; color: #999; font-size: 1rem; margin-left: 8px;">$${product.originalPrice}</span>
        </div>` :
        `<div class="product-price">$${product.price}</div>`;
    
    // Create image content - use actual image if available, otherwise use styled mockup
    const imageContent = product.image ? 
        `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">` :
        `<div class="tshirt-mockup">
            <div class="tshirt-base" style="background: ${product.gradient};">
                <div class="tshirt-display">👕</div>
            </div>
        </div>`;

    card.innerHTML = `
        <div class="product-image" style="background: ${product.gradient};">
            ${badgeHtml}
            ${imageContent}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            ${priceHtml}
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
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
        
        // Show success message
        showNotification('Product added to cart!', 'success');
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Product removed from cart!', 'info');
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                    <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `).join('');
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
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Simulate checkout process
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        alert(`Thank you for your purchase!\n\nOrder Summary:\n${itemCount} items\nTotal: $${total.toFixed(2)}\n\nYour order will be shipped within 2-3 business days.`);
        
        // Clear cart
        cart = [];
        updateCartDisplay();
        toggleCart();
        
        showNotification('Order placed successfully!', 'success');
    }, 2000);
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    showNotification('Sending message...', 'info');
    
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
    }, 1500);
}

// Initialize navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    document.querySelectorAll('.about, .contact, .footer').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Animate product cards
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Show add to cart animation
function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        cartIcon.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
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
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: bold;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
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

// Close cart when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        toggleCart();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Close cart with Escape key
    if (event.key === 'Escape' && cartModal.style.display === 'block') {
        toggleCart();
    }
});

// Lazy loading for better performance
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add search functionality (bonus feature)
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div class="no-results">No products found matching your search.</div>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        animateProductCards();
    }
}

// Add to favorites functionality (bonus feature)
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push(productId);
        showNotification('Added to favorites', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    // This would update favorite button states if we had them in the UI
    // Implementation depends on UI design
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateCartDisplay,
        searchProducts,
        products
    };
}
