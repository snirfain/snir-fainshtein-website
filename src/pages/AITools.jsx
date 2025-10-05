import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/api/entities";
import { UserSubscription } from "@/api/entities";

import {
  Search,
  Star,
  StarOff,
  ExternalLink,
  Clock,
  Tag,
  Filter,
  Lock
} from "lucide-react";

export default function AITools() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const user = await User.me();
      const subscriptions = await UserSubscription.filter({
        user_email: user.email,
        status: "active"
      });
      setIsSubscribed(subscriptions.length > 0);
    } catch (error) {
      setIsSubscribed(false);
    }
    setIsLoading(false);
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            מאגר כלי AI שימושיים
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="חיפוש כלים..."
                  className="pl-10 pr-12"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              סינון
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">הכל</TabsTrigger>
              <TabsTrigger value="chatbots">צ'אטבוטים</TabsTrigger>
              <TabsTrigger value="image">תמונות</TabsTrigger>
              <TabsTrigger value="code">קוד</TabsTrigger>
              <TabsTrigger value="content">תוכן</TabsTrigger>
              <TabsTrigger value="data">נתונים</TabsTrigger>
              <TabsTrigger value="favorites">מועדפים</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* כרטיסי כלים יוצגו כאן */}
          </div>
        </div>
      </div>
    </div>
  );
}