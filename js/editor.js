// Product data for different examples
const PRODUCT_DATA = {
    doja: [
        { img: "Documentation/sampleD2C_files/71kGNFQHg9L._SY400_._FMpng_._AC_.png", name: "Vie - Physical Touch Edition (Amazon Exclusive Edition)", price: "$38.98" },
        { img: "Documentation/sampleD2C_files/81UDwonwgSL._SY400_._FMpng_._AC_.png", name: "Vie", price: "$31.49" },
        { img: "Documentation/sampleD2C_files/812ZDOyhKtL._SY400_._FMpng_._AC_.png", name: "Vie", price: "$11.98" },
        { img: "Documentation/sampleD2C_files/7122DmIepYL._SY400_._FMpng_._AC_.png", name: "Official Tracklist T-Shirt", price: "$45.00" },
        { img: "Documentation/sampleD2C_files/61W79hnlVfL._SY400_._FMpng_._AC_.png", name: "Official Rose T-Shirt", price: "$45.00" },
        { img: "Documentation/sampleD2C_files/71xpwGFcFRL._SY400_._FMpng_._AC_.png", name: "Official Leopard Hoodie", price: "$80.00" },
        { img: "Documentation/sampleD2C_files/71YpbWrIdpL._SY400_._FMpng_._AC_.png", name: "Official Red Vie Cap", price: "$45.00" },
        { img: "Documentation/sampleD2C_files/71Tfk-x40lL._SY400_._FMpng_._AC_.png", name: "Official Vie Satin Scarf", price: "$15.00" }
    ],
    generic: [
        { img: "hat.png", name: "Hat", price: "$25" },
        { img: "hoodie.png", name: "Hoodie", price: "$80" },
        { img: "t-shirt.png", name: "T-shirt", price: "$50" },
        { img: "tote bag.png", name: "Tote bag", price: "$35" },
        { img: "vinyl record.png", name: "Vinyl", price: "$40" },
        { img: "hat.png", name: "Hat", price: "$25" },
        { img: "hoodie.png", name: "Hoodie", price: "$80" },
        { img: "t-shirt.png", name: "T-shirt", price: "$50" }
    ]
};

class D2CEditor {
    constructor() {
        this.preview = document.getElementById('store-preview');
        this.productsContainer = document.getElementById('products');
        this.modal = document.getElementById('code-modal');
        
        this.initializeEventListeners();
        this.initCollectionTabs();
        this.switchPage(); // Load initial page
        this.applyStyles();
    }

    initializeOverrides() {
        // Set initial color values to match template
        const primaryColor = document.getElementById('primary-color').value;
        const accentColor = document.getElementById('accent-color').value;

        document.getElementById('override-product-title-color').value = primaryColor;
        document.getElementById('override-price-color').value = accentColor;
        document.getElementById('override-footer-color').value = primaryColor;
        document.getElementById('override-collection-color').value = accentColor;
        document.getElementById('override-button-text-color').value = primaryColor;

        // Mark as using template defaults
        document.getElementById('override-product-title-color').dataset.useDefault = 'true';
        document.getElementById('override-price-color').dataset.useDefault = 'true';
        document.getElementById('override-footer-color').dataset.useDefault = 'true';
        document.getElementById('override-collection-color').dataset.useDefault = 'true';
    }

