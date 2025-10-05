
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Product } from "@/api/entities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Check, Star, Package, TrendingUp } from "lucide-react";

export default function Bundles() {
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await Product.filter({ is_active: true });
        setProducts(allProducts);
        createBundles(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    const createBundles = (products) => {
      const bundlesList = [
        {
          id: 'starter',
          title: 'חבילת מתחילים',
          description: 'כל מה שצריך כדי להתחיל - תבניות בסיסיות וצ\'קליסטים',
          discount: 25,
          products: products.filter(p => p.category === 'templates' || p.category === 'checklists').slice(0, 3),
          featured: true
        },
        {
          id: 'professional',
          title: 'חבילת מקצוענים',
          description: 'כלים מתקדמים לפיתוח הדרכה והטמעת AI',
          discount: 30,
          products: products.filter(p => p.category === 'courses' || p.featured).slice(0, 4),
          featured: true
        },
        {
          id: 'complete',
          title: 'החבילה המלאה',
          description: 'כל המוצרים שלנו במחיר מיוחד',
          discount: 40,
          products: products.slice(0, 6),
          featured: false
        }
      ];

      setBundles(bundlesList);
    };

    loadProducts();
  }, []);

  const calculateBundlePrice = (bundle) => {
    const originalPrice = bundle.products.reduce((sum, p) => sum + p.price, 0);
    const discountedPrice = originalPrice * (1 - bundle.discount / 100);
    return { originalPrice, discountedPrice, saved: originalPrice - discountedPrice };
  };

  const addBundleToCart = (bundle) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    bundle.products.forEach(product => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`חבילת "${bundle.title}" נוספה לעגלה!`);
  };

  const formatCurrency = (amount) => {
    return `₪${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Package className="h-4 w-4 ml-1" />
              חבילות מיוחדות
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              חבילות במחיר מיוחד
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              חסוך עד 40% עם חבילות המוצרים שלנו - קנה יותר, חסוך יותר
            </p>
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.map(bundle => {
              const prices = calculateBundlePrice(bundle);
              
              return (
                <Card key={bundle.id} className={`relative overflow-hidden ${bundle.featured ? 'border-2 border-purple-500 shadow-lg' : ''}`}>
                  {bundle.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      מומלץ
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{bundle.title}</h3>
                      <p className="text-[#233071]">{bundle.description}</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 line-through">{formatCurrency(prices.originalPrice)}</span>
                        <Badge className="bg-red-500 text-white">
                          <TrendingUp className="h-3 w-3 ml-1" />
                          חסוך {bundle.discount}%
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-purple-600">{formatCurrency(prices.discountedPrice)}</span>
                        <span className="text-sm text-[#233071]">במקום {formatCurrency(prices.originalPrice)}</span>
                      </div>
                      <p className="text-sm text-green-600 mt-2 font-semibold">
                        💰 תחסוך {formatCurrency(prices.saved)}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">מה כלול בחבילה:</h4>
                      <div className="space-y-2">
                        {bundle.products.map(product => (
                          <div key={product.id} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{product.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => addBundleToCart(bundle)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      הוסף חבילה לעגלה
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      ✓ גישה מיידית לכל המוצרים | ✓ עדכונים חינם
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Why Bundles */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">למה לקנות חבילות?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">חסוך כסף</h3>
                <p className="text-[#233071] text-sm">הנחות של עד 40% על רכישת חבילות</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="font-semibold mb-2">פתרון מלא</h3>
                <p className="text-[#233071] text-sm">קבל את כל הכלים שאתה צריך במקום אחד</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">ערך מוסף</h3>
                <p className="text-[#233071] text-sm">גישה לתוכן בונוס ועדכונים חינם</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">לא מצאת את מה שחיפשת?</h2>
          <p className="text-lg mb-6 text-blue-100">עיין בכל המוצרים שלנו או צור קשר לייעוץ אישי</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={createPageUrl("Shop")}>
              <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
                לכל המוצרים
              </Button>
            </Link>
            <Link to={createPageUrl("Contact")}>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                צור קשר
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
