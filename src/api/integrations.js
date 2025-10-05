// Local integrations system - replaces Base44 integrations
import { EmailAPI } from '@/services/mockData';

// Email sending
export const SendEmail = EmailAPI.send;

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