    initializeEventListeners() {
        console.log('Initializing event listeners...');
        
        // Check if elements exist
        const pageTypeEl = document.getElementById('page-type');
        const exampleTypeEl = document.getElementById('example-type');
        console.log('page-type element:', pageTypeEl);
        console.log('example-type element:', exampleTypeEl);
        
        // Page type change
        if (pageTypeEl) {
            pageTypeEl.addEventListener('change', () => {
                console.log('Page type changed');
                this.switchPage();
            });
        }

        // Example type change
        if (exampleTypeEl) {
            exampleTypeEl.addEventListener('change', () => {
                console.log('Example type changed');
                this.toggleGenericControls();
                this.switchPage();
            });
        }

        // Generic image controls
        this.toggleGenericControls();
        
        const bannerUrlEl = document.getElementById('banner-url');
        const logoUrlEl = document.getElementById('logo-url');
        
        if (bannerUrlEl) {
            bannerUrlEl.addEventListener('input', () => {
                this.switchPage();
            });
        }
        
        if (logoUrlEl) {
            logoUrlEl.addEventListener('input', () => {
                this.switchPage();
            });
        }
        
        document.getElementById('clear-banner').addEventListener('click', () => {
            document.getElementById('banner-url').value = '';
            this.switchPage();
        });
        
        document.getElementById('clear-logo').addEventListener('click', () => {
            document.getElementById('logo-url').value = '';
            this.switchPage();
        });

        // Refresh preview button
        document.getElementById('refresh-preview').addEventListener('click', () => {
            this.switchPage();
        });

        // Font family change
        document.getElementById('font-family').addEventListener('change', () => {
            this.applyStyles();
        });

        // Color controls
        document.getElementById('primary-color').addEventListener('change', () => {
            document.getElementById('primary-color-hex').value = document.getElementById('primary-color').value;
            this.applyStyles();
        });

        document.getElementById('primary-color-hex').addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('primary-color').value = e.target.value;
                this.applyStyles();
            }
        });

        document.getElementById('secondary-color').addEventListener('change', () => {
            document.getElementById('secondary-color-hex').value = document.getElementById('secondary-color').value;
            this.applyStyles();
        });

        document.getElementById('secondary-color-hex').addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('secondary-color').value = e.target.value;
                this.applyStyles();
            }
        });

        document.getElementById('accent-color').addEventListener('change', () => {
            document.getElementById('accent-color-hex').value = document.getElementById('accent-color').value;
            this.applyStyles();
        });

        document.getElementById('accent-color-hex').addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('accent-color').value = e.target.value;
                this.applyStyles();
            }
        });

        document.getElementById('button-bg-color').addEventListener('change', () => {
            document.getElementById('button-bg-color-hex').value = document.getElementById('button-bg-color').value;
            this.applyStyles();
        });

        document.getElementById('button-bg-color-hex').addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('button-bg-color').value = e.target.value;
                this.applyStyles();
            }
        });

        // Background color change
        document.getElementById('bg-color').addEventListener('change', () => {
            document.getElementById('bg-color-hex').value = document.getElementById('bg-color').value;
            this.applyStyles();
        });

        document.getElementById('bg-color-hex').addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('bg-color').value = e.target.value;
                this.applyStyles();
            }
        });

        // Cart color change
        document.getElementById('cart-color').addEventListener('change', () => {
            document.getElementById('cart-color-hex').value = document.getElementById('cart-color').value;
            this.applyStyles();
        });

        document.getElementById('cart-color-hex').addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('cart-color').value = e.target.value;
                this.applyStyles();
            }
        });

        // Layout change
        document.getElementById('layout').addEventListener('change', (e) => {
            console.log('Layout changed to:', e.target.value);
            setTimeout(() => {
                const layout = e.target.value;
                const columns = layout === '3-column' ? 3 : 4;
                
                const grids = document.querySelectorAll('#store-preview .products-grid');
                console.log('Updating', grids.length, 'grids to', columns, 'columns');
                
                grids.forEach((grid, i) => {
                    grid.style.setProperty('grid-template-columns', `repeat(${columns}, 1fr)`, 'important');
                });
            }, 100);
        });

        // Section headers toggle
        document.getElementById('show-section-headers').addEventListener('change', (e) => {
            const show = e.target.value === 'show';
            const headers = document.querySelectorAll('#store-preview .section-heading');
            
            headers.forEach(header => {
                header.style.display = show ? 'block' : 'none';
            });
        });

        // Accessibility message toggle
        document.getElementById('show-accessibility').addEventListener('change', (e) => {
            const show = e.target.value === 'show';
            const accessibilityEl = document.querySelector('.accessibility-support');
            if (accessibilityEl) {
                accessibilityEl.style.display = show ? 'block' : 'none';
            }
        });

        // Product title controls
        document.getElementById('title-font-size').addEventListener('change', () => {
            this.applyStyles();
        });

        // Price controls
        document.getElementById('price-font-size').addEventListener('change', () => {
            this.applyStyles();
        });

        // Footer controls
        document.getElementById('footer-font-size').addEventListener('change', () => {
            this.applyStyles();
        });



        // Generate code button
        document.getElementById('generate-code').addEventListener('click', () => {
            this.generateCode();
        });

        // Save/Load configuration buttons
        document.getElementById('save-config').addEventListener('click', () => {
            this.saveConfiguration();
        });

        document.getElementById('load-config').addEventListener('click', () => {
            this.loadConfiguration();
        });

        // Toggle overrides section
        document.getElementById('toggle-overrides').addEventListener('click', () => {
            this.toggleOverrides();
        });

        // Reset overrides button
        document.getElementById('reset-overrides').addEventListener('click', () => {
            this.resetOverrides();
        });

        // Override controls
        const overrideControls = [
            'override-product-title-font', 'override-product-title-size', 'override-product-title-color',
            'override-price-font', 'override-price-size', 'override-price-color',
            'override-footer-font', 'override-footer-size', 'override-footer-color',
            'override-collection-font', 'override-collection-size', 'override-collection-color',
            'override-button-text-color'
        ];

        overrideControls.forEach(id => {
            const element = document.getElementById(id);
            element.addEventListener('change', () => {
                // Clear useDefault flag when user manually changes color
                if (element.type === 'color') {
                    element.dataset.useDefault = 'false';
                }
                this.applyStyles();
            });
        });

        // Initialize color overrides to template defaults
        this.initializeOverrides();

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }

    applyStyles() {
        const fontFamily = document.getElementById('font-family').value;
        const primaryColor = document.getElementById('primary-color').value;
        const secondaryColor = document.getElementById('secondary-color').value;
        const accentColor = document.getElementById('accent-color').value;
        const buttonBgColor = document.getElementById('button-bg-color').value;
        const bgColor = document.getElementById('bg-color').value;
        const cartColor = document.getElementById('cart-color').value;
        const titleFontSize = document.getElementById('title-font-size').value;
        const priceFontSize = document.getElementById('price-font-size').value;
        const footerFontSize = document.getElementById('footer-font-size').value;

        // Apply base styles
        this.preview.style.fontFamily = fontFamily;
        this.preview.style.backgroundColor = bgColor;

        // Apply header background color
        const header = this.preview.querySelector('.store-navbar');
        if (header) {
            header.style.backgroundColor = bgColor;
        }

        // Apply cart icon color
        const cartIcon = this.preview.querySelector('.cart-button svg path');
        if (cartIcon) {
            cartIcon.style.fill = cartColor;
        }

        // Apply PRIMARY COLOR (main text)
        // Product titles
        const productNames = this.preview.querySelectorAll('.product-name, .pdp-title');
        productNames.forEach(name => {
            name.style.fontSize = this.getOverrideValue('override-product-title-size', titleFontSize);
            name.style.color = this.getOverrideValue('override-product-title-color', primaryColor);
            name.style.fontFamily = this.getOverrideValue('override-product-title-font', fontFamily);
        });

        // Footer text
        const footerLinks = this.preview.querySelectorAll('.footer-nav a, .footer-nav-right a, .accessibility-support, .accessibility-support a');
        footerLinks.forEach(link => {
            link.style.fontSize = this.getOverrideValue('override-footer-size', footerFontSize);
            link.style.color = this.getOverrideValue('override-footer-color', primaryColor);
            link.style.fontFamily = this.getOverrideValue('override-footer-font', fontFamily);
        });

        // PDP elements with primary color
        const pdpPrimaryElements = this.preview.querySelectorAll('.pdp-shipping, .pdp-availability, .pdp-return, .pdp-details, .pdp-label');
        pdpPrimaryElements.forEach(element => {
            element.style.color = primaryColor;
        });

        // Cart elements with primary color
        const cartPrimaryElements = this.preview.querySelectorAll('.cart-title, .cart-descriptor-title, .cart-descriptor-quantity, .cart-descriptor-subtotal, .cart-item-title, .cart-item-variation, .cart-subtotal-label');
        cartPrimaryElements.forEach(element => {
            element.style.color = primaryColor;
        });

        // Apply SECONDARY COLOR (links and subtexts)
        const pdpDelivery = this.preview.querySelectorAll('.pdp-delivery');
        pdpDelivery.forEach(element => {
            element.style.color = secondaryColor;
        });

        // Cart secondary elements
        const cartSecondaryElements = this.preview.querySelectorAll('.cart-delivery-message, .cart-taxes-message');
        cartSecondaryElements.forEach(element => {
            element.style.color = secondaryColor;
        });

        // Return home link
        const returnHomeLink = this.preview.querySelector('.return-home-link');
        if (returnHomeLink) {
            returnHomeLink.style.color = secondaryColor;
        }

        // Apply ACCENT COLOR (prices and highlights)
        // Prices on main page
        const productPrices = this.preview.querySelectorAll('.product-price');
        productPrices.forEach(price => {
            price.style.fontSize = this.getOverrideValue('override-price-size', priceFontSize);
            price.style.color = this.getOverrideValue('override-price-color', accentColor);
            price.style.fontFamily = this.getOverrideValue('override-price-font', fontFamily);
        });

        // PDP price
        const pdpPrice = this.preview.querySelectorAll('.pdp-price');
        pdpPrice.forEach(price => {
            price.style.color = this.getOverrideValue('override-price-color', accentColor);
            price.style.fontFamily = this.getOverrideValue('override-price-font', fontFamily);
        });

        // Cart prices
        const cartPrices = this.preview.querySelectorAll('.cart-item-price, .cart-item-total, .cart-subtotal-amount');
        cartPrices.forEach(price => {
            price.style.color = this.getOverrideValue('override-price-color', accentColor);
            price.style.fontFamily = this.getOverrideValue('override-price-font', fontFamily);
        });

        // Section headings
        const sectionHeadings = this.preview.querySelectorAll('.section-heading');
        sectionHeadings.forEach(heading => {
            heading.style.color = this.getOverrideValue('override-collection-color', accentColor);
            heading.style.fontFamily = this.getOverrideValue('override-collection-font', fontFamily);
            heading.style.fontSize = this.getOverrideValue('override-collection-size', '36pt');
        });

        // Apply BUTTON STYLES
        const buttons = this.preview.querySelectorAll('.pdp-size-btn, .pdp-color-btn, .pdp-add-to-cart, .pdp-qty-btn, .cart-qty-btn, .cart-remove-btn, .cart-checkout-btn');
        buttons.forEach(button => {
            button.style.backgroundColor = buttonBgColor;
            button.style.color = this.getOverrideValue('override-button-text-color', primaryColor);
            button.style.fontFamily = fontFamily;
            button.style.border = `1px solid ${primaryColor}`;
        });

        // Fix quantity section styling
        const quantityContainer = this.preview.querySelector('.pdp-quantity');
        if (quantityContainer) {
            quantityContainer.style.backgroundColor = buttonBgColor;
            quantityContainer.style.borderColor = primaryColor;
        }

        const quantityInput = this.preview.querySelector('.pdp-quantity input');
        if (quantityInput) {
            quantityInput.style.color = primaryColor;
            quantityInput.style.fontFamily = fontFamily;
            quantityInput.style.webkitAppearance = 'none';
            quantityInput.style.mozAppearance = 'textfield';
        }

        const quantityButtons = this.preview.querySelectorAll('.pdp-qty-btn');
        quantityButtons.forEach(button => {
            button.style.border = 'none';
            button.style.backgroundColor = 'transparent';
        });

        // Fix cart quantity styling
        const cartQuantityContainer = this.preview.querySelector('.cart-quantity-selector');
        if (cartQuantityContainer) {
            cartQuantityContainer.style.backgroundColor = buttonBgColor;
            cartQuantityContainer.style.borderColor = primaryColor;
        }

        const cartQuantityInput = this.preview.querySelector('.cart-quantity-selector input');
        if (cartQuantityInput) {
            cartQuantityInput.style.color = primaryColor;
            cartQuantityInput.style.fontFamily = fontFamily;
        }

        const cartQuantityButtons = this.preview.querySelectorAll('.cart-qty-btn');
        cartQuantityButtons.forEach(button => {
            button.style.border = 'none';
            button.style.backgroundColor = 'transparent';
            button.style.color = primaryColor;
        });

        // Selected buttons use accent color
        const selectedButtons = this.preview.querySelectorAll('.pdp-size-btn.active, .pdp-color-btn.active');
        selectedButtons.forEach(button => {
            button.style.color = accentColor;
            button.style.borderColor = accentColor;
        });

        // Apply layout
        this.applyLayout();
    }

    applyLayout() {
        try {
            console.log('=== applyLayout START ===');
            const layoutSelect = document.getElementById('layout');
            console.log('Layout select element:', layoutSelect);
            
            if (!layoutSelect) {
                console.log('Layout select not found!');
                return;
            }
            
            const layout = layoutSelect.value;
            console.log('Layout value:', layout);
            
            const columns = layout === '3-column' ? 3 : 4;
            console.log('Columns to apply:', columns);
            
            const allProductsGrids = this.preview.querySelectorAll('.products-grid');
            console.log('Found grids:', allProductsGrids.length);
            
            allProductsGrids.forEach((grid, index) => {
                console.log('Processing grid', index);
                grid.style.setProperty('grid-template-columns', `repeat(${columns}, 1fr)`, 'important');
                console.log('Grid', index, 'updated to', columns, 'columns');
            });
            
            console.log('=== applyLayout END ===');
        } catch (error) {
            console.error('Error in applyLayout:', error);
        }
    }

    toggleOverrides() {
        const section = document.getElementById('overrides-section');
        const button = document.getElementById('toggle-overrides');
        
        if (section.style.display === 'none') {
            section.style.display = 'block';
            button.textContent = '▼ Advanced Overrides';
        } else {
            section.style.display = 'none';
            button.textContent = '▶ Advanced Overrides';
        }
    }

    resetOverrides() {
        // Get current template values
        const primaryColor = document.getElementById('primary-color').value;
        const accentColor = document.getElementById('accent-color').value;

        // Reset dropdowns to "Use Template Default"
        const dropdowns = [
            'override-product-title-font', 'override-product-title-size',
            'override-price-font', 'override-price-size',
            'override-footer-font', 'override-footer-size',
            'override-collection-font', 'override-collection-size'
        ];
        
        dropdowns.forEach(id => {
            document.getElementById(id).selectedIndex = 0;
        });

        // Reset color inputs to template values
        document.getElementById('override-product-title-color').value = primaryColor;
        document.getElementById('override-price-color').value = accentColor;
        document.getElementById('override-footer-color').value = primaryColor;
        document.getElementById('override-collection-color').value = accentColor;
        document.getElementById('override-button-text-color').value = primaryColor;

        // Mark colors as using template defaults
        document.getElementById('override-product-title-color').dataset.useDefault = 'true';
        document.getElementById('override-price-color').dataset.useDefault = 'true';
        document.getElementById('override-footer-color').dataset.useDefault = 'true';
        document.getElementById('override-collection-color').dataset.useDefault = 'true';
        document.getElementById('override-button-text-color').dataset.useDefault = 'true';

        this.applyStyles();
    }

    getOverrideValue(id, defaultValue) {
        const element = document.getElementById(id);
        if (!element) return defaultValue;
        
        if (element.type === 'color') {
            return element.dataset.useDefault === 'true' ? defaultValue : element.value;
        } else {
            return element.value && element.value !== '' ? element.value : defaultValue;
        }
    }

    generateHeaderAssets() {
        const exampleTypeEl = document.getElementById('example-type');
        const exampleType = exampleTypeEl ? exampleTypeEl.value : 'doja';
        
        if (exampleType === 'generic') {
            const bannerUrl = document.getElementById('banner-url')?.value;
            const logoUrl = document.getElementById('logo-url')?.value;
            
            return {
                logo: logoUrl || 'bandlogo.png',
                banner: bannerUrl || 'generic_banner.png'
            };
        } else {
            return {
                logo: 'Documentation/sampleD2C_files/Doja-Logo-500x300px.png',
                banner: 'Documentation/sampleD2C_files/Doja-Banner-3000x600px.png'
            };
        }
    }

    getCopyrightText() {
        const exampleTypeEl = document.getElementById('example-type');
        const exampleType = exampleTypeEl ? exampleTypeEl.value : 'doja';
        
        if (exampleType === 'generic') {
            return 'Music Artist ©2025';
        } else {
            return 'Doja Cat ©2025';
        }
    }

    toggleGenericControls() {
        const exampleTypeEl = document.getElementById('example-type');
        const exampleType = exampleTypeEl ? exampleTypeEl.value : 'doja';
        const genericControls = document.getElementById('generic-image-controls');
        
        if (genericControls) {
            genericControls.style.display = exampleType === 'generic' ? 'block' : 'none';
        }
    }

    generateCartItemHTML() {
        const exampleTypeEl = document.getElementById('example-type');
        const exampleType = exampleTypeEl ? exampleTypeEl.value : 'doja';
        
        if (exampleType === 'generic') {
            return {
                image: 't-shirt.png',
                title: 'T-shirt',
                price: '$50',
                total: '$50'
            };
        } else {
            return {
                image: 'Documentation/sampleD2C_files/7122DmIepYL._SY400_._FMpng_._AC_.png',
                title: 'Official Tracklist T-Shirt',
                price: '$45.00',
                total: '$45.00'
            };
        }
    }

    generateProductDetailsHTML() {
        const exampleTypeEl = document.getElementById('example-type');
        const exampleType = exampleTypeEl ? exampleTypeEl.value : 'doja';
        
        if (exampleType === 'generic') {
            return {
                mainImage: 't-shirt.png',
                thumbnails: ['t-shirt.png', 't-shirt.png', 't-shirt.png'],
                title: 'T-shirt',
                price: '$50',
                details: [
                    'High-quality cotton t-shirt',
                    'Comfortable fit for everyday wear',
                    'Available in multiple sizes',
                    'Machine washable'
                ]
            };
        } else {
            return {
                mainImage: 'Documentation/samplePDP_files/7122DmIepYL._SY800_._FMpng_._AC_.png',
                thumbnails: [
                    'Documentation/samplePDP_files/7122DmIepYL._SY400_._FMpng_._AC_.png',
                    'Documentation/samplePDP_files/71CtWz2S8KL._SY400_._FMpng_._AC_.png',
                    'Documentation/samplePDP_files/719h-s-7vLL._SY400_._FMpng_._AC_.png'
                ],
                title: 'Official Tracklist T-Shirt',
                price: '$45.00',
                details: [
                    'Official merchandise from Doja Cat\'s Vie collection',
                    'Front - White short sleeve t-shirt with photo realistic graphic of Doja Cat on center front',
                    'Back - Rose graphic featuring the full tracklist of Doja Cat\'s album',
                    'Fit Type - Standard fit',
                    'Garment Type - Heavyweight garment dyed t-shirt, 100% cotton'
                ]
            };
        }
    }

    generateProductsHTML() {
        const exampleTypeEl = document.getElementById('example-type');
        const exampleType = exampleTypeEl ? exampleTypeEl.value : 'doja';
        const products = PRODUCT_DATA[exampleType];
        
        return products.map(product => `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price}</span>
                </div>
            </div>
        `).join('');
    }

    switchPage() {
        const pageTypeEl = document.getElementById('page-type');
        const pageType = pageTypeEl ? pageTypeEl.value : 'home';
        console.log('Switching to page type:', pageType);
        
        if (pageType === 'home') {
            console.log('Loading home page');
            this.loadHomePage();
        } else if (pageType === 'product') {
            console.log('Loading product page');
            this.loadProductPage();
        } else if (pageType === 'cart') {
            console.log('Loading cart page');
            this.loadCartPage();
        }
        
        this.addReturnHomeLink();
        this.addSectionHeadings();
        this.applyStyles();
        
        // Force layout application after everything is loaded
        setTimeout(() => {
            console.log('Applying layout after page load');
            try {
                const layoutSelect = document.getElementById('layout');
                const layout = layoutSelect ? layoutSelect.value : '4-column';
                const columns = layout === '3-column' ? 3 : 4;
                
                console.log('Direct layout application:', layout, columns);
                
                const grids = document.querySelectorAll('#store-preview .products-grid');
                console.log('Found grids:', grids.length);
                
                grids.forEach((grid, i) => {
                    console.log('Setting grid', i, 'to', columns, 'columns');
                    grid.style.setProperty('grid-template-columns', `repeat(${columns}, 1fr)`, 'important');
                });
            } catch (error) {
                console.error('Layout application error:', error);
            }
        }, 500);
    }

    addSectionHeadings() {
        const pageType = document.getElementById('page-type').value;
        if (pageType === 'home') {
            const productsGrid = this.preview.querySelector('.products-grid');
            if (productsGrid && !productsGrid.previousElementSibling?.classList.contains('section-heading')) {
                // Add Collection 1 heading before first products grid
                const heading1 = document.createElement('h2');
                heading1.className = 'section-heading';
                heading1.textContent = 'Collection 1';
                productsGrid.parentNode.insertBefore(heading1, productsGrid);

                // Split products into two collections and add Collection 2 heading
                const products = Array.from(productsGrid.querySelectorAll('.product'));
                if (products.length > 4) {
                    const secondGrid = document.createElement('div');
                    secondGrid.className = 'products-grid';
                    
                    const heading2 = document.createElement('h2');
                    heading2.className = 'section-heading';
                    heading2.textContent = 'Collection 2';
                    
                    // Move last 4 products to second grid
                    products.slice(4).forEach(product => {
                        secondGrid.appendChild(product);
                    });
                    
                    productsGrid.parentNode.insertBefore(heading2, productsGrid.nextSibling);
                    productsGrid.parentNode.insertBefore(secondGrid, heading2.nextSibling);
                }
            }
        }
    }

    addReturnHomeLink() {
        const navbar = this.preview.querySelector('.store-navbar');
        if (navbar && !navbar.querySelector('.return-home-link')) {
            const returnLink = document.createElement('a');
            returnLink.href = '#';
            returnLink.className = 'return-home-link';
            returnLink.textContent = 'Return to homepage';
            navbar.insertBefore(returnLink, navbar.firstChild);
        }
    }

    loadHomePage() {
        const headerAssets = this.generateHeaderAssets();
        const copyrightText = this.getCopyrightText();
        
        this.preview.innerHTML = `
            <header class="store-navbar">
                <div class="navbar-logo">
                    <img src="${headerAssets.logo}" alt="Logo">
                </div>
                <div class="navbar-banner">
                    <img src="${headerAssets.banner}" alt="Banner">
                </div>
                <div class="navbar-cart">
                    <button class="cart-button">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"/>
                        </svg>
                        <span class="cart-badge">1</span>
                    </button>
                </div>
            </header>
            
            <div class="products-grid" id="products">
                ${this.generateProductsHTML()}
            </div>
            
            <footer class="store-footer">
                <div class="footer-content">
                    <div class="footer-top-section">
                        <nav class="footer-nav">
                            <a href="#">${copyrightText}</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">FAQs</a>
                        </nav>
                        <nav class="footer-nav-right">
                            <a href="#">Instagram</a>
                            <a href="#">TikTok</a>
                            <a href="#">Twitter</a>
                            <a href="#">Facebook</a>
                        </nav>
                    </div>
                    <div class="accessibility-support">
                        If you are using a screen reader and having problems reading this website, get accessibility support from&nbsp;<a href="#">Amazon Accessibility</a>
                    </div>
                </div>
            </footer>
        `;
        
        this.productsContainer = document.getElementById('products');
    }

    loadProductPage() {
        const productDetails = this.generateProductDetailsHTML();
        const headerAssets = this.generateHeaderAssets();
        const copyrightText = this.getCopyrightText();
        
        this.preview.innerHTML = `
            <header class="store-navbar">
                <div class="navbar-logo">
                    <img src="${headerAssets.logo}" alt="Logo">
                </div>
                <div class="navbar-banner">
                    <img src="${headerAssets.banner}" alt="Banner">
                </div>
                <div class="navbar-cart">
                    <button class="cart-button">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"/>
                        </svg>
                        <span class="cart-badge">1</span>
                    </button>
                </div>
            </header>
            
            <div class="pdp-container">
                <div class="pdp-image-section">
                    <div class="pdp-thumbnails">
                        ${productDetails.thumbnails.map(thumb => `<img src="${thumb}" alt="Thumbnail">`).join('')}
                    </div>
                    <div class="pdp-main-image">
                        <img src="${productDetails.mainImage}" alt="${productDetails.title}">
                    </div>
                </div>
                
                <div class="pdp-info-section">
                    <h1 class="pdp-title">${productDetails.title}</h1>
                    <div class="pdp-price">${productDetails.price}</div>
                    <div class="pdp-shipping">Shipped and sold by Amazon.com</div>
                    <div class="pdp-delivery">FREE delivery Wed, Oct 22</div>
                    
                    <div class="pdp-details">
                        <ul>
                            ${productDetails.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="pdp-availability">In Stock</div>
                    <div class="pdp-return">FREE 30-day refund/replacement</div>
                    
                    <div class="pdp-size-section">
                        <div class="pdp-label">Size:</div>
                        <div class="pdp-size-buttons">
                            <button class="pdp-size-btn active">Small</button>
                            <button class="pdp-size-btn">Medium</button>
                            <button class="pdp-size-btn">Large</button>
                            <button class="pdp-size-btn">X-Large</button>
                            <button class="pdp-size-btn">XX-Large</button>
                            <button class="pdp-size-btn">3X-Large</button>
                        </div>
                    </div>
                    
                    <div class="pdp-color-section">
                        <div class="pdp-label">Color:</div>
                        <div class="pdp-color-buttons">
                            <button class="pdp-color-btn active">White</button>
                        </div>
                    </div>
                    
                    <div class="pdp-quantity">
                        <button class="pdp-qty-btn">-</button>
                        <input type="number" value="1" min="1">
                        <button class="pdp-qty-btn">+</button>
                    </div>
                    
                    <button class="pdp-add-to-cart">Add To Cart</button>
                </div>
            </div>
            
            <footer class="store-footer">
                <div class="footer-content">
                    <div class="footer-top-section">
                        <nav class="footer-nav">
                            <a href="#">${copyrightText}</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">FAQs</a>
                        </nav>
                        <nav class="footer-nav-right">
                            <a href="#">Instagram</a>
                            <a href="#">TikTok</a>
                            <a href="#">Twitter</a>
                            <a href="#">Facebook</a>
                        </nav>
                    </div>
                    <div class="accessibility-support">
                        If you are using a screen reader and having problems reading this website, get accessibility support from&nbsp;<a href="#">Amazon Accessibility</a>
                    </div>
                </div>
            </footer>
        `;
        
        this.productsContainer = null;
    }

    applyLayout() {
        const layout = document.getElementById('layout').value;
        
        // Apply layout to all products grids
        const allProductsGrids = this.preview.querySelectorAll('.products-grid');
        allProductsGrids.forEach(grid => {
            // Remove existing layout classes
            grid.classList.remove('3-column', '4-column');
            
            // Add new layout class
            grid.classList.add(layout);
        });
    }

    generateCode() {
        const fontFamily = document.getElementById('font-family').value;
        const primaryColor = document.getElementById('primary-color').value;
        const secondaryColor = document.getElementById('secondary-color').value;
        const accentColor = document.getElementById('accent-color').value;
        const buttonBgColor = document.getElementById('button-bg-color').value;
        const bgColor = document.getElementById('bg-color').value;
        const layout = document.getElementById('layout').value;
        const titleFontSize = document.getElementById('title-font-size').value;
        const priceFontSize = document.getElementById('price-font-size').value;
        const footerFontSize = document.getElementById('footer-font-size').value;

        // Generate HTML
        const html = this.generateHTML();
        
        // Generate CSS
        const css = this.generateCSS(fontFamily, primaryColor, secondaryColor, accentColor, buttonBgColor, bgColor, layout, titleFontSize, priceFontSize, footerFontSize);

        // Display in modal
        document.getElementById('generated-html').value = html;
        document.getElementById('generated-css').value = css;
        this.modal.style.display = 'block';
    }

    generateHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D2C Store</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="store-container">
        <header class="store-navbar">
            <div class="navbar-logo">
                <img src="logo.png" alt="Logo">
            </div>
            <div class="navbar-banner">
                <img src="banner.png" alt="Banner">
            </div>
            <div class="navbar-cart">
                <button class="cart-button">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"/>
                    </svg>
                    <span class="cart-badge">1</span>
                </button>
            </div>
        </header>
        
        <div class="products-grid">
            <div class="product">
                <img src="album1.jpg" alt="Album">
                <div class="product-info">
                    <span class="product-name">Vie - Physical Touch Edition (Amazon Exclusive Edition)</span>
                    <span class="product-price">$38.98</span>
                </div>
            </div>
            
            <div class="product">
                <img src="album2.jpg" alt="Album">
                <div class="product-info">
                    <span class="product-name">Vie</span>
                    <span class="product-price">$31.49</span>
                </div>
            </div>
            
            <div class="product">
                <img src="tshirt1.jpg" alt="T-Shirt">
                <div class="product-info">
                    <span class="product-name">Official Tracklist T-Shirt</span>
                    <span class="product-price">$45.00</span>
                </div>
            </div>
            
            <div class="product">
                <img src="hoodie1.jpg" alt="Hoodie">
                <div class="product-info">
                    <span class="product-name">Official Leopard Hoodie</span>
                    <span class="product-price">$80.00</span>
                </div>
            </div>
            
            <div class="product">
                <img src="cap1.jpg" alt="Cap">
                <div class="product-info">
                    <span class="product-name">Official Red Vie Cap</span>
                    <span class="product-price">$45.00</span>
                </div>
            </div>
            
            <div class="product">
                <img src="accessory1.jpg" alt="Accessory">
                <div class="product-info">
                    <span class="product-name">Official Vie Satin Scarf</span>
                    <span class="product-price">$15.00</span>
                </div>
            </div>
        </div>
        
        <footer class="store-footer">
            <div class="footer-content">
                <nav class="footer-nav">
                    <a href="#">Artist ©2025</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">FAQs</a>
                </nav>
                <nav class="footer-social">
                    <a href="#">Instagram</a>
                    <a href="#">TikTok</a>
                    <a href="#">Twitter</a>
                    <a href="#">Facebook</a>
                </nav>
            </div>
        </footer>
    </div>
