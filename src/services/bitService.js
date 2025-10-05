/**
 * Bit Payment Integration Service
 * Documentation: https://www.bit.co.il/business/api
 * 
 * Setup Instructions:
 * 1. Download Bit Business app and register
 * 2. Get your credentials: Merchant ID, API Key
 * 3. Add to .env file:
 *    VITE_BIT_MERCHANT_ID=your_merchant_id
 *    VITE_BIT_API_KEY=your_api_key
 */

const BIT_CONFIG = {
  merchantId: import.meta.env.VITE_BIT_MERCHANT_ID,
  apiKey: import.meta.env.VITE_BIT_API_KEY,
  endpoint: import.meta.env.VITE_BIT_ENDPOINT || 'https://api.bit.co.il',
  testEndpoint: 'https://sandbox.bit.co.il',
  isProduction: import.meta.env.PROD,
  testMode: import.meta.env.VITE_BIT_TEST_MODE === 'true',
};

/**
 * Create Bit payment request
 * @param {Object} orderData - Order information
 * @param {string} orderData.orderId - Unique order ID
 * @param {number} orderData.amount - Amount in NIS
 * @param {string} orderData.customerName - Customer full name
 * @param {string} orderData.customerPhone - Customer phone (required for Bit)
 * @param {string} orderData.description - Payment description
 * @returns {Promise<Object>} Payment details including Bit URL
 */
export const createBitPayment = async (orderData) => {
  const {
    orderId,
    amount,
    customerName,
    customerPhone,
    description = 'רכישה באתר שניר פיינשטיין'
  } = orderData;

  // Validate required fields
  if (!orderId || !amount || !customerName || !customerPhone) {
    throw new Error('חסרים פרטים נדרשים לתשלום ביט');
  }

  // Check if credentials are configured
  if (!BIT_CONFIG.merchantId || !BIT_CONFIG.apiKey) {
    console.error('Bit credentials not configured');
    throw new Error('מערכת התשלומים לא מוגדרת. אנא צור קשר עם התמיכה.');
  }

  // Validate phone number format (Israeli)
  const phoneRegex = /^05\d{8}$/;
  const cleanPhone = customerPhone.replace(/[-\s]/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    throw new Error('מספר טלפון לא תקין. נדרש מספר ישראלי מהצורה: 05XXXXXXXX');
  }

  const endpoint = BIT_CONFIG.testMode 
    ? BIT_CONFIG.testEndpoint 
    : BIT_CONFIG.endpoint;

  try {
    const response = await fetch(`${endpoint}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BIT_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        // Required fields for Bit
        merchant_id: BIT_CONFIG.merchantId,
        amount: Math.round(amount * 100) / 100, // Round to 2 decimals
        order_id: orderId,
        description: description,
        
        // Customer details
        customer_name: customerName,
        customer_phone: cleanPhone,
        
        // Return URLs
        success_url: `${window.location.origin}/order-confirmation?order_id=${orderId}&status=success`,
        cancel_url: `${window.location.origin}/checkout?order_id=${orderId}&status=cancelled`,
        webhook_url: `${window.location.origin}/api/bit-webhook`,
        
        // Additional options
        currency: 'ILS',
        language: 'he',
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'שגיאה ביצירת תשלום ביט');
    }

    return {
      success: true,
      payment_url: data.payment_url, // URL to redirect customer
      transaction_id: data.transaction_id,
      qr_code: data.qr_code, // Optional: QR code URL for scanning
      expires_at: data.expires_at, // Payment link expiration
    };
  } catch (error) {
    console.error('Bit payment error:', error);
    return {
      success: false,
      error: error.message || 'שגיאה ביצירת תשלום',
    };
  }
};

/**
 * Check Bit payment status
 * @param {string} transactionId - Bit transaction ID
 * @returns {Promise<Object>} Payment status
 */
export const checkBitPaymentStatus = async (transactionId) => {
  if (!transactionId) {
    throw new Error('Transaction ID is required');
  }

  const endpoint = BIT_CONFIG.testMode 
    ? BIT_CONFIG.testEndpoint 
    : BIT_CONFIG.endpoint;

  try {
    const response = await fetch(
      `${endpoint}/payment/${transactionId}/status`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${BIT_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }

    const data = await response.json();
    
    return {
      status: data.status, // 'pending', 'completed', 'cancelled', 'failed', 'expired'
      amount: data.amount,
      timestamp: data.timestamp,
      customer_phone: data.customer_phone,
      order_id: data.order_id,
    };
  } catch (error) {
    console.error('Bit status check error:', error);
    throw error;
  }
};

/**
 * Create Bit payment with QR code for display
 * Useful for desktop purchases where user can scan with phone
 * @param {Object} orderData - Order information
 * @returns {Promise<Object>} Payment details with QR code
 */
export const createBitQRPayment = async (orderData) => {
  const paymentData = await createBitPayment({
    ...orderData,
    generate_qr: true, // Request QR code generation
  });
  
  if (!paymentData.success) {
    throw new Error(paymentData.error);
  }
  
  return {
    ...paymentData,
    // Additional QR-specific properties
    qr_size: 'medium', // small, medium, large
    qr_format: 'png', // png, svg
  };
};

/**
 * Cancel Bit payment
 * @param {string} transactionId - Bit transaction ID
 * @returns {Promise<Object>} Cancellation result
 */
export const cancelBitPayment = async (transactionId) => {
  if (!transactionId) {
    throw new Error('Transaction ID is required');
  }

  const endpoint = BIT_CONFIG.testMode 
    ? BIT_CONFIG.testEndpoint 
    : BIT_CONFIG.endpoint;

  try {
    const response = await fetch(
      `${endpoint}/payment/${transactionId}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BIT_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to cancel payment');
    }

    return {
      success: true,
      message: 'התשלום בוטל בהצלחה',
    };
  } catch (error) {
    console.error('Bit cancel error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Verify Bit webhook signature
 * @param {Object} webhookData - Data received from Bit webhook
 * @param {string} signature - Signature from webhook header
 * @returns {boolean} Is webhook valid
 */
export const verifyBitWebhook = (webhookData, signature) => {
  // Note: This should be implemented on your backend
  // Bit provides webhook signature verification
  
  if (!signature) {
    return false;
  }

  // Implementation depends on Bit's signature method
  // Usually involves HMAC with your API key
  
  return true; // Placeholder
};

export default {
  createBitPayment,
  checkBitPaymentStatus,
  createBitQRPayment,
  cancelBitPayment,
  verifyBitWebhook,
};

