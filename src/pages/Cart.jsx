import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/useToast";
import { Coupon } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const { cart, updateItemQuantity, removeFromCart, getCartTotal } = useCart();
  const { showSuccess, showError } = useToast();
  
  useEffect(() => {
    // Load saved coupon
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
    }
  }, []);
  
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      showError('שדה ריק', 'יש להזין קוד קופון');
      return;
    }
    
    setIsApplyingCoupon(true);
    
    try {
      console.log('🔍 Applying coupon:', couponCode.toUpperCase());
      
      // Validate coupon from API
      const coupon = await Coupon.validate(couponCode.toUpperCase());
      
      console.log('🎫 Coupon validation result:', coupon);
      
      if (coupon) {
        const appliedData = {
          code: coupon.code,
          type: coupon.discount_type,
          value: coupon.discount_value,
          description: `${coupon.discount_value}${coupon.discount_type === 'percentage' ? '%' : '₪'} הנחה`
        };
        setAppliedCoupon(appliedData);
        localStorage.setItem('appliedCoupon', JSON.stringify(appliedData));
        showSuccess('קופון הוחל בהצלחה! 🎉', appliedData.description);
        setCouponCode('');
      } else {
        showError('קוד קופון שגוי', 'הקוד שהזנת אינו תקף או שפג תוקפו');
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      showError('שגיאה', 'לא הצלחנו לאמת את הקופון. נסה שוב.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('appliedCoupon');
    showSuccess('קופון הוסר', 'ניתן להוסיף קופון אחר');
  };
  
  const subtotal = getCartTotal();
  const discount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? subtotal * (appliedCoupon.value / 100)
      : appliedCoupon.value
    : 0;
  const total = subtotal - discount;
  
  const currencySymbol = cart[0]?.currency === 'ILS' ? '₪' : cart[0]?.currency === 'USD' ? '$' : '€';
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#233071] mb-2">העגלה ריקה</h2>
          <p className="text-[#233071] mb-6">עדיין לא הוספת מוצרים לעגלה</p>
          <Link to={createPageUrl("Shop")}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              המשך לחנות
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold">עגלת הקניות שלי</h1>
          <p className="text-[#233071] mt-2">{cart.length} פריטים בעגלה</p>
        </div>
      </section>
      
      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingBag className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            {item.is_digital && (
                              <Badge variant="outline" className="mt-1">מוצר דיגיטלי</Badge>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              removeFromCart(item.id);
                              showSuccess('הוסר מהעגלה', `${item.title} הוסר בהצלחה`);
                            }}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-xl font-bold text-blue-800">
                            {currencySymbol}{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">סיכום הזמנה</h2>
                  
                  {/* Coupon */}
                  <div className="mb-6">
                    {!appliedCoupon ? (
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          קוד קופון
                        </label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="הזן קוד קופון"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                            className="uppercase"
                          />
                          <Button 
                            variant="outline" 
                            onClick={applyCoupon}
                            disabled={!couponCode || isApplyingCoupon}
                          >
                            {isApplyingCoupon ? (
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              'החל'
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                        </p>
                        
                      </div>
                    ) : (
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="flex items-center justify-between">
                          <div>
                            <strong className="text-green-900">קופון הוחל:</strong>
                            <span className="text-green-700 mr-2">{appliedCoupon.code}</span>
                            <Badge variant="outline" className="mr-2">
                              <Sparkles className="h-3 w-3 ml-1" />
                              {appliedCoupon.description}
                            </Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={removeCoupon}
                            className="h-6 w-6 text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between">
                      <span className="text-[#233071]">סכום ביניים</span>
                      <span className="font-semibold">{currencySymbol}{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <>
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            הנחה
                          </span>
                          <span>-{currencySymbol}{discount.toFixed(2)}</span>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-md p-2 text-center">
                          <p className="text-sm font-semibold text-green-700">
                            🎉 חסכת {currencySymbol}{discount.toFixed(2)}!
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold mb-2">
                    <span>סה"כ לתשלום</span>
                    <div className="text-left">
                      {discount > 0 && (
                        <div className="text-sm text-gray-400 line-through font-normal">
                          {currencySymbol}{subtotal.toFixed(2)}
                        </div>
                      )}
                      <span className="text-blue-800">{currencySymbol}{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {discount > 0 && (
                    <p className="text-xs text-center text-green-600 font-medium mb-6">
                      ✨ חסכת {Math.round((discount / subtotal) * 100)}% מהמחיר המקורי
                    </p>
                  )}
                  
                  <Link to={createPageUrl("Checkout")}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg text-white">
                      המשך לתשלום
                    </Button>
                  </Link>
                  
                  <Link to={createPageUrl("Shop")}>
                    <Button variant="outline" className="w-full mt-3">
                      המשך בקניות
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}