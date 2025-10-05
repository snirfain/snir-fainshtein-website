import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Star, StarOff, ExternalLink, Calendar, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserFavorite } from "@/api/entities";
import { User } from "@/api/entities";

export default function AIToolCard({ tool }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const user = await User.me();
        setUserEmail(user.email);
        
        const favorites = await UserFavorite.filter({
          user_email: user.email,
          link_id: tool.id
        });
        
        setIsFavorite(favorites.length > 0);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };
    
    checkFavorite();
  }, [tool.id]);

  const toggleFavorite = async () => {
    if (!userEmail) return;
    
    setIsLoading(true);
    
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
      setIsLoading(false);
    }
  };

  const getCategoryLabel = () => {
    const categories = {
      chatbots: "צ'אטבוטים",
      image_generation: "יצירת תמונות",
      code_generation: "כתיבת קוד",
      content_creation: "יצירת תוכן",
      data_analysis: "ניתוח נתונים",
      other: "אחר"
    };
    
    return categories[tool.category] || "אחר";
  };

  const getPriceTypeLabel = () => {
    const priceTypes = {
      free: "חינמי",
      freemium: "בסיס חינמי",
      paid: "בתשלום"
    };
    
    return priceTypes[tool.price_type] || "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <Badge className="mb-2">{getCategoryLabel()}</Badge>
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoading}
            onClick={toggleFavorite}
            className="text-orange-500 p-1 h-auto"
          >
            {isFavorite ? <Star className="h-5 w-5" /> : <StarOff className="h-5 w-5" />}
          </Button>
        </div>
        
        <h3 className="font-bold text-xl mb-2">{tool.title}</h3>
        
        <p className="text-[#233071] mb-4 flex-grow">{tool.description}</p>
        
        <div className="space-y-3 mt-auto">
          {tool.price_type && (
            <div className="flex items-center text-sm">
              <Badge variant="outline">{getPriceTypeLabel()}</Badge>
            </div>
          )}
          
          {tool.last_update && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 ml-1" />
              <span>עדכון אחרון: {formatDate(tool.last_update)}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {tool.tags && tool.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-[#233071]">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= tool.rating ? "text-orange-500 fill-orange-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <Link to={createPageUrl(`AIToolDetails?id=${tool.id}`)}>
                <Button variant="outline" size="sm">
                  פרטים
                </Button>
              </Link>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600" size="sm">
                  <ExternalLink className="h-4 w-4 ml-1" />
                  בקר
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}