</body>
</html>`;
    }

    generateCSS(fontFamily, primaryColor, secondaryColor, accentColor, buttonBgColor, bgColor, layout, titleFontSize, priceFontSize, footerFontSize) {
        let layoutCSS = '';
        
        switch(layout) {
            case '3-column':
                layoutCSS = `
.products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 2rem;
}`;
                break;
            case '4-column':
                layoutCSS = `
.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding: 2rem;
}`;
                break;
        }

        return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: ${fontFamily};
    background-color: ${bgColor};
}

.store-container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Store Navbar */
.store-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: ${bgColor};
    color: white;
}

.navbar-logo img, .navbar-banner img {
    height: 60px;
}

.cart-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    position: relative;
    padding: 0.5rem;
}

.cart-button svg {
    fill: currentColor;
}

.cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #ff4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
${layoutCSS}

.product {
    text-align: center;
    transition: transform 0.2s;
}

.product:hover {
    transform: translateY(-2px);
}

.product img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.product-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* PRIMARY COLOR - Product titles and main text */
.product-name, .pdp-title {
    font-size: ${titleFontSize};
    font-weight: 500;
    line-height: 1.3;
    color: ${primaryColor};
}

.pdp-shipping, .pdp-availability, .pdp-return, .pdp-details, .pdp-label {
    color: ${primaryColor};
}

/* SECONDARY COLOR - Links and subtexts */
.pdp-delivery {
    color: ${secondaryColor};
}

/* ACCENT COLOR - Prices and highlights */
.product-price, .pdp-price {
    font-size: ${priceFontSize};
    font-weight: bold;
    color: ${accentColor};
}

/* Store Footer */
.store-footer {
    padding: 2rem;
    margin-top: 2rem;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
}

.footer-top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.footer-nav, .footer-nav-right {
    display: flex;
    gap: 1.5rem;
}

.footer-nav a, .footer-nav-right a {
    color: ${primaryColor};
    text-decoration: none;
    font-size: ${footerFontSize};
}

.footer-nav a:hover, .footer-nav-right a:hover {
    color: ${accentColor};
}

.accessibility-support {
    font-size: ${footerFontSize};
    color: ${primaryColor};
    text-align: center;
}

.accessibility-support a {
    color: ${primaryColor};
    text-decoration: none;
}

.accessibility-support a:hover {
    color: ${accentColor};
}

/* Button Styles */
.pdp-size-btn, .pdp-color-btn, .pdp-add-to-cart, .pdp-qty-btn {
    background-color: ${buttonBgColor};
    color: ${primaryColor};
    font-family: ${fontFamily};
    border: 1px solid ${primaryColor};
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
}

/* Quantity Section */
.pdp-quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${primaryColor};
    background-color: ${buttonBgColor};
    width: 8.2rem;
    border-radius: 20px;
    height: 2rem;
    margin: 1rem 0;
}

.pdp-qty-btn {
    width: 2rem;
    height: 2rem;
    border: none !important;
    background: transparent !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${primaryColor};
}

.pdp-quantity input {
    width: 2.5rem;
    height: 2rem;
    text-align: center;
    border: none;
    background: transparent;
    color: ${primaryColor};
    font-family: ${fontFamily};
    -webkit-appearance: none;
    -moz-appearance: textfield;
}

.pdp-quantity input::-webkit-outer-spin-button,
.pdp-quantity input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.pdp-size-btn.active, .pdp-color-btn.active {
    color: ${accentColor};
    border-color: ${accentColor};
}

.pdp-size-btn:hover, .pdp-color-btn:hover, .pdp-add-to-cart:hover, .pdp-qty-btn:hover {
    background-color: ${accentColor};
    color: white;
}`;
    }
}

