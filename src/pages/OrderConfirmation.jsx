import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Download, Package, Mail, Phone, ExternalLink, Clock, Shield } from "lucide-react";

export default function OrderConfirmation() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Load order details from URL params or local storage
    const savedOrder = localStorage.getItem('lastOrder');
    const savedDownloads = localStorage.getItem('lastOrderDownloads');
    
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
    
    if (savedDownloads) {
      setDownloadLinks(JSON.parse(savedDownloads));
    }
    
    // Get order ID from URL
    const orderId = searchParams.get('order_id');
    const status = searchParams.get('status');
    
    if (orderId) {
      // Could fetch order details from API here
      console.log('Order ID:', orderId, 'Status:', status);
    }
  }, [searchParams]);

  const formatCurrency = (amount) => {
    return `₪${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">תודה על הרכישה!</h1>
            <p className="text-lg text-[#233071]">ההזמנה שלך התקבלה בהצלחה</p>
          </div>

          {orderDetails && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-bold mb-2">פרטי ההזמנה</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">מספר הזמנה</p>
                      <p className="font-semibold">#{orderDetails.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">תאריך</p>
                      <p className="font-semibold">{new Date().toLocaleDateString('he-IL')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">סה"כ ששולם</p>
                      <p className="font-semibold text-lg">{formatCurrency(orderDetails.total)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">אמצעי תשלום</p>
                      <p className="font-semibold">כרטיס אשראי</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">מוצרים שנרכשו:</h3>
                  <div className="space-y-2">
                    {orderDetails.items && orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">כמות: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Immediate Download Section */}
          {downloadLinks && downloadLinks.length > 0 ? (
            <Card className="mb-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">🎉 הקבצים שלך מוכנים!</h2>
                  <p className="text-[#233071]">
                    לחץ על הכפתורים למטה כדי להוריד את המוצרים שרכשת
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {downloadLinks.map((link, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{link.product_title}</h3>
                          <div className="flex items-center gap-4 text-xs text-[#233071]">
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              עד {link.max_downloads} הורדות
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              תוקף עד {new Date(link.expiry_date).toLocaleDateString('he-IL')}
                            </span>
                          </div>
                        </div>
                        <a href={link.download_url} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="bg-green-600 hover:bg-green-700">
                            <Download className="h-4 w-4 ml-2" />
                            הורד עכשיו
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Alert className="bg-orange-50 border-orange-200">
                  <Shield className="h-4 w-4 text-orange-500" />
                  <AlertDescription className="text-sm text-orange-800">
                    <strong>חשוב לדעת:</strong>
                    <ul className="list-disc mr-5 mt-2 space-y-1">
                      <li>הלינקים תקפים למספר ימים מוגבל - הורד עכשיו!</li>
                      <li>שמור את הקבצים במחשב שלך לשימוש עתידי</li>
                      <li>גם שלחנו לך את הלינקים במייל לגיבוי</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Download className="h-6 w-6 text-blue-800" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">המוצרים שלך בדרך</h3>
                    <p className="text-sm text-[#233071] mb-4">
                      שלחנו לך מייל עם קישור להורדה. בדוק את תיבת הדואר שלך (כולל ספאם).
                    </p>
                    <Link to={createPageUrl("Downloads")}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 ml-2" />
                        עבור לדף ההורדות
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">מה הלאה?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-800 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">בדוק את המייל שלך</h4>
                    <p className="text-sm text-[#233071]">
                      שלחנו אליך אישור הזמנה וקישור להורדה ל-{orderDetails?.email || 'האימייל שלך'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-blue-800 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">עקוב אחרי ההזמנה</h4>
                    <p className="text-sm text-[#233071]">
                      ניתן לעקוב אחרי ההזמנה והמוצרים שלך בדשבורד האישי
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-800 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">צריך עזרה?</h4>
                    <p className="text-sm text-[#233071]">
                      אנחנו כאן בשבילך! צור קשר ב-050-3133641 או snirfain@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to={createPageUrl("Dashboard")} className="flex-1">
              <Button variant="outline" className="w-full">
                לדשבורד שלי
              </Button>
            </Link>
            <Link to={createPageUrl("Shop")} className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                המשך קניות
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}