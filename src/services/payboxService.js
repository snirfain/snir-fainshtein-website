/**
 * Paybox Payment Integration Service
 * Documentation: https://www.paybox.co.il/documentation
 * 
 * Setup Instructions:
 * 1. Register at https://www.paybox.co.il
 * 2. Get your credentials: Terminal ID, User ID, Password
 * 3. Add to .env file:
 *    VITE_PAYBOX_TERMINAL_ID=your_terminal_id
 *    VITE_PAYBOX_USER_ID=your_user_id
 *    VITE_PAYBOX_PASSWORD=your_password
 */

const PAYBOX_CONFIG = {
  terminal: import.meta.env.VITE_PAYBOX_TERMINAL_ID,
  userId: import.meta.env.VITE_PAYBOX_USER_ID,
  password: import.meta.env.VITE_PAYBOX_PASSWORD,
  endpoint: import.meta.env.VITE_PAYBOX_ENDPOINT || 'https://pay.payboxapp.com',
  sandboxEndpoint: 'https://sandbox.payboxapp.com',
  isProduction: import.meta.env.PROD,
};

/**
 * Create Paybox payment page URL
 * @param {Object} orderData - Order information
 * @param {string} orderData.orderId - Unique order ID
 * @param {number} orderData.amount - Amount in NIS
 * @param {string} orderData.customerName - Customer full name
 * @param {string} orderData.customerEmail - Customer email
 * @param {string} orderData.customerPhone - Customer phone
 * @param {string} orderData.description - Payment description
 * @returns {string} Payment page URL
 */
export const createPayboxPayment = (orderData) => {
  const {
    orderId,
    amount,
    customerName,
    customerEmail,
    customerPhone,
    description = 'רכישה באתר שניר פיינשטיין'
  } = orderData;

  // Validate required fields
  if (!orderId || !amount || !customerName || !customerEmail) {
    throw new Error('Missing required payment fields');
  }

  // Check if credentials are configured
  if (!PAYBOX_CONFIG.terminal || !PAYBOX_CONFIG.userId || !PAYBOX_CONFIG.password) {
    console.error('Paybox credentials not configured');
    throw new Error('מערכת התשלומים לא מוגדרת. אנא צור קשר עם התמיכה.');
  }

  const endpoint = PAYBOX_CONFIG.isProduction 
    ? PAYBOX_CONFIG.endpoint 
    : PAYBOX_CONFIG.sandboxEndpoint;

  // Paybox uses URL parameters for payment
  const params = new URLSearchParams({
    // Required fields
    terminal: PAYBOX_CONFIG.terminal,
    user: PAYBOX_CONFIG.userId,
    password: PAYBOX_CONFIG.password,
    
    // Transaction details
    amount: Math.round(amount * 100).toString(), // Convert to agorot (cents)
    transaction_id: orderId,
    description: description,
    
    // Customer details
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone || '',
    
    // Return URLs
    success_url: `${window.location.origin}/order-confirmation?order_id=${orderId}&status=success`,
    cancel_url: `${window.location.origin}/checkout?order_id=${orderId}&status=cancelled`,
    callback_url: `${window.location.origin}/api/paybox-callback`,
    
    // Additional settings
    language: 'he', // Hebrew interface
    currency: 'ILS',
    payments: '1', // Number of payments (1 = single payment)
  });

  return `${endpoint}?${params.toString()}`;
};

/**
 * Create payment with installments
 * @param {Object} orderData - Order information
 * @param {number} installments - Number of installments (1-36)
 * @returns {string} Payment page URL
 */
export const createPayboxPaymentWithInstallments = (orderData, installments = 1) => {
  if (installments < 1 || installments > 36) {
    throw new Error('מספר תשלומים חייב להיות בין 1 ל-36');
  }

  const paymentUrl = createPayboxPayment(orderData);
  const url = new URL(paymentUrl);
  url.searchParams.set('payments', installments.toString());
  
  // Add minimum installment amount check
  const minInstallmentAmount = 100; // ₪100 minimum per installment
  const totalAmount = orderData.amount;
  const installmentAmount = totalAmount / installments;
  
  if (installmentAmount < minInstallmentAmount) {
    throw new Error(`סכום התשלום החודשי (₪${installmentAmount.toFixed(2)}) נמוך מהמינימום הנדרש (₪${minInstallmentAmount})`);
  }
  
  return url.toString();
};

/**
 * Verify Paybox callback signature
 * Note: This should ideally be done on the backend for security
 * @param {Object} callbackData - Data received from Paybox
 * @returns {boolean} Is callback valid
 */
export const verifyPayboxCallback = (callbackData) => {
  // Warning: Client-side verification is not secure
  // This should be implemented on your backend
  
  const {
    transaction_id,
    status,
    approval_number,
  } = callbackData;

  // Basic validation
  if (!transaction_id || !status) {
    return false;
  }

  // Status should be one of: approved, declined, error
  const validStatuses = ['approved', 'declined', 'error'];
  if (!validStatuses.includes(status)) {
    return false;
  }

  // If approved, approval_number should exist
  if (status === 'approved' && !approval_number) {
    return false;
  }

  return true;
};

/**
 * Parse Paybox callback URL parameters
 * @param {string} callbackUrl - Full callback URL with parameters
 * @returns {Object} Parsed callback data
 */
export const parsePayboxCallback = (callbackUrl) => {
  const url = new URL(callbackUrl);
  const params = new URLSearchParams(url.search);
  
  return {
    transaction_id: params.get('transaction_id'),
    status: params.get('status'),
    approval_number: params.get('approval_number'),
    amount: params.get('amount'),
    card_last_4_digits: params.get('card_last_4_digits'),
    error_message: params.get('error_message'),
  };
};

export default {
  createPayboxPayment,
  createPayboxPaymentWithInstallments,
  verifyPayboxCallback,
  parsePayboxCallback,
};