D2CEditor.prototype.saveConfiguration = function() {
    const config = {
        pageType: document.getElementById('page-type').value,
        exampleType: document.getElementById('example-type').value,
        bannerUrl: document.getElementById('banner-url')?.value || '',
        logoUrl: document.getElementById('logo-url')?.value || '',
        fontFamily: document.getElementById('font-family').value,
        primaryColor: document.getElementById('primary-color').value,
        secondaryColor: document.getElementById('secondary-color').value,
        accentColor: document.getElementById('accent-color').value,
        buttonBgColor: document.getElementById('button-bg-color').value,
        bgColor: document.getElementById('bg-color').value,
        cartColor: document.getElementById('cart-color').value,
        layout: document.getElementById('layout').value,
        showSectionHeaders: document.getElementById('show-section-headers').value,
        showAccessibility: document.getElementById('show-accessibility').value,
        titleFontSize: document.getElementById('title-font-size').value,
        priceFontSize: document.getElementById('price-font-size').value,
        footerFontSize: document.getElementById('footer-font-size').value,
        overrides: {
            productTitleFont: document.getElementById('override-product-title-font').value,
            productTitleSize: document.getElementById('override-product-title-size').value,
            productTitleColor: document.getElementById('override-product-title-color').value,
            priceFont: document.getElementById('override-price-font').value,
            priceSize: document.getElementById('override-price-size').value,
            priceColor: document.getElementById('override-price-color').value,
            footerFont: document.getElementById('override-footer-font').value,
            footerSize: document.getElementById('override-footer-size').value,
            footerColor: document.getElementById('override-footer-color').value,
            collectionFont: document.getElementById('override-collection-font').value,
            collectionSize: document.getElementById('override-collection-size').value,
            collectionColor: document.getElementById('override-collection-color').value,
            buttonTextColor: document.getElementById('override-button-text-color').value
        }
    };
    
    localStorage.setItem('d2c-editor-config', JSON.stringify(config));
    alert('Configuration saved!');
};

