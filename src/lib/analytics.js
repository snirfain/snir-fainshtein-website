/**
 * Google Analytics Helper Functions
 * 
 * Setup Instructions:
 * 1. Get your GA4 Measurement ID from Google Analytics
 * 2. Add it to your .env file: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 3. The script will be automatically loaded in index.html
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // gtag is loaded via script in index.html
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

/**
 * Track page view
 * @param {string} path - The page path
 */
export const trackPageView = (path) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

/**
 * Track custom event
 * @param {string} action - Event action
 * @param {Object} params - Event parameters
 */
export const trackEvent = (action, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};

/**
 * Track ecommerce events
 */
export const trackEcommerce = {
  // Track when user views product
  viewProduct: (product) => {
    trackEvent('view_item', {
      currency: product.currency || 'ILS',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.title,
        item_category: product.category,
        price: product.price,
        quantity: 1
      }]
    });
  },

  // Track when user adds to cart
  addToCart: (product, quantity = 1) => {
    trackEvent('add_to_cart', {
      currency: product.currency || 'ILS',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.title,
        item_category: product.category,
        price: product.price,
        quantity: quantity
      }]
    });
  },

  // Track when user removes from cart
  removeFromCart: (product, quantity = 1) => {
    trackEvent('remove_from_cart', {
      currency: product.currency || 'ILS',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.title,
        item_category: product.category,
        price: product.price,
        quantity: quantity
      }]
    });
  },

  // Track when user begins checkout
  beginCheckout: (cart, value) => {
    trackEvent('begin_checkout', {
      currency: 'ILS',
      value: value,
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.title,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    });
  },

  // Track successful purchase
  purchase: (orderId, cart, total) => {
    trackEvent('purchase', {
      transaction_id: orderId,
      currency: 'ILS',
      value: total,
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.title,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    });
  }
};

/**
 * Track user interactions
 */
export const trackUserInteraction = {
  // Track button clicks
  buttonClick: (buttonName, location) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location
    });
  },

  // Track form submissions
  formSubmit: (formName) => {
    trackEvent('form_submit', {
      form_name: formName
    });
  },

  // Track search
  search: (searchTerm) => {
    trackEvent('search', {
      search_term: searchTerm
    });
  },

  // Track login
  login: (method) => {
    trackEvent('login', {
      method: method
    });
  },

  // Track signup
  signUp: (method) => {
    trackEvent('sign_up', {
      method: method
    });
  }
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackEcommerce,
  trackUserInteraction
};

