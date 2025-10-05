// Local integrations system - replaces Base44 integrations
import { EmailAPI } from '@/services/mockData';
import { sendOrderConfirmation } from '@/services/emailService';

// Email sending - support both old format (template/data) and new format (to/subject/html)
export const SendEmail = async (emailData) => {
  // If using template format (from Admin/Checkout)
  if (emailData.template === 'order_confirmation' && emailData.data) {
    return sendOrderConfirmation(emailData.data);
  }
  
  // If using direct format (from Schedule/Contact)
  if (emailData.to && emailData.subject && emailData.body) {
    const { sendEmail } = await import('@/services/emailService');
    return sendEmail({
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.body
    });
  }
  
  // Fallback to EmailAPI for old format
  return EmailAPI.send(emailData);
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