D2CEditor.prototype.loadConfiguration = function() {
    const saved = localStorage.getItem('d2c-editor-config');
    if (!saved) {
        alert('No saved configuration found!');
        return;
    }
    
    const config = JSON.parse(saved);
    
    document.getElementById('page-type').value = config.pageType;
    document.getElementById('example-type').value = config.exampleType;
    if (document.getElementById('banner-url')) document.getElementById('banner-url').value = config.bannerUrl;
    if (document.getElementById('logo-url')) document.getElementById('logo-url').value = config.logoUrl;
    document.getElementById('font-family').value = config.fontFamily;
    document.getElementById('primary-color').value = config.primaryColor;
    document.getElementById('primary-color-hex').value = config.primaryColor;
    document.getElementById('secondary-color').value = config.secondaryColor;
    document.getElementById('secondary-color-hex').value = config.secondaryColor;
    document.getElementById('accent-color').value = config.accentColor;
    document.getElementById('accent-color-hex').value = config.accentColor;
    document.getElementById('button-bg-color').value = config.buttonBgColor;
    document.getElementById('button-bg-color-hex').value = config.buttonBgColor;
    document.getElementById('bg-color').value = config.bgColor;
    document.getElementById('bg-color-hex').value = config.bgColor;
    document.getElementById('cart-color').value = config.cartColor;
    document.getElementById('cart-color-hex').value = config.cartColor;
    document.getElementById('layout').value = config.layout;
    document.getElementById('show-section-headers').value = config.showSectionHeaders;
    document.getElementById('show-accessibility').value = config.showAccessibility;
    document.getElementById('title-font-size').value = config.titleFontSize;
    document.getElementById('price-font-size').value = config.priceFontSize;
    document.getElementById('footer-font-size').value = config.footerFontSize;
    
    // Load overrides
    document.getElementById('override-product-title-font').value = config.overrides.productTitleFont;
    document.getElementById('override-product-title-size').value = config.overrides.productTitleSize;
    document.getElementById('override-product-title-color').value = config.overrides.productTitleColor;
    document.getElementById('override-price-font').value = config.overrides.priceFont;
    document.getElementById('override-price-size').value = config.overrides.priceSize;
    document.getElementById('override-price-color').value = config.overrides.priceColor;
    document.getElementById('override-footer-font').value = config.overrides.footerFont;
    document.getElementById('override-footer-size').value = config.overrides.footerSize;
    document.getElementById('override-footer-color').value = config.overrides.footerColor;
    document.getElementById('override-collection-font').value = config.overrides.collectionFont;
    document.getElementById('override-collection-size').value = config.overrides.collectionSize;
    document.getElementById('override-collection-color').value = config.overrides.collectionColor;
    document.getElementById('override-button-text-color').value = config.overrides.buttonTextColor;
    
    this.toggleGenericControls();
    this.switchPage();
    this.applyStyles();
    
    alert('Configuration loaded!');
};

