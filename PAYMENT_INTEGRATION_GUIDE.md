# 💳 מדריך אינטגרציה למערכות תשלום

מדריך מקיף לאינטגרציה עם **Paybox (פייבוקס)** ו-**Bit (ביט)** באתר.

---

## 🎯 סקירה כללית

באתר ישנן 3 אפשרויות תשלום עיקריות:

1. **Paybox (פייבוקס)** - אשראי, תשלומים, פייפאל
2. **Bit (ביט)** - תשלום מהיר דרך אפליקציית ביט
3. **תשלום ידני** - העברה בנקאית / פייפאל ידני

---

## 1️⃣ אינטגרציה עם Paybox (פייבוקס)

### 📋 שלב 1: רישום בפייבוקס

1. היכנס ל-[Paybox.co.il](https://www.paybox.co.il)
2. פתח חשבון עסקי
3. קבל את פרטי הגישה:
   - **Terminal ID** (מספר סניף)
   - **User ID** (מספר משתמש)
   - **Password** (סיסמה)

### 📝 שלב 2: הוספת המפתחות ל-Environment Variables

צור קובץ `.env` בשורש הפרויקט:

```bash
# Paybox Credentials
VITE_PAYBOX_TERMINAL_ID=your_terminal_id
VITE_PAYBOX_USER_ID=your_user_id
VITE_PAYBOX_PASSWORD=your_password
VITE_PAYBOX_ENDPOINT=https://pay.payboxapp.com
```

### 💻 שלב 3: יצירת Paybox Service

צור קובץ חדש: `src/services/payboxService.js`

```javascript
/**
 * Paybox Payment Integration Service
 * Documentation: https://www.paybox.co.il/documentation
 */

const PAYBOX_CONFIG = {
  terminal: import.meta.env.VITE_PAYBOX_TERMINAL_ID,
  userId: import.meta.env.VITE_PAYBOX_USER_ID,
  password: import.meta.env.VITE_PAYBOX_PASSWORD,
  endpoint: import.meta.env.VITE_PAYBOX_ENDPOINT || 'https://pay.payboxapp.com',
};

/**
 * Create Paybox payment page URL
 * @param {Object} orderData - Order information
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

  // Paybox uses URL parameters for payment
  const params = new URLSearchParams({
    // Required fields
    terminal: PAYBOX_CONFIG.terminal,
    user: PAYBOX_CONFIG.userId,
    password: PAYBOX_CONFIG.password,
    
    // Transaction details
    amount: (amount * 100).toString(), // Paybox expects amount in agorot (cents)
    transaction_id: orderId,
    description: description,
    
    // Customer details
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    
    // Return URLs
    success_url: `${window.location.origin}/order-confirmation?order_id=${orderId}&status=success`,
    cancel_url: `${window.location.origin}/checkout?order_id=${orderId}&status=cancelled`,
    callback_url: `${window.location.origin}/api/paybox-callback`, // Backend endpoint
    
    // Additional settings
    language: 'he', // Hebrew interface
    currency: 'ILS',
    payments: '1', // Number of payments (1 = single payment)
  });

  return `${PAYBOX_CONFIG.endpoint}?${params.toString()}`;
};

/**
 * Verify Paybox callback (should be done on backend)
 * @param {Object} callbackData - Data received from Paybox
 * @returns {boolean} Is callback valid
 */
export const verifyPayboxCallback = (callbackData) => {
  // This should be implemented on your backend
  // Paybox sends a callback with transaction status
  
  const {
    transaction_id,
    amount,
    status,
    approval_number,
    card_last_4_digits,
  } = callbackData;

  // Verify signature if Paybox provides one
  // Check if transaction_id matches your order
  // Update order status in database

  return status === 'approved';
};

/**
 * Create payment with installments
 * @param {Object} orderData - Order information
 * @param {number} installments - Number of installments (1-36)
 * @returns {string} Payment page URL
 */
export const createPayboxPaymentWithInstallments = (orderData, installments = 1) => {
  const paymentUrl = createPayboxPayment(orderData);
  const url = new URL(paymentUrl);
  url.searchParams.set('payments', installments.toString());
  return url.toString();
};

export default {
  createPayboxPayment,
  verifyPayboxCallback,
  createPayboxPaymentWithInstallments,
};
```

### 🔄 שלב 4: עדכון קומפוננטת Checkout

עדכן את `src/pages/Checkout.jsx`:

```javascript
import { createPayboxPayment } from '@/services/payboxService';

// בתוך handleSubmit, לפני שליחת המייל:
if (formData.paymentMethod === 'paybox') {
  // יצירת URL לתשלום
  const paymentUrl = createPayboxPayment({
    orderId: order.id,
    amount: total,
    customerName: formData.fullName,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    description: `הזמנה ${orderNumber}`
  });
  
  // הפניה לדף התשלום של פייבוקס
  window.location.href = paymentUrl;
  return; // Don't send email yet - wait for payment confirmation
}
```

---

## 2️⃣ אינטגרציה עם Bit (ביט)

### 📋 שלב 1: רישום ב-Bit Business

1. הורד את אפליקציית **Bit Business** מהאפסטור/גוגל פליי
2. פתח חשבון עסקי
3. קבל את:
   - **Merchant ID** (מזהה עסק)
   - **API Key** (מפתח API)

### 📝 שלב 2: הוספת המפתחות

הוסף ל-`.env`:

```bash
# Bit Credentials
VITE_BIT_MERCHANT_ID=your_merchant_id
VITE_BIT_API_KEY=your_api_key
VITE_BIT_ENDPOINT=https://api.bit.co.il
```

### 💻 שלב 3: יצירת Bit Service

צור קובץ חדש: `src/services/bitService.js`

```javascript
/**
 * Bit Payment Integration Service
 * Documentation: https://www.bit.co.il/business/api
 */

const BIT_CONFIG = {
  merchantId: import.meta.env.VITE_BIT_MERCHANT_ID,
  apiKey: import.meta.env.VITE_BIT_API_KEY,
  endpoint: import.meta.env.VITE_BIT_ENDPOINT || 'https://api.bit.co.il',
};

/**
 * Create Bit payment request
 * @param {Object} orderData - Order information
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

  try {
    const response = await fetch(`${BIT_CONFIG.endpoint}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BIT_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        // Required fields for Bit
        merchant_id: BIT_CONFIG.merchantId,
        amount: amount, // Amount in NIS
        order_id: orderId,
        description: description,
        
        // Customer details
        customer_name: customerName,
        customer_phone: customerPhone,
        
        // Return URLs
        success_url: `${window.location.origin}/order-confirmation?order_id=${orderId}&status=success`,
        cancel_url: `${window.location.origin}/checkout?order_id=${orderId}&status=cancelled`,
        webhook_url: `${window.location.origin}/api/bit-webhook`,
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
      qr_code: data.qr_code, // Optional: QR code for scanning
    };
  } catch (error) {
    console.error('Bit payment error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Check Bit payment status
 * @param {string} transactionId - Bit transaction ID
 * @returns {Promise<Object>} Payment status
 */
export const checkBitPaymentStatus = async (transactionId) => {
  try {
    const response = await fetch(
      `${BIT_CONFIG.endpoint}/payment/${transactionId}/status`,
      {
        headers: {
          'Authorization': `Bearer ${BIT_CONFIG.apiKey}`,
        },
      }
    );

    const data = await response.json();
    
    return {
      status: data.status, // 'pending', 'completed', 'cancelled', 'failed'
      amount: data.amount,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('Bit status check error:', error);
    throw error;
  }
};

/**
 * Create Bit payment with QR code for display
 * @param {Object} orderData - Order information
 * @returns {Promise<Object>} Payment details with QR code
 */
export const createBitQRPayment = async (orderData) => {
  const paymentData = await createBitPayment({
    ...orderData,
    generate_qr: true, // Request QR code generation
  });
  
  return paymentData;
};

export default {
  createBitPayment,
  checkBitPaymentStatus,
  createBitQRPayment,
};
```

### 🔄 שלב 4: עדכון Checkout עבור Bit

```javascript
import { createBitPayment, createBitQRPayment } from '@/services/bitService';

// בתוך handleSubmit:
if (formData.paymentMethod === 'bit') {
  const bitPayment = await createBitPayment({
    orderId: order.id,
    amount: total,
    customerName: formData.fullName,
    customerPhone: formData.phone,
  });
  
  if (bitPayment.success) {
    // אפשרות 1: הפניה לביט
    window.location.href = bitPayment.payment_url;
    
    // אפשרות 2: הצגת QR code
    // setQrCode(bitPayment.qr_code);
  } else {
    showError('שגיאה', bitPayment.error);
  }
  
  return;
}
```

---

## 3️⃣ עדכון UI של Checkout

עדכן את `src/pages/Checkout.jsx` להוסיף אפשרויות תשלום:

```javascript
<div className="space-y-4">
  <Label>בחר אמצעי תשלום</Label>
  <RadioGroup 
    value={formData.paymentMethod} 
    onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
  >
    {/* Paybox - כרטיס אשראי */}
    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
      <RadioGroupItem value="paybox" id="paybox" />
      <Label htmlFor="paybox" className="flex items-center gap-3 cursor-pointer flex-1">
        <CreditCard className="h-5 w-5" />
        <div>
          <p className="font-semibold">כרטיס אשראי (פייבוקס)</p>
          <p className="text-sm text-gray-500">תשלום מאובטח באמצעות כרטיס אשראי</p>
        </div>
      </Label>
    </div>

    {/* Bit */}
    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
      <RadioGroupItem value="bit" id="bit" />
      <Label htmlFor="bit" className="flex items-center gap-3 cursor-pointer flex-1">
        <Smartphone className="h-5 w-5" />
        <div>
          <p className="font-semibold">Bit - תשלום מהיר</p>
          <p className="text-sm text-gray-500">תשלום דרך אפליקציית ביט</p>
        </div>
      </Label>
    </div>

    {/* העברה בנקאית */}
    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-blue-500">
      <RadioGroupItem value="manual" id="manual" />
      <Label htmlFor="manual" className="flex items-center gap-3 cursor-pointer flex-1">
        <Building className="h-5 w-5" />
        <div>
          <p className="font-semibold">העברה בנקאית</p>
          <p className="text-sm text-gray-500">נציג יצור קשר לפרטי העברה</p>
        </div>
      </Label>
    </div>
  </RadioGroup>
</div>
```

---

## 4️⃣ טיפול ב-Callbacks (Backend)

### יצירת API Endpoints (צריך Backend)

אם יש לך Backend, צור endpoints לטיפול ב-callbacks:

```javascript
// Backend endpoint example (Node.js/Express)
app.post('/api/paybox-callback', async (req, res) => {
  const { transaction_id, status, amount, approval_number } = req.body;
  
  // Verify callback authenticity
  // Update order status in database
  if (status === 'approved') {
    await Order.update(transaction_id, { 
      status: 'paid',
      payment_approval: approval_number 
    });
    
    // Send download links email
    await sendDownloadLinksEmail(transaction_id);
  }
  
  res.status(200).send('OK');
});

app.post('/api/bit-webhook', async (req, res) => {
  const { transaction_id, status, amount } = req.body;
  
  // Similar handling for Bit
  if (status === 'completed') {
    await Order.update(transaction_id, { status: 'paid' });
    await sendDownloadLinksEmail(transaction_id);
  }
  
  res.status(200).send('OK');
});
```

### אלטרנטיבה: שימוש ב-Base44 Integrations

אם אין Backend משלך, אפשר להשתמש ב-Base44:

```javascript
// Create custom integration in Base44
import { base44 } from '@/api/base44Client';

// Use Base44 webhooks to handle payment callbacks
```

---

## 5️⃣ דף אישור הזמנה

צור `src/pages/OrderConfirmation.jsx` לטיפול בהחזרה מהתשלום:

```javascript
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Order } from '@/api/entities';
import { CheckCircle, XCircle } from 'lucide-react';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const status = searchParams.get('status');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId]);

  const loadOrder = async (id) => {
    try {
      const orderData = await Order.get(id);
      setOrder(orderData);
    } catch (error) {
      console.error('Error loading order:', error);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">התשלום בוצע בהצלחה!</h1>
          <p className="text-gray-600 mb-4">
            הזמנה מספר: <strong>{order?.order_number}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            שלחנו אליך מייל עם לינקים להורדת הקבצים שרכשת
          </p>
          <Link to="/downloads">
            <Button className="w-full">
              עבור להורדות שלי
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">התשלום לא הושלם</h1>
        <p className="text-gray-600 mb-6">
          התשלום בוטל או נכשל. אנא נסה שוב.
        </p>
        <Link to="/cart">
          <Button variant="outline" className="w-full">
            חזור לעגלה
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

---

## 6️⃣ בדיקות (Testing)

### Paybox Sandbox Environment

```bash
# Add to .env for testing
VITE_PAYBOX_ENDPOINT=https://sandbox.payboxapp.com
```

### Bit Test Mode

```bash
# Bit provides test credentials
VITE_BIT_TEST_MODE=true
```

### כרטיסי אשראי לבדיקה

Paybox מספק כרטיסים לבדיקה:
- **מספר כרטיס:** 4580-0000-0000-0000
- **תוקף:** כל תאריך עתידי
- **CVV:** 123

---

## 7️⃣ אבטחה (Security Best Practices)

### ✅ חובה לעשות:

1. **HTTPS בלבד** - אל תאפשר תשלומים ב-HTTP
2. **אל תשמור פרטי אשראי** - אף פעם!
3. **Validate callbacks** - בדוק שה-callback באמת מגיע מהספק
4. **Environment variables** - אל תשמור API keys בקוד
5. **Rate limiting** - הגבל מספר ניסיונות תשלום

### ⚠️ לא לעשות:

- ❌ לא לשמור CVV
- ❌ לא לשמור מספר כרטיס מלא
- ❌ לא לבטוח ב-client side validation בלבד
- ❌ לא לחשוף API keys ב-frontend code

---

## 8️⃣ מחירון ועלויות

### Paybox (פייבוקס)
- עמלה: ~2.5% לעסקה
- דמי חודש: ללא
- תקופת התחייבות: ללא

### Bit (ביט)
- עמלה: ~1.5% לעסקה
- דמי חודש: ללא
- מינימום לעסקה: ₪1

---

## 📞 תמיכה ויצירת קשר

### Paybox
- **אתר:** https://www.paybox.co.il
- **תמיכה:** support@paybox.co.il
- **טלפון:** 03-6381818

### Bit
- **אתר:** https://www.bit.co.il/business
- **תמיכה:** business@bit.co.il
- **מסמכי API:** https://www.bit.co.il/business/api

---

## ✅ Checklist לפני Production

- [ ] נרשמת לחשבון Paybox/Bit
- [ ] קיבלת credentials והוספת ל-.env
- [ ] בדקת תשלום בסביבת sandbox
- [ ] יצרת endpoints לcallbacks (או השתמשת ב-Base44)
- [ ] בדקת שליחת מיילים עם לינקים
- [ ] הוספת HTTPS לאתר
- [ ] הוספת Terms & Conditions לתשלום
- [ ] בדקת תשלום אמיתי עם סכום קטן
- [ ] יצרת מסמך עזרה ללקוחות

---

**נוצר על ידי:** Claude (Anthropic)  
**עודכן:** אוקטובר 2025

