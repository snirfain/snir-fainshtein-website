
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/api/entities";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ShoppingCart } from "lucide-react";
import ProductCard from "../components/shop/ProductCard";
import { createPageUrl } from "@/utils";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState(searchParams.get("view") === "bundles" ? "bundles" : searchParams.get("view") === "all" ? "all" : "deals"); // Default to "deals"
  const [selectedBundleItems, setSelectedBundleItems] = useState([]);
  
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "bundles") {
      setViewMode("bundles");
    } else if (view === "all") {
      setViewMode("all");
    } else {
      setViewMode("deals"); // Default to deals
    }
  }, [searchParams]);
  
  const bundles = [
    {
      id: 'bundle-3',
      name: 'חבילת התחלה',
      itemCount: 3,
      discount: 15,
      description: 'מושלם למתחילים - בחר 3 מוצרים וחסוך 15%',
      icon: '🎯',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'bundle-5',
      name: 'חבילת מקצוען',
      itemCount: 5,
      discount: 30,
      description: 'הבחירה הפופולרית - בחר 5 מוצרים וחסוך 30%',
      icon: '💼',
      color: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      id: 'bundle-8',
      name: 'חבילת VIP',
      itemCount: 8,
      discount: 50,
      description: 'המקסימום! בחר 8 מוצרים וחסוך 50%',
      icon: '👑',
      color: 'from-orange-400 to-red-700'
    }
  ];
  
  const toggleBundleItem = (productId) => {
    setSelectedBundleItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  const calculateBundlePrice = (bundle) => {
    const selectedProducts = products.filter(p => selectedBundleItems.includes(p.id));
    const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    const discountedPrice = totalPrice * (1 - bundle.discount / 100);
    return { totalPrice, discountedPrice, savings: totalPrice - discountedPrice };
  };
  
  const addBundleToCart = (bundle) => {
    if (selectedBundleItems.length !== bundle.itemCount) {
      showError('שגיאה', `נא לבחור בדיוק ${bundle.itemCount} מוצרים`);
      return;
    }
    
    const selectedProducts = products.filter(p => selectedBundleItems.includes(p.id));
    selectedProducts.forEach(product => addToCart(product));
    
    showSuccess('נוסף לעגלה! 🎉', `חבילת ${bundle.name} נוספה בהצלחה`);
    setSelectedBundleItems([]);
  };
  
  useEffect(() => {
    let filtered = [...products];
    
    // סינון לפי מבצעים
    if (viewMode === "deals") {
      filtered = filtered.filter(p => p.discount_percentage > 0);
    }
    
    // סינון לפי חיפוש
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // סינון לפי קטגוריה
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // מיון
    switch(sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy, viewMode]);
  
  const loadProducts = async () => {
    try {
      const allProducts = await Product.filter({ is_active: true }, '-created_date');
      setProducts(allProducts);
    } catch (error) {
      console.error("Error loading products:", error);
      showError('שגיאה', 'לא הצלחנו לטעון את המוצרים');
    }
  };
  
  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      showSuccess('נוסף לעגלה! 🎉', `${product.title} נוסף בהצלחה`);
    } catch (error) {
      showError('שגיאה', 'לא הצלחנו להוסיף את המוצר לעגלה');
    }
  };
  
  const categories = [
    { value: "all", label: "כל הקטגוריות" },
    { value: "checklists", label: "צ'קליסטים" },
    { value: "templates", label: "תבניות" },
    { value: "courses", label: "קורסים" },
    { value: "consulting", label: "ייעוץ" },
    { value: "other", label: "אחר" }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`py-16 md:py-24 ${
        viewMode === "bundles"
          ? "bg-gradient-to-r from-purple-600 to-pink-600"
          : viewMode === "deals" 
          ? "bg-gradient-to-r from-orange-400 to-red-700" 
          : "bg-gradient-to-r from-blue-600 to-blue-700"
      } text-white`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              {viewMode === "bundles" ? "🎁 חבילות חסכון" : viewMode === "deals" ? "🔥 מבצעים והנחות" : "החנות"}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              {viewMode === "bundles"
                ? "חבילות מיוחדות - חסוך עד 50%!"
                : viewMode === "deals" 
                ? "מבצעים חמים! חסוך עד 50%" 
                : "מוצרים ושירותים דיגיטליים"}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {viewMode === "bundles"
                ? "בחר מספר מוצרים בחבילה אחת וקבל הנחה מיוחדת! ככל שיותר מוצרים - ההנחה גדולה יותר"
                : viewMode === "deals"
                ? "מוצרים נבחרים במחירים מיוחדים - מבצע לזמן מוגבל בלבד!"
                : "צ'קליסטים, תבניות, קורסים וכלים מקצועיים לפיתוח הדרכה ולמידה ארגונית"}
            </p>
          </div>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 pt-4 flex-wrap">
            {/* חבילות - הכי בולט */}
            <button
              onClick={() => {
                setSearchParams({ view: "bundles" });
                setViewMode("bundles");
              }}
              className={`px-6 py-4 font-bold transition-all flex items-center gap-2 rounded-t-xl relative ${
                viewMode === "bundles"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105"
                  : "bg-white text-purple-600 hover:bg-purple-50 border-2 border-purple-200 shadow-md hover:scale-105"
              }`}
            >
              <span className="text-2xl">🎁</span>
              <span>חבילות חסכון</span>
              {viewMode !== "bundles" && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">חם!</span>}
            </button>
            
            {/* מבצעים - בולט */}
            <button
              onClick={() => {
                setSearchParams({ view: "deals" });
                setViewMode("deals");
              }}
              className={`px-6 py-4 font-bold transition-all flex items-center gap-2 rounded-t-xl ${
                viewMode === "deals"
                  ? "bg-gradient-to-r from-orange-400 to-red-700 text-white shadow-xl scale-105"
                  : "bg-white text-orange-500 hover:bg-orange-50 border-2 border-orange-200 shadow-md hover:scale-105"
              }`}
            >
              <span className="text-xl text-white">🔥</span>
              <span>מבצעים והנחות</span>
            </button>
            
            {/* כל המוצרים - רגיל */}
            <button
              onClick={() => {
                setSearchParams({ view: "all" });
                setViewMode("all");
              }}
              className={`px-6 py-3 font-medium transition-all ${
                viewMode === "all"
                  ? "text-blue-800 border-b-4 border-blue-600"
                  : "text-[#233071] hover:text-blue-500"
              }`}
            >
              כל המוצרים
            </button>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="חפש מוצרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="מיין לפי" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">מומלצים</SelectItem>
                  <SelectItem value="discount">הנחה הגבוהה ביותר</SelectItem>
                  <SelectItem value="newest">חדשים ביותר</SelectItem>
                  <SelectItem value="price_low">מחיר נמוך</SelectItem>
                  <SelectItem value="price_high">מחיר גבוה</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bundles Section */}
      {viewMode === "bundles" && (
        <section className="py-12 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                חבילות חסכון מיוחדות!
              </h2>
              <p className="text-[#233071] text-lg">בחר את החבילה המושלמת עבורך וחסוך עד 50%</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {bundles.map((bundle) => {
                const { totalPrice, discountedPrice, savings } = calculateBundlePrice(bundle);
                const selectedCount = selectedBundleItems.length;
                const progress = (selectedCount / bundle.itemCount) * 100;

                return (
                  <Card 
                    key={bundle.id} 
                    className={`relative overflow-hidden ${bundle.popular ? 'border-4 border-purple-500 shadow-2xl scale-105' : 'border-2 border-gray-200'}`}
                  >
                    {bundle.popular && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-red-500 text-white text-sm px-3 py-1">🔥 הכי פופולרי!</Badge>
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${bundle.color} flex items-center justify-center text-5xl`}>
                        {bundle.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-center mb-2">{bundle.name}</h3>
                      <p className="text-center text-[#233071] mb-4">{bundle.description}</p>
                      
                      <div className="text-center mb-4">
                        <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-700 bg-clip-text text-transparent">
                          {bundle.discount}%
                        </div>
                        <div className="text-sm text-gray-500">הנחה</div>
                      </div>

                      {selectedCount > 0 && selectedCount <= bundle.itemCount && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{selectedCount} / {bundle.itemCount} מוצרים</span>
                            <span className="font-bold text-purple-600">{progress.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {selectedCount === bundle.itemCount && totalPrice > 0 && (
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-[#233071]">מחיר רגיל:</span>
                            <span className="line-through text-gray-400">₪{totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="font-bold">מחיר מבצע:</span>
                            <span className="font-bold text-green-600 text-xl">₪{discountedPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-green-700">חיסכון:</span>
                            <span className="font-bold text-green-700">₪{savings.toFixed(2)}</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={() => addBundleToCart(bundle)}
                        disabled={selectedCount !== bundle.itemCount}
                        className={`w-full ${bundle.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : ''}`}
                      >
                        {selectedCount === 0 ? 'בחר מוצרים למטה' : selectedCount < bundle.itemCount ? `בחר עוד ${bundle.itemCount - selectedCount}` : '🎉 הוסף לעגלה'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">בחר מוצרים לחבילה שלך</h3>
              <p className="text-[#233071]">לחץ על המוצרים כדי להוסיף אותם לחבילה</p>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {viewMode !== "bundles" && filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-[#233071] mb-2">לא נמצאו מוצרים</h3>
              <p className="text-[#233071]">נסה לשנות את הסינון או החיפוש</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-[#233071]">
                נמצאו {filteredProducts.length} מוצרים
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  viewMode === "bundles" ? (
                    <Card 
                      key={product.id}
                      className={`relative overflow-hidden cursor-pointer transition-all ${
                        selectedBundleItems.includes(product.id) 
                          ? 'border-4 border-purple-500 shadow-xl scale-105' 
                          : 'border border-gray-200 hover:border-purple-300 hover:shadow-lg'
                      }`}
                      onClick={() => toggleBundleItem(product.id)}
                    >
                      {selectedBundleItems.includes(product.id) && (
                        <div className="absolute top-3 left-3 z-10 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                          ✓
                        </div>
                      )}
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.title} className="w-full h-full object-contain p-4" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="h-16 w-16 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h3>
                        <p className="text-[#233071] text-sm mb-3 line-clamp-2">{product.short_description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-800">₪{product.price.toFixed(2)}</span>
                          <Button 
                            variant={selectedBundleItems.includes(product.id) ? "default" : "outline"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBundleItem(product.id);
                            }}
                          >
                            {selectedBundleItems.includes(product.id) ? '✓ נבחר' : 'בחר'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  )
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
