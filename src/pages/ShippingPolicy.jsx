import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Download, Mail, Clock, CheckCircle } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="py-16 md:py-24 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">מדיניות משלוחים</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">מדיניות אספקה ומשלוחים</h1>
            <p className="text-[#233071]">עדכון אחרון: ינואר 2024</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Package className="h-6 w-6 text-blue-800" />
                  </div>
                  <h2 className="text-2xl font-bold">1. סוגי המוצרים</h2>
                </div>
                <div className="space-y-4 text-[#233071]">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Download className="h-5 w-5 text-blue-800" />
                      מוצרים דיגיטליים (100% מהמוצרים)
                    </h3>
                    <p>
                      כל המוצרים באתר שלנו הם דיגיטליים - תבניות, צ'קליסטים, קורסים מקוונים ומדריכים. 
                      אין משלוח פיזי, והמוצרים זמינים להורדה מיידית לאחר השלמת התשלום.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">2. זמני אספקה</h2>
                </div>
                <div className="space-y-4 text-[#233071]">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        אספקה מיידית
                      </h3>
                      <p className="text-sm">
                        לאחר אישור התשלום (בדרך כלל תוך דקות), תקבל מייל עם קישור להורדה 
                        וגישה למוצר בדף "המוצרים שלי".
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-800" />
                        מייל אישור
                      </h3>
                      <p className="text-sm">
                        תקבל מייל אישור רכישה עם כל הפרטים ולינק ישיר להורדה. 
                        אם לא קיבלת מייל תוך 10 דקות, בדוק את תיקיית הספאם.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. תהליך ההורדה</h2>
                <div className="space-y-4 text-[#233071]">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">שלבי ההורדה:</h3>
                    <ol className="list-decimal list-inside space-y-3 mr-4">
                      <li>
                        <strong>השלם את התשלום:</strong> בחר את אמצעי התשלום המועדף והשלם את הרכישה
                      </li>
                      <li>
                        <strong>קבל מייל אישור:</strong> תקבל מייל עם קישור להורדה וסיסמה (במידת הצורך)
                      </li>
                      <li>
                        <strong>היכנס לחשבון:</strong> או השתמש בקישור המיוחד מהמייל
                      </li>
                      <li>
                        <strong>לחץ על "הורד":</strong> לחץ על כפתור ההורדה והקובץ יתחיל להיות מורד
                      </li>
                      <li>
                        <strong>שמור את הקובץ:</strong> שמור את הקובץ במחשב שלך במקום נוח
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. הגבלות הורדה</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>כדי להגן על המוצרים והתוכן שלנו, יש הגבלות על ההורדות:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>מספר הורדות:</strong> בדרך כלל 3 הורדות למוצר (זה מאפשר גיבוי)</li>
                    <li><strong>תוקף הקישור:</strong> קישור ההורדה תקף ל-30 ימים מרגע הרכישה</li>
                    <li><strong>כתובת IP:</strong> ההורדות מוגבלות למספר מוגבל של כתובות IP</li>
                    <li><strong>גודל קובץ:</strong> וודא שיש לך מספיק מקום פנוי בדיסק</li>
                  </ul>
                  <p className="mt-3 text-sm bg-orange-50 p-3 rounded-lg">
                    <strong>שים לב:</strong> אם מיציתֿ את מספר ההורדות או פג תוקף הקישור, צור איתנו קשר 
                    ונאפשר גישה נוספת (תוך בדיקה שאכן הרכישה בוצעה על ידך).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. בעיות בהורדה</h2>
                <div className="space-y-4 text-[#233071]">
                  <h3 className="font-semibold">בעיות נפוצות ופתרונות:</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">🔗 הקישור לא עובד</h4>
                      <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
                        <li>ודא שהעתקת את כל הקישור (לפעמים הוא נשבר בין שורות במייל)</li>
                        <li>נסה לפתוח בדפדפן אחר או במצב גלישה פרטית</li>
                        <li>נקה את ה-cache וה-cookies של הדפדפן</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">⏳ ההורדה איטית מדי</h4>
                      <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
                        <li>בדוק את מהירות האינטרנט שלך</li>
                        <li>נסה להוריד בשעות שונות ביום</li>
                        <li>סגור תוכנות אחרות שעשויות להשתמש ברוחב הפס</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">❌ ההורדה נכשלת</h4>
                      <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
                        <li>ודא שיש מספיק מקום פנוי בדיסק</li>
                        <li>נסה להוריד עם מנהל הורדות (Download Manager)</li>
                        <li>בדוק שהאנטי-וירוס לא חוסם את ההורדה</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">📁 הקובץ לא נפתח</h4>
                      <ul className="list-disc list-inside space-y-1 mr-4 text-sm">
                        <li>וודא שיש לך תוכנה מתאימה לפתיחת הקובץ (PDF reader, ZIP extractor)</li>
                        <li>נסה להוריד שוב - ייתכן שההורדה הייתה לא שלמה</li>
                        <li>פנה אלינו ונשלח לך את הקובץ במייל ישירות</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. הרשאות והתקנה</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    המוצרים הדיגיטליים שלנו מגיעים עם רישיון שימוש אישי:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>שימוש אישי:</strong> רשאי להשתמש במוצר למטרות אישיות או עסקיות שלך</li>
                    <li><strong>מספר מכשירים:</strong> ניתן להתקין על עד 2-3 מכשירים שבבעלותך</li>
                    <li><strong>עדכונים:</strong> תקבל עדכונים חינם למשך שנה (אם קיימים)</li>
                    <li><strong>תמיכה:</strong> תמיכה טכנית בסיסית למשך 30 יום</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. מה לא מותר</h2>
                <div className="space-y-3 text-[#233071]">
                  <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
                    <p className="font-semibold mb-2">פעולות אסורות:</p>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li>שיתוף הקבצים עם אחרים או העלאתם לאינטרנט</li>
                      <li>מכירה חוזרת או הפצה מסחרית של המוצרים</li>
                      <li>הסרת סימני זכויות יוצרים מהמוצרים</li>
                      <li>שימוש בתוכן ליצירת מוצרים מתחרים</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. אבטחה ופרטיות</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    כל ההורדות מוצפנות ומאובטחות:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>חיבור SSL מאובטח לכל ההורדות</li>
                    <li>קישורי הורדה ייחודיים לכל לקוח</li>
                    <li>מעקב אחר הורדות למניעת שימוש לרעה</li>
                    <li>אין אחסון של פרטי כרטיס האשראי שלך</li>
                  </ul>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-3">צריך עזרה?</h2>
                <p className="text-[#233071] mb-3">
                  אם נתקלת בבעיה כלשהי בהורדה או בגישה למוצרים:
                </p>
                <ul className="space-y-2 text-[#233071]">
                  <li><strong>אימייל:</strong> snirfain@gmail.com</li>
                  <li><strong>טלפון:</strong> 050-3133641</li>
                  <li><strong>זמן תגובה:</strong> תוך 24 שעות בימי עסקים</li>
                </ul>
                <p className="text-sm mt-3 text-[#233071]">
                  אנו מחויבים לוודא שתקבל גישה מלאה לכל המוצרים שרכשת!
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}