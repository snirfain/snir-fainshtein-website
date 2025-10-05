import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Product } from "@/api/entities";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/useToast";
import SEO from "@/components/SEO";
import LoadingSpinner, { CardSkeleton } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  ShoppingCart,
  Star,
  Zap,
  BookOpen,
  Lightbulb,
  Rocket,
  ArrowLeft,
  Phone,
  Mail } from
"lucide-react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const products = await Product.filter({ featured: true, is_active: true });
      setFeaturedProducts(products.slice(0, 3));
    } catch (error) {
      console.error("Error loading products:", error);
      showError('שגיאה בטעינת מוצרים', 'לא הצלחנו לטעון את המוצרים המומלצים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      showSuccess('הוסף לעגלה!', `${product.title} נוסף לעגלה בהצלחה`);
    } catch (error) {
      showError('שגיאה', 'לא הצלחנו להוסיף את המוצר לעגלה');
    }
  };

  return (
    <div className="bg-white" dir="rtl">
      <SEO 
        title="שניר פיינשטיין - מומחה AI ופיתוח הדרכה"
        description="שדרג את ההדרכה שלך עם כוח הבינה המלאכותית. כלים מוכחים, תבניות מקצוענות וייעוץ אישי. מעל 100 לקוחות מרוצים."
        keywords="AI, בינה מלאכותית, הדרכה, למידה ארגונית, חדשנות בחינוך, שניר פיינשטיין, קורסים, ייעוץ AI"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden" role="banner">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-orange-400 text-white hover:bg-orange-500 text-lg px-6 py-3 inline-flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>מומחה AI ופיתוח הדרכה לחברות וארגונים</span>
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white">
              שדרג את ההדרכה שלך<br />
              <span className="text-orange-400">עם כוח הבינה המלאכותית</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              כלים מוכחים, תבניות מקצוענות וייעוץ אישי שיעזרו לך להוביל את המהפכה הדיגיטלית בארגון שלך
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to={createPageUrl("Shop")}>
                <Button size="lg" className="bg-orange-400 text-white hover:bg-orange-500 text-xl px-10 py-8 shadow-2xl font-bold w-full sm:w-auto">
                  <ShoppingCart className="h-6 w-6 ml-3" />
                  <span>צפה במוצרים</span>
                </Button>
              </Link>
              <Link to={createPageUrl("Schedule")}>
                <Button size="lg" variant="outline" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-blue-900 text-xl px-10 py-8 backdrop-blur-sm font-bold w-full sm:w-auto">
                  <span>פגישת ייעוץ חינם</span>
                  <ArrowLeft className="h-6 w-6 mr-3" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[
                    { name: 'ד', bg: 'bg-pink-500' },
                    { name: 'מ', bg: 'bg-purple-500' },
                    { name: 'ר', bg: 'bg-indigo-500' },
                    { name: 'ש', bg: 'bg-blue-500' },
                    { name: '+100', bg: 'bg-gradient-to-br from-orange-400 to-orange-500', small: true }
                  ].map((avatar, i) =>
                  <div 
                    key={i} 
                    className={`w-12 h-12 rounded-full ${avatar.bg} border-2 border-white flex items-center justify-center text-white font-bold ${avatar.small ? 'text-sm' : 'text-lg'} shadow-lg hover:scale-110 transition-transform duration-200 ${i > 0 ? '-mr-2' : ''}`}
                  >
                    {avatar.name}
                  </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) =>
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                    )}
                  </div>
                  <p className="text-sm text-blue-100 font-medium">מעל 100 לקוחות מרוצים</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
            { number: "+500", label: "מורים ומדריכים", icon: Users },
            { number: "+10", label: "ארגונים מובילים", icon: Building },
            { number: "100%", label: "שביעות רצון", icon: Star },
            { number: "+7", label: "שנות ניסיון", icon: Award }].
            map((stat, index) =>
            <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-blue-800" />
                  </div>
                </div>
                <div className="text-4xl font-black text-[#233071] mb-2">{stat.number}</div>
                <div className="text-[#233071] font-medium">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 text-base px-4 py-2 bg-blue-100 text-blue-900"  >למה שניר פיינשטיין?</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              המומחה שלך להצלחה בעידן ה-AI
            </h2>
            <p className="text-xl text-[#233071] leading-relaxed">
              ניסיון מוכח, כלים מעשיים ותוצאות מדידות - כל מה שאתה צריך כדי להצליח
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
            {
              icon: Brain,
              title: "מומחיות ייחודית ב-AI",
              description: "הטמעת כלי בינה מלאכותית מתקדמים בארגונים ומוסדות חינוך, עם התאמה מלאה לצרכים שלך",
              bgColor: "bg-blue-100",
              iconColor: "text-blue-800",
              items: ["הדרכות AI מעשיות", "בניית בוטים חכמים", "אוטומציה של תהליכים"]
            },
            {
              icon: Target,
              title: "פתרונות בדיוק בשבילך",
              description: "כל פרויקט מותאם במדויק לצרכים הספציפיים של הארגון, עם ליווי ותמיכה מלאה",
              bgColor: "bg-purple-100",
              iconColor: "text-purple-600",
              items: ["אבחון מדויק", "תוכנית מותאמת", "מעקב והדרכה"]
            },
            {
              icon: Rocket,
              title: "תוצאות מוכחות",
              description: "מאות מורים ומדריכים שכבר משתמשים בכלים שלנו ורואים שיפור משמעותי בעבודה",
              bgColor: "bg-green-100",
              iconColor: "text-green-600",
              items: ["שיפור בביצועים", "חיסכון בזמן", "תוצאות מדידות"]
            }].
            map((feature, index) =>
            <Card key={index} className="border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 space-y-5">
                  <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-[#233071] leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2 pt-2">
                    {feature.items.map((item, i) =>
                  <li key={i} className="flex items-center gap-3 text-[#233071]">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                  )}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 text-base px-4 py-2 bg-blue-100 text-blue-900">השירותים שלנו</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              מגוון פתרונות להצלחה שלך
            </h2>
            <p className="text-xl text-[#233071]">
              בחר את השירות המתאים לך ותתחיל לראות תוצאות
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
            {
              icon: Lightbulb,
              title: "ייעוץ והדרכה אישית",
              description: "הדרכות מעשיות והכשרות מותאמות אישית",
              price: "החל מ-₪500",
              items: ["פגישות 1-על-1", "תוכנית מותאמת", "תעודת הכשרה"]
            },
            {
              icon: BookOpen,
              title: "תבניות וכלים מוכנים",
              description: "תבניות מקצוענות מוכנות לשימוש מיידי",
              price: "החל מ-₪99",
              items: ["הורדה מיידית", "עדכונים חינם", "תמיכה מלאה"]
            },
            {
              icon: Zap,
              title: "פתרונות AI מתקדמים",
              description: "בוטים חכמים ואוטומציה מלאה",
              price: "לפי פרויקט",
              items: ["פיתוח מותאם", "הטמעה מלאה", "תחזוקה שוטפת"]
            },
            {
              icon: Users,
              title: "הטמעה ארגונית",
              description: "ליווי צוות מלא והטמעת מערכות",
              price: "לפי הצעה",
              items: ["אבחון צרכים", "הדרכת עובדים", "ליווי רציף"]
            },
            {
              icon: Target,
              title: "ייעוץ אסטרטגי",
              description: "תכנון ואסטרטגיה ארוכת טווח",
              price: "לפי שעה",
              items: ["מפגש אסטרטגי", "תוכנית עבודה", "מעקב יישום"]
            },
            {
              icon: Award,
              title: "קורסים מקוונים",
              description: "קורסים מוקלטים בנושאי AI וחינוך",
              price: "החל מ-₪399",
              items: ["גישה לכל החיים", "חומרים להורדה", "תעודת סיום"]
            }].
            map((service, index) =>
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <service.icon className="h-7 w-7 text-blue-800" />
                    </div>
                    <Badge variant="outline" className="text-blue-800 border-blue-600 font-bold">
                      {service.price}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-[#233071]">{service.description}</p>
                  <ul className="space-y-2 pt-2">
                    {service.items.map((item, i) =>
                  <li key={i} className="flex items-center gap-2 text-sm text-[#233071]">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                  )}
                  </ul>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    למידע נוסף
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {!isLoading && featuredProducts.length > 0 &&
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="featured-products">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 text-base px-4 py-2 bg-orange-100 text-orange-800">המוצרים המובילים</Badge>
              <h2 id="featured-products" className="text-4xl md:text-5xl font-black mb-6">
                הכלים שכולם קונים
              </h2>
              <p className="text-xl text-[#233071]">
                המוצרים הפופולריים ביותר שעוזרים למאות לקוחות מדי יום
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {featuredProducts.map((product) =>
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-400">
                    <div className="relative h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={`תמונת מוצר: ${product.title}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="h-16 w-16 text-gray-300" aria-hidden="true" />
                        </div>
                      )}
                      <Badge className="absolute top-4 right-4 bg-orange-400 text-white font-bold text-base px-3 py-1">
                        <Star className="h-4 w-4 ml-1 fill-current" aria-hidden="true" />
                        <span>מומלץ</span>
                      </Badge>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold leading-tight">{product.title}</h3>
                      <p className="text-[#233071] line-clamp-2">{product.short_description || product.description}</p>
                      
                      <div className="flex items-end justify-between pt-2">
                        <div>
                          {product.original_price && product.original_price > product.price &&
                      <div className="text-sm text-gray-400 line-through" aria-label="מחיר מקורי">
                              ₪{product.original_price.toFixed(0)}
                            </div>
                      }
                          <div className="text-3xl font-black text-blue-800" aria-label="מחיר">
                            ₪{product.price.toFixed(0)}
                          </div>
                        </div>
                        <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 hover:bg-blue-700 font-bold text-white"
                      size="lg"
                      aria-label={`הוסף ${product.title} לעגלה`}>

                          <ShoppingCart className="h-5 w-5 ml-2" aria-hidden="true" />
                          <span>הוסף</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
              )}
              </div>
            )}

            <div className="text-center mt-12">
              <Link to={createPageUrl("Shop")}>
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white font-bold">
                  <span>צפה בכל המוצרים</span>
                  <ArrowLeft className="h-5 w-5 mr-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      }

      {/* CTA Section */}
      
    </div>);

}

const Building = ({ className }) =>
<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>;