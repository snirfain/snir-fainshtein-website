
import React, { useState, useEffect } from "react";
import { Order } from "@/api/entities";
import { Download } from "@/api/entities";
import { SendEmail } from "@/api/entities";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CreditCard, 
  CheckCircle, 
  Shield, 
  Zap, 
  Users, 
  Lock,
  Info,
  Check
} from "lucide-react";
import { createPageUrl } from "@/utils";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: פרטים, 2: תשלום, 3: אישור
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "manual"
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const { clearCart } = useCart();
  
  // Get applied coupon from localStorage
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  useEffect(() => {
    loadCart();
    // Auto-fill if user is logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.full_name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
    
    // Load applied coupon
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
    }
  }, [user]);
  
  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(formData.email)) {
      showError('כתובת אימייל לא תקינה', 'אנא הזן כתובת אימייל תקינה');
      return;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      showError('מספר טלפון לא תקין', 'מספר הטלפון חייב להכיל בדיוק 10 ספרות');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Calculate discount from applied coupon
      const savedCoupon = localStorage.getItem('appliedCoupon');
      const coupon = savedCoupon ? JSON.parse(savedCoupon) : null;
      const discount = coupon 
        ? coupon.type === 'percentage' 
          ? subtotal * (coupon.value / 100)
          : coupon.value
        : 0;
      
      const total = subtotal - discount;
      
      // יצירת הזמנה
      const orderNumber = `ORD-${Date.now()}`;
      const order = await Order.create({
        order_number: orderNumber,
        customer_email: formData.email,
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        products: cart.map(item => ({
          product_id: item.id,
          product_title: item.title,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        total,
        status: "pending",
        payment_method: formData.paymentMethod
      });
      
      // יצירת לינקים להורדה למוצרים דיגיטליים
      const downloadLinks = [];
      for (const item of cart.filter(i => i.is_digital)) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + (item.download_expiry_days || 30));
        
        const downloadToken = `TOKEN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const downloadRecord = await Download.create({
          order_id: order.id,
          product_id: item.id,
          customer_email: formData.email,
          download_token: downloadToken,
          max_downloads: item.max_downloads || 3,
          expiry_date: expiryDate.toISOString().split('T')[0],
          downloads_count: 0,
          is_active: true
        });
        
        // יצירת לינק הורדה
        const downloadUrl = `${window.location.origin}/downloads?token=${downloadToken}`;
        downloadLinks.push({
          product_title: item.title,
          download_url: downloadUrl,
          expiry_date: expiryDate,
          max_downloads: item.max_downloads || 3
        });
      }
      
      // שמירת פרטי ההזמנה ולינקי ההורדה ב-localStorage
      localStorage.setItem('lastOrder', JSON.stringify({
        orderNumber,
        total,
        items: cart,
        email: formData.email
      }));
      
      if (downloadLinks.length > 0) {
        localStorage.setItem('lastOrderDownloads', JSON.stringify(downloadLinks));
      }
      
      // שליחת מייל אישור ללקוח
      try {
        console.log("📧 Sending email to:", formData.email);
        console.log("📧 Email data:", {
          customer_name: formData.fullName,
          order_number: orderNumber,
          subtotal,
          total,
          discount_amount: discount
        });
        
        const emailResult = await SendEmail({
          to: formData.email,
          subject: `אישור הזמנה - ${orderNumber}`,
          template: 'order_confirmation',
          data: {
            customer_name: formData.fullName,
            customer_email: formData.email,
            order_number: orderNumber,
            products: cart.map(item => ({
              product_title: item.title,
              quantity: item.quantity,
              price: item.price
            })),
            subtotal,
            total,
            discount_amount: discount,
            currency: 'ILS'
          }
        });
        
        console.log("✅ Email result:", emailResult);
        console.log("✅ Email sent successfully to:", formData.email);
      } catch (emailError) {
        console.error("❌ Error sending email:", emailError);
        console.error("❌ Email error details:", emailError.message);
        // Don't fail the order if email fails
      }
      
      // ניקוי העגלה וקוד הקופון
      localStorage.removeItem('cart');
      localStorage.removeItem('appliedCoupon'); // איפוס קוד הקופון
      clearCart(); // ניקוי הסל מהקונטקסט
      setOrderId(orderNumber);
      setCurrentStep(3);
      setIsComplete(true);
      showSuccess('הזמנה התקבלה!', 'שלחנו לך מייל עם פרטי ההזמנה');
      
    } catch (error) {
      console.error("Error processing order:", error);
      showError('שגיאה', 'אירעה שגיאה בעיבוד ההזמנה. אנא נסה שוב.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const createOrderEmailTemplate = (order, items, customer, downloadLinks = []) => {
    const currencySymbol = items[0]?.currency === 'ILS' ? '₪' : '$';
    return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <title>אישור הזמנה</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #1E6FB6; border-bottom: 3px solid #1E6FB6; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        .download-box {
          background-color: #E8F4FD;
          border: 2px solid #1E6FB6;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .download-btn {
          display: inline-block;
          background-color: #1E6FB6;
          color: white !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          margin: 10px 0;
          font-weight: bold;
        }
        .warning {
          background-color: #FFF3CD;
          border: 1px solid #FFC107;
          padding: 15px;
          border-radius: 6px;
          margin: 15px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px;
          text-align: right;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎉 תודה על ההזמנה!</h1>
        <p style="font-size: 16px;">שלום ${customer.fullName},</p>
        <p>ההזמנה שלך התקבלה בהצלחה ואנחנו שמחים לספק לך את השירות.</p>
        
        <h2>📋 פרטי הזמנה</h2>
        <p><strong>מספר הזמנה:</strong> ${order.order_number}</p>
        <p><strong>תאריך:</strong> ${new Date().toLocaleDateString('he-IL')}</p>
        
        <h2>🛒 פריטים שהוזמנו</h2>
        <table>
          <thead>
            <tr>
              <th>מוצר</th>
              <th>כמות</th>
              <th>מחיר</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>${currencySymbol}${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <p style="font-size: 18px; font-weight: bold; text-align: left;">
          <strong>סה"כ לתשלום:</strong> ${currencySymbol}${order.total.toFixed(2)}
        </p>
        
        ${downloadLinks.length > 0 ? `
          <div class="download-box">
            <h2 style="margin-top: 0;">📥 הקבצים שלך מוכנים להורדה!</h2>
            <p>לחץ על הכפתורים למטה להורדת הקבצים שרכשת:</p>
            
            ${downloadLinks.map(link => `
              <div style="margin: 15px 0; padding: 15px; background-color: white; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; font-weight: bold;">📄 ${link.product_title}</p>
                <a href="${link.download_url}" class="download-btn">
                  ⬇️ הורד עכשיו
                </a>
                <p style="font-size: 12px; color: #666; margin: 10px 0 0 0;">
                  • מקסימום ${link.max_downloads} הורדות<br>
                  • תוקף עד: ${link.expiry_date.toLocaleDateString('he-IL')}
                </p>
              </div>
            `).join('')}
            
            <div class="warning">
              <strong>⚠️ חשוב לדעת:</strong>
              <ul style="margin: 10px 0 0 0;">
                <li>הלינקים תקפים למספר ימים מוגבל</li>
                <li>מספר ההורדות מוגבל</li>
                <li>שמור את הקבצים במחשב שלך לשימוש עתידי</li>
              </ul>
            </div>
          </div>
        ` : `
          <div class="warning">
            <strong>💳 התשלום</strong>
            <p>נציג יצור איתך קשר בקרוב להשלמת התשלום.</p>
          </div>
        `}
        
        <h2>📞 יצירת קשר</h2>
        <p>יש לך שאלות? נשמח לעזור!</p>
        <ul>
          <li>📧 אימייל: support@snirfain.com</li>
          <li>📱 טלפון: 050-1234567</li>
        </ul>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <p style="text-align: center; color: #666; font-size: 14px;">
          תודה שבחרת בשניר פיינשטיין!<br>
          © ${new Date().getFullYear()} כל הזכויות שמורות
        </p>
      </div>
    </body>
    </html>
    `;
  };
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-2">העגלה ריקה</h2>
            <p className="text-[#233071]">אין פריטים לתשלום</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">ההזמנה התקבלה!</h2>
            <p className="text-[#233071] mb-4">
              מספר הזמנה: <strong>{orderId}</strong>
            </p>
            <p className="text-[#233071] mb-6">
              שלחנו לך אימייל עם פרטי ההזמנה. נציג יצור איתך קשר בקרוב.
            </p>
            <Button onClick={() => window.location.href = createPageUrl("Shop")}>
              חזור לחנות
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount
  const discount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? subtotal * (appliedCoupon.value / 100)
      : appliedCoupon.value
    : 0;
  
  const total = subtotal - discount;
  const currencySymbol = cart[0]?.currency === 'ILS' ? '₪' : '$';
  
  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-2">השלמת הזמנה</h1>
        <p className="text-[#233071] mb-8">זמן משוער: 2-3 דקות</p>
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className="text-xs mt-2 font-medium">פרטים</span>
            </div>
            
            {/* Line 1 */}
            <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > 2 ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className="text-xs mt-2 font-medium">תשלום</span>
            </div>
            
            {/* Line 2 */}
            <div className={`h-1 flex-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > 3 ? <Check className="h-5 w-5" /> : '3'}
              </div>
              <span className="text-xs mt-2 font-medium">אישור</span>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-6">פרטי הלקוח</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="fullName">שם מלא *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">אימייל *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formData.email && !validateEmail(formData.email) ? 'border-red-500' : ''}
                        required
                      />
                      {formData.email && !validateEmail(formData.email) && (
                        <p className="text-red-500 text-sm mt-1">כתובת אימייל לא תקינה</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">טלפון (10 ספרות) *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData({
                            ...formData,
                            phone: value
                          });
                        }}
                        placeholder="0501234567"
                        maxLength={10}
                        className={formData.phone && !validatePhone(formData.phone) ? 'border-red-500' : ''}
                        required
                      />
                      {formData.phone && !validatePhone(formData.phone) && (
                        <p className="text-red-500 text-sm mt-1">מספר הטלפון חייב להכיל בדיוק 10 ספרות</p>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-6">אמצעי תשלום</h2>
                  
                  <Alert className="mb-6 border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-800" />
                    <AlertDescription className="text-blue-800 text-sm">
                      <strong>איך זה עובד?</strong>
                      <ol className="list-decimal mr-4 mt-2 space-y-1">
                        <li>לחץ על "שלח הזמנה" למטה</li>
                        <li>תקבל מייל אישור עם לינקים להורדה</li>
                        <li>נציג יצור איתך קשר להשלמת התשלום</li>
                      </ol>
                    </AlertDescription>
                  </Alert>
                  
                  {/* Trust Badges */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Lock className="h-5 w-5 text-green-600" />
                      <h3 className="font-bold">תשלום מאובטח ובטוח</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <Shield className="h-6 w-6 text-blue-800 mx-auto mb-1" />
                        <p className="font-medium">הצפנת SSL</p>
                      </div>
                      <div>
                        <Zap className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                        <p className="font-medium">גישה מיידית</p>
                      </div>
                      <div>
                        <Users className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                        <p className="font-medium">500+ לקוחות</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg text-white"
                    disabled={isProcessing}
                    onClick={() => setCurrentStep(2)}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2 "></div>
                        מעבד את ההזמנה...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 ml-2 text-white" />
                        שלח הזמנה
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    בלחיצה על "שלח הזמנה" אתה מאשר את <a href={createPageUrl("TermsOfService")} className="underline">תנאי השימוש</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">סיכום הזמנה</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} x{item.quantity}</span>
                      <span className="font-semibold">{currencySymbol}{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>סכום ביניים</span>
                    <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>הנחה ({appliedCoupon?.code})</span>
                      <span>-{currencySymbol}{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>סה"כ לתשלום</span>
                    <span className="text-blue-800">{currencySymbol}{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
