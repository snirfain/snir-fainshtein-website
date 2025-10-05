import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/api/entities";
import { UserSubscription } from "@/api/entities";
import { AILink } from "@/api/entities";
import { UserFavorite } from "@/api/entities";
import AIToolCard from "../components/AITools/AIToolCard";

import {
  Search,
  Filter,
  Lock,
  SlidersHorizontal,
  Star,
  Grid3X3,
  List
} from "lucide-react";

export default function AIToolsList() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePriceFilter, setActivePriceFilter] = useState("all");
  const [activeRatingFilter, setActiveRatingFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    checkSubscriptionAndLoadData();
  }, []);

  const checkSubscriptionAndLoadData = async () => {
    try {
      const user = await User.me();
      const subscriptions = await UserSubscription.filter({
        user_email: user.email,
        status: "active"
      });
      const isUserSubscribed = subscriptions.length > 0;
      
      setIsSubscribed(isUserSubscribed);
      
      if (isUserSubscribed) {
        await loadData(user.email);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async (userEmail) => {
    try {
      // טעינת כל הכלים
      const allTools = await AILink.list();
      setTools(allTools);
      
      // טעינת מועדפים
      const userFavorites = await UserFavorite.filter({
        user_email: userEmail
      });
      
      setFavorites(userFavorites.map(fav => fav.link_id));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const filteredTools = () => {
    return tools.filter(tool => {
      // סינון לפי חיפוש
      const matchesSearch = 
        searchTerm === "" || 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      // סינון לפי קטגוריה
      const matchesCategory = 
        activeCategory === "all" || 
        tool.category === activeCategory;
      
      // סינון לפי מחיר
      const matchesPrice = 
        activePriceFilter === "all" || 
        tool.price_type === activePriceFilter;
      
      // סינון לפי דירוג
      const matchesRating = 
        activeRatingFilter === "all" || 
        (tool.rating >= parseInt(activeRatingFilter));
        
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  };

  const getFavoritedTools = () => {
    return filteredTools().filter(tool => favorites.includes(tool.id));
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

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              מאגר כלי AI שימושיים
            </h1>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setViewMode("list")}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="חיפוש כלים..."
                    className="pl-10 pr-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="w-full md:w-auto">
                  <Select value={activePriceFilter} onValueChange={setActivePriceFilter}>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="סנן לפי מחיר" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל המחירים</SelectItem>
                      <SelectItem value="free">חינמי</SelectItem>
                      <SelectItem value="freemium">בסיס חינמי</SelectItem>
                      <SelectItem value="paid">בתשלום</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-auto">
                  <Select value={activeRatingFilter} onValueChange={setActiveRatingFilter}>
                    <SelectTrigger className="min-w-[150px]">
                      <SelectValue placeholder="סנן לפי דירוג" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל הדירוגים</SelectItem>
                      <SelectItem value="5">5 כוכבים</SelectItem>
                      <SelectItem value="4">4+ כוכבים</SelectItem>
                      <SelectItem value="3">3+ כוכבים</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="default" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  סינון מתקדם
                </Button>
              </div>
            </div>
          </div>

          <Tabs 
            defaultValue="all" 
            value={activeCategory === "favorites" ? "favorites" : activeCategory} 
            className="mb-8"
            onValueChange={(value) => {
              if (value === "favorites") {
                setActiveCategory("favorites");
              } else {
                setActiveCategory(value);
              }
            }}
          >
            <div className="overflow-x-auto">
              <TabsList className="mb-6">
                <TabsTrigger value="all">הכל</TabsTrigger>
                <TabsTrigger value="chatbots">צ'אטבוטים</TabsTrigger>
                <TabsTrigger value="image_generation">תמונות</TabsTrigger>
                <TabsTrigger value="code_generation">קוד</TabsTrigger>
                <TabsTrigger value="content_creation">תוכן</TabsTrigger>
                <TabsTrigger value="data_analysis">נתונים</TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  מועדפים
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className={viewMode === "grid" ? 
                "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                "space-y-4"
              }>
                {filteredTools().length > 0 ? (
                  filteredTools().map(tool => (
                    <AIToolCard key={tool.id} tool={tool} />
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center text-gray-500">
                    לא נמצאו כלים התואמים לחיפוש
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              <div className={viewMode === "grid" ? 
                "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                "space-y-4"
              }>
                {getFavoritedTools().length > 0 ? (
                  getFavoritedTools().map(tool => (
                    <AIToolCard key={tool.id} tool={tool} />
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center text-gray-500">
                    לא נמצאו כלים במועדפים
                  </div>
                )}
              </div>
            </TabsContent>

            {["chatbots", "image_generation", "code_generation", "content_creation", "data_analysis"].map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className={viewMode === "grid" ? 
                  "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                  "space-y-4"
                }>
                  {filteredTools().filter(tool => tool.category === category).length > 0 ? (
                    filteredTools()
                      .filter(tool => tool.category === category)
                      .map(tool => (
                        <AIToolCard key={tool.id} tool={tool} />
                      ))
                  ) : (
                    <div className="col-span-3 py-16 text-center text-gray-500">
                      לא נמצאו כלים בקטגוריה זו
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}