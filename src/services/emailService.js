/**
 * Email Service using Resend API via Netlify Functions
 * 
 * Development: Uses mock mode (localhost)
 * Production: Uses Netlify Function to call Resend API
 */

/**
 * Send email via Resend (Production) or Mock (Development)
 */
export const sendEmail = async ({ to, subject, html, text = '' }) => {
  // Check if we're in production (deployed on Netlify)
  const isProduction = window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // Production: Use Netlify Function
    try {
      console.log('📧 Sending email via Netlify Function to:', to);
      
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to,
          subject,
          html
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
      
      console.log('✅ Email sent successfully via Netlify Function:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId,
        mode: 'production'
      };
      
    } catch (error) {
      console.error('❌ Error sending email via Netlify Function:', error);
      throw error;
    }
  } else {
    // Development: Use mock mode
    console.log('📧 Email Service - Development Mode');
    console.log('📧 To:', to);
    console.log('📧 Subject:', subject);
    console.log('📧 HTML length:', html.length, 'characters');
    console.log('✅ Email logged successfully (mock mode)');
    console.log('ℹ️ For production: Deploy to Netlify to enable real emails');
    
    return {
      success: true,
      messageId: 'mock-' + Date.now(),
      mode: 'development'
    };
  }
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (orderData) => {
  const { customer_name, customer_email, order_number, products, subtotal, total, discount_amount, currency } = orderData;
  
  const currencySymbol = currency === 'ILS' ? '₪' : currency === 'USD' ? '$' : '€';
  
  // Build products HTML
  const productsHtml = products.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.product_title}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left;">${(item.price * item.quantity).toFixed(2)}${currencySymbol}</td>
    </tr>
  `).join('');
  
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <title>אישור הזמנה</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎉 תודה על ההזמנה!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">הזמנה #${order_number}</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <p style="font-size: 18px; margin: 0 0 20px 0;">שלום ${customer_name},</p>
          <p style="margin: 0 0 20px 0; color: #4b5563;">תודה שבחרת בנו! ההזמנה שלך התקבלה בהצלחה ומעובדת כעת.</p>
          
          <!-- Order Details -->
          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="margin: 0 0 15px 0; font-size: 20px; color: #1e3a8a;">פרטי ההזמנה</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #e5e7eb;">
                  <th style="padding: 12px; text-align: right; font-weight: 600;">מוצר</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600;">כמות</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600;">מחיר</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtml}
              </tbody>
            </table>
            
            <!-- Totals -->
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>סכום ביניים:</span>
                <span style="font-weight: 600;">${subtotal?.toFixed(2) || total.toFixed(2)}${currencySymbol}</span>
              </div>
              ${discount_amount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #f97316;">
                  <span>הנחה:</span>
                  <span style="font-weight: 600;">-${discount_amount.toFixed(2)}${currencySymbol}</span>
                </div>
              ` : ''}
              <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 2px solid #1e3a8a; font-size: 20px; font-weight: bold; color: #1e3a8a;">
                <span>סה״כ לתשלום:</span>
                <span>${total.toFixed(2)}${currencySymbol}</span>
              </div>
            </div>
          </div>
          
          <!-- Next Steps -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #92400e;">⏭️ מה הלאה?</h3>
            <ul style="margin: 0; padding-right: 20px; color: #78350f;">
              <li style="margin-bottom: 8px;">תקבל אישור תשלום בהקדם</li>
              <li style="margin-bottom: 8px;">קישורי הורדה יישלחו למייל שלך</li>
              <li style="margin-bottom: 8px;">ניתן לעקוב אחר ההזמנה בדשבורד האישי</li>
            </ul>
          </div>
          
          <!-- Contact -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 10px 0; color: #6b7280;">שאלות? אנחנו כאן בשבילך!</p>
            <p style="margin: 0;">
              <a href="mailto:snirfain@gmail.com" style="color: #3b82f6; text-decoration: none;">📧 snirfain@gmail.com</a>
              <span style="margin: 0 10px; color: #d1d5db;">|</span>
              <a href="tel:+972503133641" style="color: #3b82f6; text-decoration: none;">📱 050-313-3641</a>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">© ${new Date().getFullYear()} שניר פיינשטיין - כל הזכויות שמורות</p>
          <p style="margin: 0;">🔒 תשלום מאובטח | 🚀 משלוח מיידי | 💬 תמיכה מקצועית</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({
    to: customer_email,
    subject: `אישור הזמנה - ${order_number}`,
    html
  });
};

export default {
  sendEmail,
  sendOrderConfirmation
};
