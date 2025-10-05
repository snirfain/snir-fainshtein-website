import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Star,
  Users,
  Zap,
  CheckCircle,
  MessageSquare,
  Image,
  Code,
  FileText,
  BarChart
} from "lucide-react";

export default function Subscription() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">מערכת קישורי AI</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              כל כלי ה-AI המובילים במקום אחד
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              גישה למאגר מקיף של כלי AI, כולל סקירות מעמיקות, עדכונים שוטפים והמלצות מותאמות אישית
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              למה להצטרף למאגר הכלים שלנו?
            </h2>
            <p className="text-lg text-[#233071]">
              קבלו גישה למידע מקיף ועדכני על מיטב כלי ה-AI בשוק
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Brain className="h-8 w-8 text-blue-800" />}
              title="כלים מובילים"
              description="מאגר מקיף של כלי AI מובילים עם דירוגים והמלצות"
            />
            <BenefitCard
              icon={<Zap className="h-8 w-8 text-purple-600" />}
              title="עדכונים שוטפים"
              description="מידע עדכני על שינויים, שיפורים ותכונות חדשות"
            />
            <BenefitCard
              icon={<Star className="h-8 w-8 text-orange-500" />}
              title="שמירת מועדפים"
              description="אפשרות לסמן ולארגן את הכלים המועדפים עליכם"
            />
            <BenefitCard
              icon={<Users className="h-8 w-8 text-green-600" />}
              title="חוויות משתמשים"
              description="סקירות וטיפים משימושיים מאנשי מקצוע"
            />
            <BenefitCard
              icon={<BarChart className="h-8 w-8 text-red-600" />}
              title="השוואת כלים"
              description="כלי השוואה מתקדם בין פלטפורמות דומות"
            />
            <BenefitCard
              icon={<MessageSquare className="h-8 w-8 text-teal-600" />}
              title="תמיכה מקצועית"
              description="ייעוץ והכוונה בבחירת הכלים המתאימים"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              קטגוריות כלים במאגר
            </h2>
            <p className="text-lg text-[#233071]">
              מגוון רחב של כלי AI למטרות שונות
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="צ'אטבוטים"
              count="25+ כלים"
            />
            <CategoryCard
              icon={<Image className="h-6 w-6" />}
              title="עיבוד תמונה"
              count="30+ כלים"
            />
            <CategoryCard
              icon={<Code className="h-6 w-6" />}
              title="פיתוח תוכנה"
              count="20+ כלים"
            />
            <CategoryCard
              icon={<FileText className="h-6 w-6" />}
              title="יצירת תוכן"
              count="35+ כלים"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    הצטרפו עכשיו
                  </h2>
                  <p className="text-lg text-[#233071]">
                    גישה מלאה לכל התכונות והכלים
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold">מנוי שנתי</h3>
                      <p className="text-[#233071]">גישה מלאה לשנה</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-800">₪499</div>
                      <div className="text-sm text-gray-500">לשנה</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Feature text="גישה למאגר המלא של כלי AI" />
                    <Feature text="עדכונים שוטפים על כלים חדשים" />
                    <Feature text="סקירות מעמיקות והשוואות" />
                    <Feature text="שמירת מועדפים והערות אישיות" />
                    <Feature text="תמיכה מקצועית" />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    הצטרפו עכשיו
                  </Button>
                </div>

                <div className="text-sm text-gray-500 text-center">
                  * ניתן לבטל את המנוי בכל עת
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              שאלות נפוצות
            </h2>

            <div className="space-y-6">
              <FaqItem
                question="איך מתחילים להשתמש במערכת?"
                answer="לאחר ההרשמה והתשלום, תקבלו גישה מיידית למאגר הכלים המלא. תוכלו לחפש, לסנן ולשמור כלים למועדפים."
              />
              <FaqItem
                question="האם המידע מתעדכן באופן שוטף?"
                answer="כן, אנחנו מעדכנים את המאגר באופן יומיומי עם כלים חדשים, עדכונים ושינויים בכלים קיימים."
              />
              <FaqItem
                question="האם ניתן לבטל את המנוי?"
                answer="כן, ניתן לבטל את המנוי בכל עת. לאחר הביטול תמשיכו ליהנות מהשירות עד תום תקופת המנוי."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const BenefitCard = ({ icon, title, description }) => (
  <Card className="text-center">
    <CardContent className="p-6">
      <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-[#233071]">{description}</p>
    </CardContent>
  </Card>
);

const CategoryCard = ({ icon, title, count }) => (
  <Card className="hover:shadow-lg transition-all">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg font-semibold mr-3">{title}</h3>
        </div>
        <Badge variant="secondary">{count}</Badge>
      </div>
    </CardContent>
  </Card>
);

const Feature = ({ text }) => (
  <div className="flex items-center">
    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

const FaqItem = ({ question, answer }) => (
  <div className="border-b border-gray-200 pb-4">
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-[#233071]">{answer}</p>
  </div>
);