import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/api/entities";
import { Order } from "@/api/entities";
import { Download } from "@/api/entities";
import { 
  User as UserIcon, 
  Package, 
  Download as DownloadIcon, 
  Settings, 
  LogOut,
  ShoppingBag,
  Calendar,
  Mail,
  Phone,
  Edit,
  Save,
  CreditCard,
  Bell
} from "lucide-react";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      setEditedData({
        full_name: userData.full_name || "",
        phone: userData.phone || ""
      });

      const userOrders = await Order.filter({ customer_email: userData.email }, '-created_date');
      setOrders(userOrders);

      const userDownloads = await Download.filter({ customer_email: userData.email });
      setDownloads(userDownloads);
    } catch (error) {
      console.error("Error loading user data:", error);
      window.location.href = createPageUrl("Home");
    }
  };

  const handleSaveProfile = async () => {
    try {
      await User.updateMyUserData(editedData);
      setUser({ ...user, ...editedData });
      setIsEditing(false);
      alert("הפרטים עודכנו בהצלחה!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("שגיאה בעדכון הפרטים");
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('he-IL');
  };

  const formatCurrency = (amount, currency = 'ILS') => {
    const symbols = { ILS: '₪', USD: '$', EUR: '€' };
    return `${symbols[currency]}${amount.toFixed(2)}`;
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-[#233071]">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">שלום, {user.full_name || user.email}!</h1>
                <p className="text-blue-100">ברוך הבא לחשבון האישי שלך</p>
              </div>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 ml-2" />
                התנתק
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">סה"כ הזמנות</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">מוצרים זמינים</p>
                    <p className="text-2xl font-bold">{downloads.length}</p>
                  </div>
                  <DownloadIcon className="h-8 w-8 text-blue-200" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">הזמנות פעילות</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => o.status === 'completed' || o.status === 'paid').length}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-blue-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="gap-2">
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">סקירה</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">הזמנות</span>
              </TabsTrigger>
              <TabsTrigger value="downloads" className="gap-2">
                <DownloadIcon className="h-4 w-4" />
                <span className="hidden sm:inline">מוצרים</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">הגדרות</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      הפרופיל שלי
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div>
                          <p className="text-sm text-gray-500">שם מלא</p>
                          <p className="font-semibold">{user.full_name || "לא מוגדר"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">אימייל</p>
                          <p className="font-semibold">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">טלפון</p>
                          <p className="font-semibold">{user.phone || "לא מוגדר"}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      הזמנות אחרונות
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-3">
                        {orders.slice(0, 3).map(order => (
                          <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                            <div>
                              <p className="font-semibold text-sm">הזמנה #{order.order_number || order.id.slice(0, 8)}</p>
                              <p className="text-xs text-gray-500">{formatDate(order.created_date)}</p>
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-sm">{formatCurrency(order.total, order.currency)}</p>
                              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setActiveTab("orders")}>
                          הצג את כל ההזמנות
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-4">אין הזמנות עדיין</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>פעולות מהירות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to={createPageUrl("Shop")} className="block">
                      <Button variant="outline" className="w-full h-20 flex-col gap-2">
                        <ShoppingBag className="h-6 w-6" />
                        <span className="text-sm">חנות</span>
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Downloads")} className="block">
                      <Button variant="outline" className="w-full h-20 flex-col gap-2">
                        <DownloadIcon className="h-6 w-6" />
                        <span className="text-sm">הורדות</span>
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Contact")} className="block">
                      <Button variant="outline" className="w-full h-20 flex-col gap-2">
                        <Mail className="h-6 w-6" />
                        <span className="text-sm">תמיכה</span>
                      </Button>
                    </Link>
                    <Link to={createPageUrl("FAQ")} className="block">
                      <Button variant="outline" className="w-full h-20 flex-col gap-2">
                        <Settings className="h-6 w-6" />
                        <span className="text-sm">עזרה</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>ההזמנות שלי</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <Card key={order.id} className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 bg-white">
                          <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold">הזמנה #{order.order_number || order.id.slice(0, 8)}</p>
                              <p className="text-sm text-gray-500">{formatDate(order.created_date)}</p>
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-lg">{formatCurrency(order.total, order.currency)}</p>
                              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>

                          {order.products && order.products.length > 0 && (
                            <div className="border-t pt-3 mt-3">
                              <p className="text-sm font-semibold mb-2">מוצרים:</p>
                              {order.products.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm text-[#233071]">
                                  <span>{item.product_title} x{item.quantity}</span>
                                  <span>{formatCurrency(item.price * item.quantity, order.currency)}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {(order.status === 'completed' || order.status === 'paid') && (
                            <Link to={createPageUrl("Downloads")}>
                              <Button variant="outline" size="sm" className="mt-3 w-full">
                                <DownloadIcon className="h-4 w-4 ml-2" />
                                הורד מוצרים
                              </Button>
                            </Link>
                          )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-[#233071] mb-2">אין הזמנות עדיין</h3>
                      <p className="text-gray-500 mb-4">התחל לקנות מוצרים מהחנות שלנו</p>
                      <Link to={createPageUrl("Shop")}>
                        <Button>עבור לחנות</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Downloads Tab */}
            <TabsContent value="downloads">
              <Card>
                <CardHeader>
                  <CardTitle>המוצרים שלי</CardTitle>
                </CardHeader>
                <CardContent>
                  {downloads.length > 0 ? (
                    <p className="text-[#233071]">יש לך {downloads.length} מוצרים זמינים להורדה</p>
                  ) : (
                    <div className="text-center py-12">
                      <DownloadIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-[#233071] mb-2">אין מוצרים להורדה</h3>
                      <p className="text-gray-500">המוצרים שתרכוש יופיעו כאן</p>
                    </div>
                  )}
                  <Link to={createPageUrl("Downloads")}>
                    <Button className="mt-4 w-full">
                      <DownloadIcon className="h-4 w-4 ml-2" />
                      עבור לדף ההורדות
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>הגדרות חשבון</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 ml-2" />
                        ערוך
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                          ביטול
                        </Button>
                        <Button size="sm" onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 ml-2" />
                          שמור
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>שם מלא</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.full_name}
                          onChange={(e) => setEditedData({ ...editedData, full_name: e.target.value })}
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded">{user.full_name || "לא מוגדר"}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>אימייל</Label>
                      <p className="p-2 bg-gray-50 rounded">{user.email}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>טלפון</Label>
                      {isEditing ? (
                        <Input
                          value={editedData.phone}
                          onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                          placeholder="050-1234567"
                        />
                      ) : (
                        <p className="p-2 bg-gray-50 rounded">{user.phone || "לא מוגדר"}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>תאריך הצטרפות</Label>
                      <p className="p-2 bg-gray-50 rounded">{formatDate(user.created_date)}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">העדפות</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">קבל עדכונים במייל על הזמנות</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">דיוור שיווקי</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">טיפים והמלצות</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-2 text-red-600">מחיקת חשבון</h3>
                    <p className="text-sm text-[#233071] mb-3">
                      מחיקת החשבון תמחק את כל הנתונים והגישה למוצרים שרכשת
                    </p>
                    <Button variant="destructive">מחק חשבון</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}