// Copy to clipboard function
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Collection tabs functionality
D2CEditor.prototype.initCollectionTabs = function() {
    // Add event listener for when products are loaded
    const observer = new MutationObserver(() => {
        const tabs = document.querySelectorAll('.tab-link');
        if (tabs.length > 0) {
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Filter products based on collection
                    const collection = tab.dataset.collection;
                    this.filterProducts(collection);
                });
            });
            observer.disconnect();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
};

D2CEditor.prototype.filterProducts = function(collection) {
    const products = document.querySelectorAll('#products .product');
    
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        let show = true;
        
        if (collection !== 'all') {
            switch (collection) {
                case 'music':
                    show = productName.includes('vie') || productName.includes('album') || productName.includes('vinyl') || productName.includes('cd');
                    break;
                case 'apparel':
                    show = productName.includes('t-shirt') || productName.includes('hoodie') || productName.includes('shirt');
                    break;
                case 'accessories':
                    show = productName.includes('cap') || productName.includes('scarf') || productName.includes('hat') || productName.includes('bag');
                    break;
            }
        }
        
        product.style.display = show ? 'block' : 'none';
    });
};

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new D2CEditor();
});

// Add cart page method to the D2CEditor class
D2CEditor.prototype.loadCartPage = function() {
    const cartItem = this.generateCartItemHTML();
    const headerAssets = this.generateHeaderAssets();
    const copyrightText = this.getCopyrightText();
    
    this.preview.innerHTML = `
        <header class="store-navbar">
            <div class="navbar-logo">
                <img src="${headerAssets.logo}" alt="Logo">
            </div>
            <div class="navbar-banner">
                <img src="${headerAssets.banner}" alt="Banner">
            </div>
            <div class="navbar-cart">
                <button class="cart-button">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"/>
                    </svg>
                    <span class="cart-badge">1</span>
                </button>
            </div>
        </header>
        
        <div class="cart-container">
            <div class="cart-header">
                <h1 class="cart-title">Your Cart</h1>
                <div class="cart-descriptor">
                    <div class="cart-descriptor-title">Product</div>
                    <div class="cart-descriptor-quantity">Quantity</div>
                    <div class="cart-descriptor-subtotal">Item Subtotal</div>
                </div>
            </div>
            
            <div class="cart-item">
                <img src="${cartItem.image}" alt="Product" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${cartItem.title}</div>
                    <div class="cart-item-price">${cartItem.price}</div>
                    <div class="cart-item-details">
                        <span class="cart-item-variation">Size: Small</span>
                        <span class="cart-item-variation">Color: White</span>
                    </div>
                    <div class="cart-delivery-message">FREE delivery Wed, Oct 22</div>
                </div>
                <div class="cart-item-quantity">
                    <div class="cart-quantity-selector">
                        <button class="cart-qty-btn">-</button>
                        <input type="number" value="1" min="1">
                        <button class="cart-qty-btn">+</button>
                    </div>
                    <button class="cart-remove-btn">Remove</button>
                </div>
                <div class="cart-item-total">${cartItem.total}</div>
            </div>
            
            <div class="cart-footer">
                <div class="cart-subtotal-section">
                    <div class="cart-subtotal">
                        <span class="cart-subtotal-label">Subtotal:</span>
                        <span class="cart-subtotal-amount">${cartItem.total}</span>
                    </div>
                    <div class="cart-taxes-message">Taxes and shipping calculated at checkout</div>
                </div>
                <div class="cart-checkout">
                    <button class="cart-checkout-btn">Checkout with Amazon</button>
                </div>
            </div>
        </div>
        
        <footer class="store-footer">
            <div class="footer-content">
                <div class="footer-top-section">
                    <nav class="footer-nav">
                        <a href="#">${copyrightText}</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">FAQs</a>
                    </nav>
                    <nav class="footer-nav-right">
                        <a href="#">Instagram</a>
                        <a href="#">TikTok</a>
                        <a href="#">Twitter</a>
                        <a href="#">Facebook</a>
                    </nav>
                </div>
                <div class="accessibility-support">
                    If you are using a screen reader and having problems reading this website, get accessibility support from&nbsp;<a href="#">Amazon Accessibility</a>
                </div>
            </div>
        </footer>
    `;
    
    this.productsContainer = null;
};
