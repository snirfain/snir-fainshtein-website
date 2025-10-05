import React, { useState, useEffect } from "react";
import { Product } from "@/api/entities";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/useToast";
import SEO from "@/components/SEO";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Download, 
  Star, 
  Check,
  ArrowRight,
  Shield,
  Zap,
  Users,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();
  
  useEffect(() => {
    loadProduct();
  }, []);
  
  const loadProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
      setIsLoading(false);
      showError('שגיאה', 'מזהה מוצר חסר');
      return;
    }
    
    try {
      setIsLoading(true);
      const products = await Product.filter({ id: productId });
      if (products.length > 0) {
        setProduct(products[0]);
      } else {
        showError('שגיאה', 'המוצר לא נמצא');
      }
    } catch (error) {
      console.error("Error loading product:", error);
      showError('שגיאה', 'לא הצלחנו לטעון את המוצר');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddToCart = () => {
    try {
      addToCart(product, 1);
      showSuccess('נוסף לעגלה! 🎉', `${product.title} נוסף בהצלחה`);
    } catch (error) {
      showError('שגיאה', 'לא הצלחנו להוסיף את המוצר לעגלה');
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner fullScreen text="טוען מוצר..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">המוצר לא נמצא</h2>
            <p className="text-[#233071] mb-6">המוצר שחיפשת לא קיים או הוסר</p>
            <Link to={createPageUrl("Shop")}>
              <Button>חזור לחנות</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const currencySymbol = product.currency === 'ILS' ? '₪' : product.currency === 'USD' ? '$' : '€';
  const allImages = [product.image_url, ...(product.gallery_images || [])].filter(Boolean);
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <SEO 
        title={`${product.title} | שניר פיינשטיין`}
        description={product.short_description || product.description?.substring(0, 160)}
        keywords={`${product.title}, AI, הדרכה, ${product.category}, ${(product.tags || []).join(', ')}`}
        image={product.image_url}
      />
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-[#233071]">
            <Link to={createPageUrl("Home")} className="hover:text-blue-800">בית</Link>
            <ArrowRight className="h-4 w-4" />
            <Link to={createPageUrl("Shop")} className="hover:text-blue-800">חנות</Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-[#233071]">{product.title}</span>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden bg-white shadow-lg flex items-center justify-center">
                <img 
                  src={allImages[selectedImage] || '/placeholder.png'} 
                  alt={product.title}
                  className="w-full h-96 object-contain p-4"
                />
              </div>
              
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-lg overflow-hidden border-2 flex items-center justify-center bg-gray-50 ${
                        selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-20 object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Badge>{getCategoryName(product.category)}</Badge>
                {product.featured && (
                  <Badge className="mr-2 bg-orange-400 text-white">
                    <Star className="h-3 w-3 ml-1" />
                    מומלץ
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              
              <p className="text-xl text-[#233071] mb-6">
                {product.short_description}
              </p>
              
              <div className="text-4xl font-bold text-blue-800 mb-6">
                {currencySymbol}{product.price.toFixed(2)}
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    הוסף לעגלה - {currencySymbol}{product.price.toFixed(2)}
                  </Button>
                  
                  {/* Trust indicators */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-[#233071]">
                    <div className="flex items-center gap-1 justify-center">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>תשלום מאובטח</span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <Zap className="h-4 w-4 text-blue-800" />
                      <span>גישה מיידית</span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>500+ לקוחות</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {product.is_digital && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-blue-800 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">מוצר דיגיטלי</h4>
                      <p className="text-sm text-blue-800">
                        קובץ להורדה מיידית לאחר התשלום. 
                        {product.max_downloads && ` עד ${product.max_downloads} הורדות מותרות.`}
                        {product.download_expiry_days && ` הלינק תקף ל-${product.download_expiry_days} ימים.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* What You'll Get Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Check className="h-6 w-6 text-green-600" />
                  מה תקבל במוצר הזה?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "גישה מיידית לאחר התשלום",
                    "קבצים באיכות גבוהה",
                    "עדכונים חינמיים",
                    "תמיכה טכנית מלאה",
                    product.is_digital && `עד ${product.max_downloads || 3} הורדות`,
                    product.is_digital && `תוקף ${product.download_expiry_days || 30} ימים`
                  ].filter(Boolean).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-[#233071]">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
                <TabsTrigger value="description">תיאור מלא</TabsTrigger>
                <TabsTrigger value="details">פרטים נוספים</TabsTrigger>
                <TabsTrigger value="reviews">ביקורות</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-8 prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <DetailRow label="קטגוריה" value={getCategoryName(product.category)} />
                      <DetailRow label="סוג מוצר" value={product.is_digital ? 'מוצר דיגיטלי' : 'מוצר פיזי'} />
                      {product.tags && product.tags.length > 0 && (
                        <DetailRow 
                          label="תגיות" 
                          value={product.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="mr-2">{tag}</Badge>
                          ))} 
                        />
                      )}
                      {product.is_digital && product.max_downloads && (
                        <DetailRow label="הורדות מקסימליות" value={product.max_downloads} />
                      )}
                      {product.is_digital && product.download_expiry_days && (
                        <DetailRow label="תוקף לינק הורדה" value={`${product.download_expiry_days} ימים`} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-8">
                    {/* Social Proof & Reviews */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-6 border-b">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-6 w-6 fill-orange-500 text-orange-500" />
                            ))}
                          </div>
                          <p className="text-3xl font-bold">4.9/5</p>
                          <p className="text-sm text-[#233071]">מבוסס על 234 ביקורות</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-green-600 mb-1">
                            <TrendingUp className="h-5 w-5" />
                            <span className="font-semibold">100% שביעות רצון</span>
                          </div>
                          <p className="text-sm text-[#233071]">503 לקוחות מרוצים</p>
                        </div>
                      </div>
                      
                      {/* Sample Reviews */}
                      <div className="space-y-4">
                        <ReviewCard 
                          name="דני לוי"
                          rating={5}
                          comment="מוצר מעולה! עזר לי מאוד בהדרכות שלי. ממליץ בחום!"
                          date="לפני 3 ימים"
                        />
                        <ReviewCard 
                          name="שרה כהן"
                          rating={5}
                          comment="שירות מקצועי ומהיר. הקבצים באיכות גבוהה מאוד."
                          date="לפני שבוע"
                        />
                        <ReviewCard 
                          name="יוסי משה"
                          rating={4}
                          comment="כלי נהדר, חוסך לי המון זמן בהכנת החומרים."
                          date="לפני שבועיים"
                        />
                      </div>
                      
                      <div className="pt-6 border-t text-center">
                        <Button variant="outline" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          יש לך שאלה? דבר איתנו
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryName(category) {
  const categories = {
    'checklists': 'צ\'קליסטים',
    'templates': 'תבניות',
    'courses': 'קורסים',
    'consulting': 'ייעוץ',
    'other': 'אחר'
  };
  return categories[category] || category;
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start border-b border-gray-100 pb-4 last:border-0">
      <div className="w-1/3 font-semibold text-[#233071]">{label}</div>
      <div className="w-2/3 text-[#233071]">{value}</div>
    </div>
  );
}

function ReviewCard({ name, rating, comment, date }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold">{name}</p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-[#233071]">{comment}</p>
    </div>
  );
}