
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/api/entities";
import { Order } from "@/api/entities";
import { Coupon } from "@/api/entities";
import { User } from "@/api/entities";
import { SiteContent } from "@/api/entities";
import { PolicyPages } from "@/api/entities";
import { FAQ } from "@/api/entities";
import { SendEmail } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { 
  Save, 
  Edit, 
  Trash, 
  Eye, 
  Plus, 
  Package,
  DollarSign,
  TrendingUp,
  Settings,
  Upload,
  ShoppingCart,
  Users,
  Lock,
  User as UserIcon,
  LayoutGrid,
  FileText,
  RefreshCw
} from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [siteContent, setSiteContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [selectedPage, setSelectedPage] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [availablePages, setAvailablePages] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [policyPages, setPolicyPages] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [faqFilter, setFaqFilter] = useState('all');
  
  // Edit states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    products: [],
    discount_percentage: 0,
    status: 'paid',
    payment_method: 'manual',
    notes: ''
  });

  const checkAdminAccess = async () => {
    try {
      // Try to get current user from localStorage first
      const storedUser = localStorage.getItem('currentUser');
      console.log('🔍 Admin Access Check - Stored User:', storedUser ? 'Found' : 'Not Found');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('👤 User Email:', user?.email);
        console.log('✅ Required Email: snirfain@gmail.com');
        
        // Check if user email is snirfain@gmail.com
        if (user && user.email === 'snirfain@gmail.com') {
          console.log('✅ Access Granted!');
          setCurrentUser(user);
          loadAllData();
        } else {
          console.log('❌ Access Denied - Wrong Email');
          setErrorMessage(`אין לך הרשאות גישה לפאנל האדמין. רק המייל snirfain@gmail.com יכול לגשת. (המייל שלך: ${user?.email || 'לא ידוע'})`);
        }
      } else {
        console.log('⚠️ No stored user - trying User.me()...');
        // Try User.me() as fallback
        try {
          const user = await User.me();
          console.log('👤 User.me() returned:', user?.email);
          
          if (user && user.email === 'snirfain@gmail.com') {
            console.log('✅ Access Granted via User.me()!');
            setCurrentUser(user);
            loadAllData();
          } else {
            console.log('❌ Access Denied via User.me() - Wrong Email');
            setErrorMessage(`אין לך הרשאות גישה לפאנל האדמין. רק המייל snirfain@gmail.com יכול לגשת. (המייל שלך: ${user?.email || 'לא ידוע'})`);
          }
        } catch (error) {
          console.error("❌ User.me() failed:", error);
          setErrorMessage("נדרשת התחברות - אנא התחבר תחילה");
        }
      }
    } catch (error) {
      console.error("❌ Error parsing user data:", error);
      setErrorMessage("שגיאה בטעינת נתוני המשתמש");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = createPageUrl("Login");
  };

  useEffect(() => {
    checkAdminAccess();
  }, []);
  
  // Filter site content when page or section changes
  useEffect(() => {
    let filtered = siteContent;
    
    if (selectedPage !== 'all') {
      filtered = filtered.filter(c => c.page === selectedPage);
    }
    
    if (selectedSection !== 'all') {
      filtered = filtered.filter(c => c.section === selectedSection);
    }
    
    setFilteredContent(filtered);
  }, [siteContent, selectedPage, selectedSection]);
  
  // Extract unique pages and sections when site content loads
  useEffect(() => {
    const pages = [...new Set(siteContent.map(c => c.page))].sort();
    const sections = [...new Set(siteContent.map(c => c.section))].sort();
    setAvailablePages(pages);
    setAvailableSections(sections);
  }, [siteContent]);
  
  const loadAllData = async () => {
    try {
      const [productsData, ordersData, couponsData, customersData, contentData, policyData, faqDataFromAPI] = await Promise.all([
        Product.list('-created_date'),
        Order.list('-created_date'),
        Coupon.list('-created_date'),
        User.list(),
        SiteContent.list('order'),
        PolicyPages.getAll(),
        FAQ.getAll()
      ]);
      
      console.log('🔍 Policy Pages Loaded:', policyData);
      console.log('🔍 FAQ Data Loaded:', faqDataFromAPI);
      
      setProducts(productsData);
      setOrders(ordersData);
      setCoupons(couponsData);
      setCustomers(customersData);
      setSiteContent(contentData);
      setPolicyPages(policyData);
      setFaqData(faqDataFromAPI);
      
      console.log('✅ Policy Pages State Set:', policyData.length, 'pages');
      console.log('✅ FAQ Data State Set:', faqDataFromAPI.length, 'questions');
    } catch (error) {
      console.error("❌ Error loading data:", error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await User.logout();
      setCurrentUser(null);
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      return file_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("שגיאה בהעלאת הקובץ");
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  const saveProduct = async () => {
    try {
      if (editingProduct.id && editingProduct.id !== 'new') {
        await Product.update(editingProduct.id, editingProduct);
      } else {
        await Product.create(editingProduct);
      }
      setEditingProduct(null);
      loadAllData();
      alert("המוצר נשמר בהצלחה!");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("שגיאה בשמירת המוצר");
    }
  };
  
  const deleteProduct = async (id) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) return;
    
    try {
      await Product.delete(id);
      loadAllData();
      alert("המוצר נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("שגיאה במחיקת המוצר");
    }
  };
  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await Order.update(orderId, { status: newStatus });
      loadAllData();
      alert("סטטוס ההזמנה עודכן");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("שגיאה בעדכון ההזמנה");
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it's exactly 10 digits
    return digitsOnly.length === 10;
  };

  const createManualOrder = async () => {
    try {
      // Validate required fields
      if (!newOrder.customer_name || !newOrder.customer_email || newOrder.products.length === 0) {
        alert("יש למלא את כל השדות החובה ולבחור לפחות מוצר אחד");
        return;
      }

      // Validate email format
      if (!validateEmail(newOrder.customer_email)) {
        alert("כתובת האימייל אינה תקינה. אנא הזן כתובת אימייל תקינה");
        return;
      }

      // Validate phone if provided
      if (newOrder.customer_phone && !validatePhone(newOrder.customer_phone)) {
        alert("מספר הטלפון חייב להכיל בדיוק 10 ספרות");
        return;
      }

      // Calculate total
      const subtotal = newOrder.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = subtotal * (newOrder.discount_percentage / 100);
      const total = subtotal - discount;

      // Create order
      const orderData = {
        ...newOrder,
        subtotal,
        discount_amount: discount,
        total,
        currency: 'ILS',
        order_number: `MANUAL-${Date.now()}`,
        created_date: new Date().toISOString()
      };

      await Order.create(orderData);

      // Send confirmation email
      await SendEmail({
        to: newOrder.customer_email,
        subject: `אישור הזמנה - ${orderData.order_number}`,
        template: 'order_confirmation',
        data: {
          customer_name: newOrder.customer_name,
          order_number: orderData.order_number,
          products: newOrder.products,
          subtotal,
          discount_amount: discount,
          discount_percentage: newOrder.discount_percentage,
          total,
          currency: 'ILS'
        }
      });
      
      console.log("📧 Email sent successfully to:", newOrder.customer_email);

      // Reset form and close
      setNewOrder({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        products: [],
        discount_percentage: 0,
        status: 'paid',
        payment_method: 'manual',
        notes: ''
      });
      setIsCreatingOrder(false);
      loadAllData();
      alert("ההזמנה נוצרה בהצלחה! (מייל יישלח ללקוח)");
    } catch (error) {
      console.error("Error creating manual order:", error);
      alert("שגיאה ביצירת ההזמנה");
    }
  };

  const addProductToNewOrder = (product) => {
    const existing = newOrder.products.find(p => p.product_id === product.id);
    if (existing) {
      setNewOrder({
        ...newOrder,
        products: newOrder.products.map(p => 
          p.product_id === product.id 
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      });
    } else {
      setNewOrder({
        ...newOrder,
        products: [...newOrder.products, {
          product_id: product.id,
          product_title: product.title,
          price: product.price,
          quantity: 1
        }]
      });
    }
  };

  const removeProductFromNewOrder = (productId) => {
    setNewOrder({
      ...newOrder,
      products: newOrder.products.filter(p => p.product_id !== productId)
    });
  };

  const updateProductQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeProductFromNewOrder(productId);
      return;
    }
    setNewOrder({
      ...newOrder,
      products: newOrder.products.map(p => 
        p.product_id === productId 
          ? { ...p, quantity }
          : p
      )
    });
  };
  
  const saveCoupon = async () => {
    try {
      if (editingCoupon.id && editingCoupon.id !== 'new') {
        await Coupon.update(editingCoupon.id, editingCoupon);
      } else {
        await Coupon.create(editingCoupon);
      }
      setEditingCoupon(null);
      loadAllData();
      alert("הקופון נשמר בהצלחה!");
    } catch (error) {
      console.error("Error saving coupon:", error);
      alert("שגיאה בשמירת הקופון");
    }
  };
  
  const deleteCoupon = async (id) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק קופון זה?")) return;
    
    try {
      await Coupon.delete(id);
      loadAllData();
      alert("הקופון נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("שגיאה במחיקת הקופון");
    }
  };

  const saveContent = async () => {
    try {
      if (editingContent.id && editingContent.id !== 'new') {
        await SiteContent.update(editingContent.id, editingContent);
      } else {
        await SiteContent.create(editingContent);
      }
      setEditingContent(null);
      loadAllData();
      alert("התוכן נשמר בהצלחה!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("שגיאה בשמירת התוכן");
    }
  };

  const deleteContent = async (id) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק תוכן זה?")) return;
    
    try {
      await SiteContent.delete(id);
      loadAllData();
      alert("התוכן נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("שגיאה במחיקת התוכן");
    }
  };
  
  const savePolicyPage = async () => {
    try {
      await PolicyPages.update(editingPolicy.id, editingPolicy);
      setEditingPolicy(null);
      loadAllData();
      alert("הדף נשמר בהצלחה!");
    } catch (error) {
      console.error("Error saving policy page:", error);
      alert("שגיאה בשמירת הדף");
    }
  };

  // FAQ Management Functions
  const saveFAQ = async () => {
    try {
      if (editingFAQ.id) {
        await FAQ.update(editingFAQ.id, editingFAQ);
        alert("השאלה עודכנה בהצלחה!");
      } else {
        await FAQ.create(editingFAQ);
        alert("השאלה נוספה בהצלחה!");
      }
      setEditingFAQ(null);
      loadAllData();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("שגיאה בשמירת השאלה");
    }
  };

  const deleteFAQ = async (id) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק שאלה זו?")) return;
    try {
      await FAQ.delete(id);
      loadAllData();
      alert("השאלה נמחקה בהצלחה!");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("שגיאה במחיקת השאלה");
    }
  };

  const filteredFAQs = faqFilter === 'all' 
    ? faqData 
    : faqData.filter(f => f.category === faqFilter);
  
  const formatCurrency = (amount, currency = 'ILS') => {
    const symbols = { ILS: '₪', USD: '$', EUR: '€' };
    return `${symbols[currency]}${amount.toFixed(2)}`;
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('he-IL');
  };
  
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-orange-100 text-orange-800',
      paid: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-[#233071]'
    };
    return colors[status] || 'bg-gray-100 text-[#233071]';
  };
  
  const getStatusText = (status) => {
    const texts = {
      pending: 'ממתין',
      paid: 'שולם',
      completed: 'הושלם',
      cancelled: 'בוטל',
      refunded: 'הוחזר'
    };
    return texts[status] || status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <Card className="w-full max-w-md p-8 shadow-xl border-blue-200">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-[#233071]">בודק הרשאות גישה...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100" dir="rtl">
        <Card className="w-full max-w-md p-6 shadow-xl border-blue-200">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-800" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">גישה לפאנל האדמין</CardTitle>
            <p className="text-gray-500 mt-2">נדרשת התחברות עם משתמש מנהל</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {errorMessage}
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md text-sm">
                <p className="font-semibold mb-2">📋 הוראות גישה:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>לחץ על "התחבר למערכת"</li>
                  <li>התחבר עם המייל: <strong className="text-blue-900">snirfain@gmail.com</strong></li>
                  <li>רק מייל זה יכול לגשת לפאנל האדמין</li>
                </ol>
                <p className="mt-2 text-xs">💡 פתח את Console (F12) לפרטים נוספים</p>
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 py-5 text-lg"
              >
                <UserIcon className="h-5 w-5 ml-2" />
                התחבר למערכת
              </Button>
              
              <Button 
                onClick={() => {
                  const stored = localStorage.getItem('currentUser');
                  console.log('🔍 Debug - Full localStorage:', stored);
                  if (stored) {
                    const user = JSON.parse(stored);
                    alert(`✅ מחובר כעת עם המייל:\n${user.email}\n\n🔒 נדרש:\nsnirfain@gmail.com\n\n${user.email === 'snirfain@gmail.com' ? '✅ המייל תואם!' : '❌ המייל לא תואם - צא והתחבר שוב.'}`);
                  } else {
                    alert('❌ אין משתמש מחובר כרגע.\n\nלחץ על "התחבר למערכת" כדי להתחבר.');
                  }
                }}
                variant="outline"
                className="w-full"
              >
                🔍 בדוק מצב התחברות
              </Button>
              
              <Link to={createPageUrl("Home")}>
                <Button variant="outline" className="w-full">
                  חזור לדף הבית
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-blue-800" />
              <h1 className="text-xl font-bold text-[#233071]">מערכת ניהול - פאנל אדמין</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                התנתק
              </Button>
              <Link to={createPageUrl("Home")}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  <span>הצג את האתר</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>לוח בקרה</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>מוצרים</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>הזמנות</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>לקוחות</span>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>קופונים</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>תוכן האתר</span>
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>דפי מדיניות</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>שאלות ותשובות</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>הגדרות</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">סה"כ מכירות</p>
                      <h3 className="text-2xl font-bold">
                        {formatCurrency(orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0))}
                      </h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">הזמנות</p>
                      <h3 className="text-2xl font-bold">{orders.length}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <ShoppingCart className="w-6 h-6 text-blue-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">מוצרים</p>
                      <h3 className="text-2xl font-bold">{products.length}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">לקוחות</p>
                      <h3 className="text-2xl font-bold">{customers.length}</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>הזמנות אחרונות</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.created_date)} | {formatCurrency(order.total, order.currency)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">אין הזמנות עדיין</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>מוצרים פופולריים</CardTitle>
                </CardHeader>
                <CardContent>
                  {products.length > 0 ? (
                    <div className="space-y-4">
                      {products.filter(p => p.featured).slice(0, 5).map(product => (
                        <div key={product.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            {product.image_url && (
                              <img src={product.image_url} alt={product.title} className="w-12 h-12 object-cover rounded" />
                            )}
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-gray-500">{formatCurrency(product.price, product.currency)}</p>
                            </div>
                          </div>
                          <Badge>{product.category}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">אין מוצרים עדיין</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ניהול מוצרים</h2>
              <Button 
                onClick={() => setEditingProduct({
                  id: 'new',
                  title: '',
                  description: '',
                  short_description: '',
                  price: 0,
                  currency: 'ILS',
                  category: 'templates',
                  tags: [],
                  image_url: '',
                  gallery_images: [],
                  digital_file_url: '',
                  is_digital: true,
                  max_downloads: 3,
                  download_expiry_days: 30,
                  is_active: true,
                  stock: 999,
                  featured: false
                })}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 ml-2" />
                הוסף מוצר חדש
              </Button>
            </div>
            
            {editingProduct ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingProduct.id === 'new' ? 'מוצר חדש' : 'עריכת מוצר'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>שם המוצר *</Label>
                        <Input
                          value={editingProduct.title}
                          onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                          placeholder="לדוגמה: תבנית הדרכה מתקדמת"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>קטגוריה *</Label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="checklists">צ'קליסטים</option>
                          <option value="templates">תבניות</option>
                          <option value="courses">קורסים</option>
                          <option value="consulting">ייעוץ</option>
                          <option value="other">אחר</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>מחיר *</Label>
                        <Input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                          placeholder="99.00"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>מטבע</Label>
                        <select
                          value={editingProduct.currency}
                          onChange={(e) => setEditingProduct({...editingProduct, currency: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="ILS">₪ שקל</option>
                          <option value="USD">$ דולר</option>
                          <option value="EUR">€ אירו</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>תיאור קצר</Label>
                      <Input
                        value={editingProduct.short_description}
                        onChange={(e) => setEditingProduct({...editingProduct, short_description: e.target.value})}
                        placeholder="תיאור קצר שיוצג בכרטיס המוצר"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>תיאור מפורט *</Label>
                      <Textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                        placeholder="תיאור מפורט של המוצר, מה כולל, יתרונות וכו'"
                        rows={5}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>תמונה ראשית</Label>
                      <div className="flex gap-2">
                        <Input
                          value={editingProduct.image_url}
                          onChange={(e) => setEditingProduct({...editingProduct, image_url: e.target.value})}
                          placeholder="URL לתמונה או העלה קובץ"
                        />
                        <Button 
                          variant="outline"
                          disabled={isUploading}
                          onClick={() => document.getElementById('image-upload').click()}
                        >
                          {isUploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const url = await handleImageUpload(e);
                            if (url) setEditingProduct({...editingProduct, image_url: url});
                          }}
                        />
                      </div>
                      {editingProduct.image_url && (
                        <img src={editingProduct.image_url} alt="תצוגה מקדימה" className="w-32 h-32 object-cover rounded mt-2" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>קובץ דיגיטלי</Label>
                      <Input
                        value={editingProduct.digital_file_url}
                        onChange={(e) => setEditingProduct({...editingProduct, digital_file_url: e.target.value})}
                        placeholder="URL לקובץ הדיגיטלי (PDF, ZIP וכו')"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>מקסימום הורדות</Label>
                        <Input
                          type="number"
                          value={editingProduct.max_downloads}
                          onChange={(e) => setEditingProduct({...editingProduct, max_downloads: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>תוקף הורדה (ימים)</Label>
                        <Input
                          type="number"
                          value={editingProduct.download_expiry_days}
                          onChange={(e) => setEditingProduct({...editingProduct, download_expiry_days: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>מלאי</Label>
                        <Input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editingProduct.is_active}
                          onChange={(e) => setEditingProduct({...editingProduct, is_active: e.target.checked})}
                          className="rounded"
                        />
                        <span>מוצר פעיל</span>
                      </label>
                      
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editingProduct.featured}
                          onChange={(e) => setEditingProduct({...editingProduct, featured: e.target.checked})}
                          className="rounded"
                        />
                        <span>מוצר מומלץ</span>
                      </label>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingProduct(null)}>
                        ביטול
                      </Button>
                      <Button onClick={saveProduct} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="h-4 w-4 ml-2" />
                        שמור מוצר
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.title} className="w-full h-40 object-cover rounded mb-3" />
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">{product.title}</h3>
                          <p className="text-sm text-gray-500">{formatCurrency(product.price, product.currency)}</p>
                        </div>
                        <Badge>{product.category}</Badge>
                      </div>
                      <p className="text-sm text-[#233071] line-clamp-2 mb-3">{product.short_description}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={product.is_active ? 'text-green-600' : 'text-red-600'}>
                          {product.is_active ? 'פעיל' : 'לא פעיל'}
                        </Badge>
                        {product.featured && <Badge className="bg-orange-100 text-orange-800">מומלץ</Badge>}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                          <Edit className="h-3 w-3 ml-1" />
                          ערוך
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                          <Trash className="h-3 w-3 ml-1" />
                          מחק
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ניהול הזמנות</h2>
              <Button 
                onClick={() => setIsCreatingOrder(true)}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 gap-2 text-white"
              >
                <Plus className="h-4 w-4" />
                הוסף הזמנה ידנית
              </Button>
            </div>

            {/* Manual Order Creation Form */}
            {isCreatingOrder && (
              <Card className="border-2 border-orange-400">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>יצירת הזמנה ידנית</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsCreatingOrder(false)}
                    >
                      ביטול
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>שם הלקוח *</Label>
                      <Input
                        value={newOrder.customer_name}
                        onChange={(e) => setNewOrder({...newOrder, customer_name: e.target.value})}
                        placeholder="שם מלא"
                      />
                    </div>
                    <div>
                      <Label>אימייל *</Label>
                      <Input
                        type="email"
                        value={newOrder.customer_email}
                        onChange={(e) => setNewOrder({...newOrder, customer_email: e.target.value})}
                        placeholder="email@example.com"
                        className={newOrder.customer_email && !validateEmail(newOrder.customer_email) ? 'border-red-500' : ''}
                      />
                      {newOrder.customer_email && !validateEmail(newOrder.customer_email) && (
                        <p className="text-red-500 text-sm mt-1">כתובת אימייל לא תקינה</p>
                      )}
                    </div>
                    <div>
                      <Label>טלפון (10 ספרות)</Label>
                      <Input
                        value={newOrder.customer_phone}
                        onChange={(e) => {
                          // Allow only digits and format as user types
                          const value = e.target.value.replace(/\D/g, '');
                          setNewOrder({...newOrder, customer_phone: value});
                        }}
                        placeholder="0501234567"
                        maxLength={10}
                        className={newOrder.customer_phone && !validatePhone(newOrder.customer_phone) ? 'border-red-500' : ''}
                      />
                      {newOrder.customer_phone && !validatePhone(newOrder.customer_phone) && (
                        <p className="text-red-500 text-sm mt-1">מספר הטלפון חייב להכיל בדיוק 10 ספרות</p>
                      )}
                    </div>
                  </div>

                  {/* Product Selection */}
                  <div>
                    <Label>בחר מוצרים *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                      {products.map(product => (
                        <Button
                          key={product.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addProductToNewOrder(product)}
                          className="h-auto py-2 text-right flex-col items-start"
                        >
                          <span className="font-semibold text-xs">{product.title}</span>
                          <span className="text-xs text-gray-500">{product.price}₪</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Products */}
                  {newOrder.products.length > 0 && (
                    <div>
                      <Label>מוצרים שנבחרו</Label>
                      <div className="space-y-2 mt-2">
                        {newOrder.products.map(item => (
                          <div key={item.product_id} className="flex items-center gap-2 p-2 border rounded-md">
                            <span className="flex-1">{item.product_title}</span>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateProductQuantity(item.product_id, parseInt(e.target.value))}
                              className="w-20"
                            />
                            <span className="w-20 text-left">{(item.price * item.quantity).toFixed(2)}₪</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProductFromNewOrder(item.product_id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                        <div className="space-y-1 p-2 bg-gray-50 rounded-md">
                          <div className="flex justify-between text-sm">
                            <span>סכום ביניים:</span>
                            <span>{newOrder.products.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}₪</span>
                          </div>
                          {newOrder.discount_percentage > 0 && (
                            <div className="flex justify-between text-sm text-orange-600">
                              <span>הנחה ({newOrder.discount_percentage}%):</span>
                              <span>-{(newOrder.products.reduce((sum, item) => sum + (item.price * item.quantity), 0) * newOrder.discount_percentage / 100).toFixed(2)}₪</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-lg border-t pt-1">
                            <span>סה"כ:</span>
                            <span>{(newOrder.products.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (1 - newOrder.discount_percentage / 100)).toFixed(2)}₪</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Discount, Status and Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>אחוז הנחה (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={newOrder.discount_percentage}
                        onChange={(e) => setNewOrder({...newOrder, discount_percentage: Math.max(0, Math.min(100, parseFloat(e.target.value) || 0))})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label>סטטוס</Label>
                      <select
                        value={newOrder.status}
                        onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                        className="w-full p-2 border rounded-md bg-white text-[#233071] font-medium"
                      >
                        <option value="pending">⏳ ממתין</option>
                        <option value="paid">✅ שולם</option>
                        <option value="completed">🎉 הושלם</option>
                      </select>
                    </div>
                    <div>
                      <Label>הערות פנימיות</Label>
                      <Input
                        value={newOrder.notes}
                        onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                        placeholder="הערות..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingOrder(false)}
                    >
                      ביטול
                    </Button>
                    <Button
                      onClick={createManualOrder}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Save className="h-4 w-4 ml-2" />
                      צור הזמנה
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">הזמנה #{order.order_number || order.id.slice(0, 8)}</h3>
                        <p className="text-sm text-gray-500">
                          {order.customer_name} | {order.customer_email}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(order.created_date)}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold">{formatCurrency(order.total, order.currency)}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">מוצרים:</h4>
                      {order.products && order.products.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm mb-1">
                          <span>{item.product_title} x{item.quantity}</span>
                          <span>{formatCurrency(item.price * item.quantity, order.currency)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Label className="text-sm font-medium">עדכון סטטוס:</Label>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="flex-1 p-2 px-3 border-2 border-gray-300 rounded-lg bg-white text-[#233071] font-medium shadow-sm hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      >
                        <option value="pending">⏳ ממתין לתשלום</option>
                        <option value="paid">✅ שולם</option>
                        <option value="completed">🎉 הושלם</option>
                        <option value="cancelled">❌ בוטל</option>
                        <option value="refunded">💰 הוחזר</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {orders.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-[#233071]">אין הזמנות עדיין</h3>
                    <p className="text-gray-500">הזמנות חדשות יופיעו כאן</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ניהול לקוחות</h2>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4">שם</th>
                        <th className="text-right py-3 px-4">אימייל</th>
                        <th className="text-right py-3 px-4">תפקיד</th>
                        <th className="text-right py-3 px-4">תאריך הצטרפות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id} className="border-b">
                          <td className="py-3 px-4">{customer.full_name}</td>
                          <td className="py-3 px-4">{customer.email}</td>
                          <td className="py-3 px-4">
                            <Badge>{customer.role === 'admin' ? 'מנהל' : 'משתמש'}</Badge>
                          </td>
                          <td className="py-3 px-4">{formatDate(customer.created_date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ניהול קופונים</h2>
              <Button 
                onClick={() => setEditingCoupon({
                  id: 'new',
                  code: '',
                  discount_type: 'percentage',
                  discount_value: 0,
                  min_purchase: 0,
                  max_uses: null,
                  uses_count: 0,
                  expiry_date: '',
                  is_active: true,
                  applicable_categories: []
                })}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 ml-2 text-white" />
                הוסף קופון חדש
              </Button>
            </div>
            
            {editingCoupon ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingCoupon.id === 'new' ? 'קופון חדש' : 'עריכת קופון'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>קוד קופון *</Label>
                        <Input
                          value={editingCoupon.code}
                          onChange={(e) => setEditingCoupon({...editingCoupon, code: e.target.value.toUpperCase()})}
                          placeholder="SUMMER2024"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>סוג הנחה *</Label>
                        <select
                          value={editingCoupon.discount_type}
                          onChange={(e) => setEditingCoupon({...editingCoupon, discount_type: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="percentage">אחוזים</option>
                          <option value="fixed">סכום קבוע</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>ערך הנחה *</Label>
                        <Input
                          type="number"
                          value={editingCoupon.discount_value}
                          onChange={(e) => setEditingCoupon({...editingCoupon, discount_value: parseFloat(e.target.value)})}
                          placeholder={editingCoupon.discount_type === 'percentage' ? '10' : '50'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>קנייה מינימלית</Label>
                        <Input
                          type="number"
                          value={editingCoupon.min_purchase}
                          onChange={(e) => setEditingCoupon({...editingCoupon, min_purchase: parseFloat(e.target.value)})}
                          placeholder="0"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>מספר שימושים מקסימלי</Label>
                        <Input
                          type="number"
                          value={editingCoupon.max_uses || ''}
                          onChange={(e) => setEditingCoupon({...editingCoupon, max_uses: e.target.value ? parseInt(e.target.value) : null})}
                          placeholder="ללא הגבלה"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>תאריך תפוגה</Label>
                        <Input
                          type="date"
                          value={editingCoupon.expiry_date}
                          onChange={(e) => setEditingCoupon({...editingCoupon, expiry_date: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editingCoupon.is_active}
                          onChange={(e) => setEditingCoupon({...editingCoupon, is_active: e.target.checked})}
                          className="rounded"
                        />
                        <span>קופון פעיל</span>
                      </label>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingCoupon(null)}>
                        ביטול
                      </Button>
                      <Button onClick={saveCoupon} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Save className="h-4 w-4 ml-2" />
                        שמור קופון
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map(coupon => (
                  <Card key={coupon.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{coupon.code}</h3>
                          <p className="text-sm text-gray-500">
                            {coupon.discount_type === 'percentage' 
                              ? `${coupon.discount_value}% הנחה`
                              : `₪${coupon.discount_value} הנחה`
                            }
                          </p>
                        </div>
                        <Badge className={coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {coupon.is_active ? 'פעיל' : 'לא פעיל'}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-[#233071] space-y-1 mb-3">
                        {coupon.min_purchase > 0 && <p>קנייה מינימלית: ₪{coupon.min_purchase}</p>}
                        {coupon.max_uses && <p>שימושים: {coupon.uses_count}/{coupon.max_uses}</p>}
                        {coupon.expiry_date && <p>תוקף עד: {formatDate(coupon.expiry_date)}</p>}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingCoupon(coupon)}>
                          <Edit className="h-3 w-3 ml-1" />
                          ערוך
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCoupon(coupon.id)}>
                          <Trash className="h-3 w-3 ml-1" />
                          מחק
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {coupons.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="p-12 text-center">
                      <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-[#233071]">אין קופונים עדיין</h3>
                      <p className="text-gray-500">צור קופון ראשון כדי להתחיל</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Content Management Tab - NEW */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ניהול תוכן האתר</h2>
              <Button 
                onClick={() => setEditingContent({
                  id: 'new',
                  page: 'home',
                  section: 'hero',
                  type: 'text',
                  key: '',
                  label: '',
                  value: '',
                  order: 0
                })}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>הוסף תוכן חדש</span>
              </Button>
            </div>
            
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>סינון לפי דף</Label>
                    <select
                      value={selectedPage}
                      onChange={(e) => setSelectedPage(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="all">כל הדפים</option>
                      {availablePages.map(page => (
                        <option key={page} value={page}>{page}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>סינון לפי סקציה</Label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="all">כל הסקציות</option>
                      {availableSections.map(section => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 text-sm text-[#233071]">
                  מציג {filteredContent.length} מתוך {siteContent.length} פריטים
                </div>
              </CardContent>
            </Card>
            
            {editingContent ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingContent.id === 'new' ? 'תוכן חדש' : 'עריכת תוכן'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>דף</Label>
                        <select
                          value={editingContent.page}
                          onChange={(e) => setEditingContent({...editingContent, page: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="home">Home (עמוד הבית)</option>
                          <option value="shop">Shop (חנות)</option>
                          <option value="about">About (אודות)</option>
                          <option value="contact">Contact (צור קשר)</option>
                          <option value="schedule">Schedule (קביעת פגישה)</option>
                          <option value="deals">Deals (מבצעים)</option>
                          <option value="cart">Cart (עגלת קניות)</option>
                          <option value="checkout">Checkout (תשלום)</option>
                          <option value="terms">Terms of Service (תנאי שימוש)</option>
                          <option value="privacy">Privacy Policy (מדיניות פרטיות)</option>
                          <option value="refund">Refund Policy (מדיניות ביטולים)</option>
                          <option value="global">Global (כללי - הדר/פוטר)</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>סקציה</Label>
                        <Input
                          value={editingContent.section}
                          onChange={(e) => setEditingContent({...editingContent, section: e.target.value})}
                          placeholder="למשל: hero, header, footer"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>סוג</Label>
                        <select
                          value={editingContent.type}
                          onChange={(e) => setEditingContent({...editingContent, type: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="text">Text (טקסט קצר)</option>
                          <option value="textarea">Textarea (טקסט ארוך)</option>
                          <option value="image">Image (תמונה)</option>
                          <option value="url">URL (קישור)</option>
                          <option value="number">Number (מספר)</option>
                          <option value="html">HTML</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>מפתח (Key)</Label>
                        <Input
                          value={editingContent.key}
                          onChange={(e) => setEditingContent({...editingContent, key: e.target.value})}
                          placeholder="למשל: hero_title"
                        />
                        <p className="text-xs text-gray-500">מזהה ייחודי לשימוש בקוד</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>תווית (Label)</Label>
                        <Input
                          value={editingContent.label}
                          onChange={(e) => setEditingContent({...editingContent, label: e.target.value})}
                          placeholder="למשל: כותרת ראשית - עמוד הבית"
                        />
                        <p className="text-xs text-gray-500">תיאור אנושי</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>ערך (Value)</Label>
                      {editingContent.type === 'textarea' || editingContent.type === 'html' ? (
                        <Textarea
                          value={editingContent.value}
                          onChange={(e) => setEditingContent({...editingContent, value: e.target.value})}
                          placeholder="הכנס את התוכן כאן"
                          rows={6}
                        />
                      ) : (
                        <Input
                          value={editingContent.value}
                          onChange={(e) => setEditingContent({...editingContent, value: e.target.value})}
                          placeholder="הכנס את התוכן כאן"
                        />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>סדר תצוגה</Label>
                      <Input
                        type="number"
                        value={editingContent.order}
                        onChange={(e) => setEditingContent({...editingContent, order: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingContent(null)}>
                        ביטול
                      </Button>
                      <Button onClick={saveContent} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        <span>שמור תוכן</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredContent.map(content => (
                  <Card key={content.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{content.page}</Badge>
                            <Badge className="bg-purple-100 text-purple-800">{content.section}</Badge>
                            <Badge className="bg-blue-100 text-blue-800">{content.type}</Badge>
                          </div>
                          <h3 className="font-bold text-lg">{content.label}</h3>
                          <p className="text-sm text-gray-500 font-mono bg-gray-50 p-1 rounded mt-1">{content.key}</p>
                          <p className="text-sm mt-2 line-clamp-2">{content.value}</p>
                          <p className="text-xs text-gray-400 mt-1">סדר: {content.order}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => setEditingContent(content)} className="flex items-center gap-1">
                            <Edit className="h-3 w-3" />
                            <span>ערוך</span>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteContent(content.id)} className="flex items-center gap-1">
                            <Trash className="h-3 w-3" />
                            <span>מחק</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredContent.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>לא נמצא תוכן</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Policy Pages Tab */}
          <TabsContent value="policies" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">דפי מדיניות</h2>
              <p className="text-[#233071]">ערוך את התוכן המלא של דפי המדיניות באתר</p>
              <p className="text-xs text-gray-400 mt-1">נמצאו {policyPages.length} דפים</p>
            </div>
            
            {policyPages.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">טוען דפי מדיניות...</h3>
                  <p className="text-gray-500">אם זה אורך זמן, נסה לרענן את הדף</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {policyPages.map(page => (
                <Card key={page.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{page.title}</span>
                      <Badge variant="outline">{page.slug}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      עדכון אחרון: {new Date(page.last_updated).toLocaleDateString('he-IL')}
                    </p>
                    <Button 
                      onClick={() => setEditingPolicy(page)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="h-4 w-4 ml-2" />
                      ערוך דף
                    </Button>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}
            
            {editingPolicy && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>עריכת {editingPolicy.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">ערוך את תוכן הדף המלא (HTML)</p>
                    </div>
                    <Button variant="outline" onClick={() => setEditingPolicy(null)}>
                      <Eye className="h-4 w-4 ml-2" />
                      סגור
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>כותרת הדף</Label>
                      <Input
                        value={editingPolicy.title}
                        onChange={(e) => setEditingPolicy({...editingPolicy, title: e.target.value})}
                        placeholder="כותרת הדף"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>תוכן HTML מלא</Label>
                      <p className="text-xs text-gray-500 mb-2">
                        💡 טיפ: אתה יכול להשתמש ב-HTML מלא כולל תגיות h1, h2, p, ul, li, strong ועוד
                      </p>
                      <Textarea
                        value={editingPolicy.content}
                        onChange={(e) => setEditingPolicy({...editingPolicy, content: e.target.value})}
                        placeholder="התוכן המלא של הדף ב-HTML..."
                        rows={25}
                        className="font-mono text-sm"
                        dir="ltr"
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h4 className="font-semibold mb-2">תצוגה מקדימה:</h4>
                      <div 
                        className="prose max-w-none bg-white p-4 rounded border"
                        dangerouslySetInnerHTML={{ __html: editingPolicy.content }}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingPolicy(null)}>
                        ביטול
                      </Button>
                      <Button onClick={savePolicyPage} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 ml-2" />
                        שמור שינויים
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">ניהול שאלות ותשובות</h2>
                <p className="text-[#233071]">הוסף, ערוך ומחק שאלות נפוצות באתר</p>
              </div>
              <Button 
                onClick={() => setEditingFAQ({
                  category: 'general',
                  categoryTitle: 'שאלות כלליות',
                  question: '',
                  answer: '',
                  order: filteredFAQs.length + 1
                })}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 ml-2" />
                הוסף שאלה חדשה
              </Button>
            </div>

            {/* FAQ Filter */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={faqFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setFaqFilter('all')}
              >
                הכל ({faqData.length})
              </Button>
              {['purchase', 'shipping', 'refund', 'privacy', 'terms', 'general'].map(cat => {
                const count = faqData.filter(f => f.category === cat).length;
                const labels = {
                  purchase: 'רכישה',
                  shipping: 'משלוח',
                  refund: 'החזרים',
                  privacy: 'פרטיות',
                  terms: 'תנאים',
                  general: 'כללי'
                };
                return (
                  <Button
                    key={cat}
                    variant={faqFilter === cat ? 'default' : 'outline'}
                    onClick={() => setFaqFilter(cat)}
                  >
                    {labels[cat]} ({count})
                  </Button>
                );
              })}
            </div>

            {/* FAQ List */}
            <div className="grid gap-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{faq.categoryTitle}</Badge>
                          <Badge variant="outline">סדר: {faq.order}</Badge>
                        </div>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingFAQ(faq)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteFAQ(faq.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#233071]">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}

              {filteredFAQs.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">אין שאלות בקטגוריה זו</h3>
                    <p className="text-gray-500">לחץ על "הוסף שאלה חדשה" כדי להתחיל</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Edit FAQ Dialog */}
            {editingFAQ && (
              <Card className="border-2 border-blue-500 shadow-xl">
                <CardHeader className="bg-blue-50">
                  <CardTitle>
                    {editingFAQ.id ? 'ערוך שאלה' : 'שאלה חדשה'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>קטגוריה</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={editingFAQ.category}
                        onChange={(e) => {
                          const labels = {
                            purchase: 'רכישה ותשלום',
                            shipping: 'משלוח והורדה',
                            refund: 'החזרים וביטולים',
                            privacy: 'פרטיות ואבטחה',
                            terms: 'תנאי שימוש',
                            general: 'שאלות כלליות'
                          };
                          setEditingFAQ({
                            ...editingFAQ,
                            category: e.target.value,
                            categoryTitle: labels[e.target.value]
                          });
                        }}
                      >
                        <option value="purchase">רכישה ותשלום</option>
                        <option value="shipping">משלוח והורדה</option>
                        <option value="refund">החזרים וביטולים</option>
                        <option value="privacy">פרטיות ואבטחה</option>
                        <option value="terms">תנאי שימוש</option>
                        <option value="general">שאלות כלליות</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>סדר הצגה</Label>
                      <Input
                        type="number"
                        value={editingFAQ.order || 1}
                        onChange={(e) => setEditingFAQ({...editingFAQ, order: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>השאלה</Label>
                    <Input
                      value={editingFAQ.question}
                      onChange={(e) => setEditingFAQ({...editingFAQ, question: e.target.value})}
                      placeholder="למשל: אילו אמצעי תשלום אתם מקבלים?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>התשובה</Label>
                    <Textarea
                      value={editingFAQ.answer}
                      onChange={(e) => setEditingFAQ({...editingFAQ, answer: e.target.value})}
                      placeholder="תשובה מפורטת לשאלה..."
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditingFAQ(null)}>
                      ביטול
                    </Button>
                    <Button onClick={saveFAQ} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 ml-2" />
                      {editingFAQ.id ? 'עדכן' : 'הוסף'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>הגדרות כלליות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">מטבע ברירת מחדל</h3>
                      <p className="text-sm text-gray-500">המטבע שיוצג באתר</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option value="ILS">₪ שקל</option>
                      <option value="USD">$ דולר</option>
                      <option value="EUR">€ אירו</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">אימיילים אוטומטיים</h3>
                      <p className="text-sm text-gray-500">שליחת אימיילים ללקוחות אחרי רכישה</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">תוקף לינקים להורדה</h3>
                      <p className="text-sm text-gray-500">כמה ימים לינק ההורדה יהיה תקף</p>
                    </div>
                    <Input type="number" defaultValue="30" className="w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
