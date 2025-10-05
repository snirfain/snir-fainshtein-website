// Local integrations system - replaces Base44 integrations
import { EmailAPI } from '@/services/mockData';
import { sendOrderConfirmation } from '@/services/emailService';

// Email sending - ALWAYS use emailService.js (Netlify Function)
export const SendEmail = async (emailData) => {
  console.log('🔍 SendEmail called with:', emailData);
  console.log('🔍 emailData.template:', emailData.template);
  console.log('🔍 emailData.data:', emailData.data);
  
  // If using template format (from Admin/Checkout)
  if (emailData.template === 'order_confirmation' && emailData.data) {
    console.log('✅ Using sendOrderConfirmation from emailService.js');
    return sendOrderConfirmation(emailData.data);
  }
  
  // If using direct format (from Schedule/Contact)  
  if (emailData.to && emailData.subject && emailData.body) {
    console.log('✅ Using sendEmail from emailService.js (direct)');
    const { sendEmail } = await import('@/services/emailService');
    return sendEmail({
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.body
    });
  }
  
  // ERROR: Unknown email format
  console.error('❌ Unknown email format:', emailData);
  throw new Error('Invalid email format. Expected {template, data} or {to, subject, body}');
};

// File upload mock
export const UploadFile = async (file) => {
  // Mock file upload - returns a fake URL
  console.log('Mock file upload:', file.name);
  return {
    url: `https://via.placeholder.com/800?text=${encodeURIComponent(file.name)}`,
    name: file.name,
    size: file.size,
    type: file.type
  };
};

// Invoice/PDF generation mock
export const InvokeInvoicePdf = async (invoiceData) => {
  console.log('Mock invoice PDF generation:', invoiceData);
  return {
    success: true,
    pdfUrl: 'https://example.com/invoice.pdf'
  };
};

