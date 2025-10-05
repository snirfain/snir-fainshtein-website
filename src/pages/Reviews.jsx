import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, ThumbsUp, CheckCircle, Quote } from "lucide-react";

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "דנה כהן",
      role: "מנהלת הדרכה, חברת הייטק",
      rating: 5,
      date: "לפני שבועיים",
      text: "שניר סייע לנו להטמיע מערכת הדרכה מבוססת AI שחוללה מהפכה בארגון. המקצועיות והיכולת ליישם פתרונות מותאמים היו מעולות. ממליצה בחום!",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      name: "יוסי לוי",
      role: "מנכ\"ל, סטארטאפ",
      rating: 5,
      date: "לפני חודש",
      text: "התבניות והכלים שרכשתי חסכו לנו שעות עבודה רבות. תוכן איכותי ומקצועי, שירות מעולה ותמיכה זמינה. שווה כל שקל!",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      name: "מיכל אברהם",
      role: "מנהלת למידה ארגונית",
      rating: 5,
      date: "לפני 3 שבועות",
      text: "הקורס על יישום AI בהדרכה היה מעשיר ומעשי. למדתי כלים שאני משתמשת בהם כל יום. שניר מומחה אמיתי בתחום!",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      name: "אורן גולן",
      role: "VP Learning & Development",
      rating: 4,
      date: "לפני חודשיים",
      text: "ייעוץ מקצועי ומדויק. שניר הבין את הצרכים שלנו במהירות והציע פתרונות יעילים. יש עוד מקום לשיפור בתיעוד, אבל בסך הכל מצוין.",
      verified: true,
      helpful: 6
    },
    {
      id: 5,
      name: "שרה ברק",
      role: "מאמנת ארגונית",
      rating: 5,
      date: "לפני שבוע",
      text: "הצ'קליסטים והתבניות פשוט מושלמים! חסכו לי המון זמן בהכנת חומרי הדרכה. הכל מאורגן, ברור ומקצועי.",
      verified: false,
      helpful: 4
    }
  ];

  const stats = {
    average: 4.8,
    total: reviews.length,
    distribution: {
      5: 80,
      4: 15,
      3: 3,
      2: 1,
      1: 1
    }
  };

  const renderStars = (count, size = "w-5 h-5") => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`${size} ${index < count ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4">ביקורות לקוחות</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">מה אומרים עלינו</h1>
            <p className="text-lg text-[#233071]">
              קראו מה הלקוחות שלנו חושבים על השירותים והמוצרים
            </p>
          </div>

          {/* Stats Overview */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center md:text-right">
                  <div className="text-5xl font-bold text-orange-500 mb-2">{stats.average}</div>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                    {renderStars(5, "w-6 h-6")}
                  </div>
                  <p className="text-[#233071]">מבוסס על {stats.total} ביקורות</p>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="w-12 text-sm">{stars} כוכבים</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-400" 
                          style={{ width: `${stats.distribution[stars]}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-sm text-[#233071]">{stats.distribution[stars]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-6 mb-12">
            {reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold flex-shrink-0">
                      {review.name[0]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{review.name}</h3>
                            {review.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" title="רכישה מאומתת" />
                            )}
                          </div>
                          <p className="text-sm text-[#233071]">{review.role}</p>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(review.rating, "w-4 h-4")}
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -right-2 h-8 w-8 text-gray-200" />
                        <p className="text-[#233071] leading-relaxed relative z-10">{review.text}</p>
                      </div>

                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          <span>מועיל ({review.helpful})</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Write Review Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">כתוב ביקורת</h2>
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold">הדירוג שלך</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hover || rating)
                              ? 'fill-orange-500 text-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold">שם מלא</label>
                  <Input placeholder="השם שלך" />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">תפקיד (אופציונלי)</label>
                  <Input placeholder="התפקיד שלך" />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">הביקורת שלך</label>
                  <Textarea 
                    placeholder="שתף אותנו בחוויה שלך..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                  שלח ביקורת
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}