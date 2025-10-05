
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowRight, 
  Star, 
  StarOff, 
  ExternalLink, 
  Calendar, 
  Tag,
  MessageSquare,
  Share2,
  ArrowLeft,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/api/entities";
import { UserSubscription } from "@/api/entities";
import { AILink } from "@/api/entities";
import { UserFavorite } from "@/api/entities";

export default function AIToolDetails() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tool, setTool] = useState(null);
  const [similarTools, setSimilarTools] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toolId = urlParams.get('id');
    
    if (toolId) {
      checkSubscriptionAndLoadData(toolId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkSubscriptionAndLoadData = async (toolId) => {
    try {
      const user = await User.me();
      setUserEmail(user.email);
      
      const subscriptions = await UserSubscription.filter({
        user_email: user.email,
        status: "active"
      });
      const isUserSubscribed = subscriptions.length > 0;
      
      setIsSubscribed(isUserSubscribed);
      
      if (isUserSubscribed) {
        await loadToolDetails(toolId, user.email);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadToolDetails = async (toolId, email) => {
    try {
      // טעינת פרטי הכלי
      const toolDetails = await AILink.filter({ id: toolId });
      if (toolDetails.length > 0) {
        setTool(toolDetails[0]);
        
        // בדיקה אם הכלי במועדפים
        const favorites = await UserFavorite.filter({
          user_email: email,
          link_id: toolId
        });
        
        setIsFavorite(favorites.length > 0);
        
        // טעינת כלים דומים
        if (toolDetails[0].category) {
          const similar = await AILink.filter({ 
            category: toolDetails[0].category 
          });
          
          setSimilarTools(
            similar
              .filter(t => t.id !== toolId)
              .slice(0, 3)
          );
        }
      }
    } catch (error) {
      console.error("Error loading tool details:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!userEmail || !tool) return;
    
    setToggleLoading(true);
    
    try {
      if (isFavorite) {
        // מחיקת מועדף
        const favorites = await UserFavorite.filter({
          user_email: userEmail,
          link_id: tool.id
        });
        
        if (favorites.length > 0) {
          await UserFavorite.delete(favorites[0].id);
        }
        
        setIsFavorite(false);
      } else {
        // הוספת מועדף
        await UserFavorite.create({
          user_email: userEmail,
          link_id: tool.id,
          notes: ""
        });
        
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setToggleLoading(false);
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      chatbots: "צ'אטבוטים",
      image_generation: "יצירת תמונות",
      code_generation: "כתיבת קוד",
      content_creation: "יצירת תוכן",
      data_analysis: "ניתוח נתונים",
      other: "אחר"
    };
    
    return categories[category] || "אחר";
  };

  const getPriceTypeLabel = (priceType) => {
    const priceTypes = {
      free: "חינמי",
      freemium: "בסיס חינמי",
      paid: "בתשלום"
    };
    
    return priceTypes[priceType] || "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="h-16 w-16 mx-auto mb-6 text-blue-800" />
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              תוכן זה זמין למנויים בלבד
            </h1>
            <p className="text-lg text-[#233071] mb-8">
              כדי לקבל גישה למאגר הכלים המקיף שלנו, כולל עדכונים שוטפים והמלצות מותאמות אישית, אנא הירשמו כמנויים.
            </p>
            <Link to={createPageUrl("Subscription")}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                הצטרפו עכשיו
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              הכלי לא נמצא
            </h1>
            <p className="text-lg text-[#233071] mb-8">
              הכלי שחיפשת אינו קיים או שאין לך הרשאות לצפות בו.
            </p>
            <Link to={createPageUrl("AIToolsList")}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לרשימת הכלים
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* כפתור חזרה */}
        <div className="mb-6">
          <Link to={createPageUrl("AIToolsList")}>
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="h-4 w-4 ml-2" />
              חזרה לרשימת הכלים
            </Button>
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* פרטי הכלי */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="mb-2">{getCategoryLabel(tool.category)}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={toggleLoading}
                    onClick={toggleFavorite}
                    className={`text-orange-500 p-1 h-auto ${isFavorite ? 'border-orange-400' : ''}`}
                  >
                    {isFavorite ? <Star className="h-5 w-5" /> : <StarOff className="h-5 w-5" />}
                  </Button>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= tool.rating ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  
                  {tool.price_type && (
                    <Badge variant="outline">{getPriceTypeLabel(tool.price_type)}</Badge>
                  )}
                  
                  {tool.last_update && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>עדכון אחרון: {formatDate(tool.last_update)}</span>
                    </div>
                  )}
                </div>
                
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block mb-8">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg gap-2 w-full md:w-auto">
                    <ExternalLink className="h-5 w-5" />
                    בקר באתר הכלי
                  </Button>
                </a>
                
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
                    <TabsTrigger value="updates">עדכונים אחרונים</TabsTrigger>
                    <TabsTrigger value="reviews">חוות דעת</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-3">תיאור</h2>
                      <p className="text-[#233071] whitespace-pre-wrap">{tool.description}</p>
                    </div>
                    
                    {tool.tags && tool.tags.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold mb-3">תגיות</h2>
                        <div className="flex flex-wrap gap-2">
                          {tool.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="updates">
                    {tool.update_notes ? (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">עדכון מ-{formatDate(tool.last_update)}</h3>
                        <p className="text-[#233071]">{tool.update_notes}</p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        אין עדכונים להצגה
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="font-bold mb-2">אין חוות דעת עדיין</h3>
                      <p className="text-gray-500">היה הראשון לחלוק את חוויתך עם כלי זה</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* סרגל צדדי */}
          <div className="space-y-6">
            {/* כלים דומים */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">כלים דומים</h2>
                
                {similarTools.length > 0 ? (
                  <div className="space-y-4">
                    {similarTools.map(similarTool => (
                      <div key={similarTool.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <Link to={createPageUrl(`AIToolDetails?id=${similarTool.id}`)} className="block hover:bg-gray-50 rounded p-2 -mx-2">
                          <h3 className="font-semibold text-blue-800">{similarTool.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${star <= similarTool.rating ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="mx-2">•</span>
                            <span>{getPriceTypeLabel(similarTool.price_type)}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                    
                    <Link to={createPageUrl(`AIToolsList?category=${tool.category}`)} className="text-blue-800 font-medium flex items-center hover:underline">
                      כל הכלים בקטגוריה זו
                      <ArrowLeft className="h-4 w-4 mr-1" />
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray-500">אין כלים דומים להצגה</p>
                )}
              </CardContent>
            </Card>
            
            {/* שיתוף */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">שיתוף</h2>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  שתף כלי זה
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
