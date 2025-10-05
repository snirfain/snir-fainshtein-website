import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="py-16 md:py-24 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">מדיניות החזרים</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">מדיניות החזרים וביטולים</h1>
            <p className="text-[#233071]">עדכון אחרון: ינואר 2024</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-blue-800" />
                  </div>
                  <h2 className="text-2xl font-bold">1. כללי</h2>
                </div>
                <p className="text-[#233071] leading-relaxed">
                  אנו מחויבים לשביעות הרצון שלך ומבינים שלפעמים מוצר עשוי שלא להתאים לך. 
                  מדיניות החזרים שלנו נועדה להיות הוגנת הן ללקוחות והן לעסק, תוך שמירה על 
                  הזכויות של כל הצדדים.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">2. תקופת ההחזר</h2>
                </div>
                <div className="space-y-4 text-[#233071]">
                  <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      החזר כספי מלא - 14 ימים
                    </h3>
                    <p>
                      אם אינך מרוצה מהמוצר מכל סיבה שהיא, תוכל לבקש החזר כספי מלא תוך <strong>14 ימים</strong> 
                      מיום הרכישה, בתנאי שלא הורדת את המוצר הדיגיטלי יותר מפעם אחת.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border-r-4 border-orange-500">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      החזר חלקי - 14-30 ימים
                    </h3>
                    <p>
                      בין 14 ל-30 ימים מיום הרכישה, ניתן לבקש החזר בהתאם לנסיבות ולשימוש במוצר. 
                      ההחזר עשוי להיות חלקי (50%-75%) בהתאם לשיקול דעתנו.
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border-r-4 border-red-500">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      אין החזר - מעבר ל-30 ימים
                    </h3>
                    <p>
                      לאחר 30 ימים מיום הרכישה, לא ניתן לבקש החזר כספי, למעט במקרים חריגים 
                      של פגם במוצר או אי-אספקת השירות כפי שהוסכם.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. תנאים להחזר כספי</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>כדי להיות זכאי להחזר כספי, עליך לעמוד בכל התנאים הבאים:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>הבקשה הוגשה בתוך המסגרת הזמנים המפורטת לעיל</li>
                    <li>המוצר לא הורד יותר מפעם אחת (למעט הורדה טכנית כושלת)</li>
                    <li>לא בוצע שימוש מסחרי במוצר</li>
                    <li>המוצר לא שותף או הופץ לצדדים שלישיים</li>
                    <li>סיבה מפורטת לבקשת ההחזר (עוזרת לנו לשפר את המוצרים)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. מוצרים שאינם זכאים להחזר</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>המוצרים הבאים אינם זכאים להחזר כספי:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>שירותי ייעוץ:</strong> לאחר שהתקיים מפגש ייעוץ, לא ניתן להחזיר את העלות</li>
                    <li><strong>מוצרים מותאמים אישית:</strong> מוצרים שפותחו במיוחד עבורך</li>
                    <li><strong>מוצרים במבצע מיוחד:</strong> מוצרים שנמכרו בהנחה של מעל 50%</li>
                    <li><strong>חבילות משולבות:</strong> לאחר שימוש ביותר ממרכיב אחד בחבילה</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. תהליך בקשת החזר</h2>
                <div className="space-y-4 text-[#233071]">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">שלבי הבקשה:</h3>
                    <ol className="list-decimal list-inside space-y-3 mr-4">
                      <li>
                        <strong>שלח בקשה:</strong> שלח אימייל ל-snirfain@gmail.com עם:
                        <ul className="list-disc list-inside mr-6 mt-2 space-y-1 text-sm">
                          <li>מספר הזמנה</li>
                          <li>שם המוצר</li>
                          <li>סיבת ההחזר</li>
                          <li>כתובת האימייל שבוצעה בה הרכישה</li>
                        </ul>
                      </li>
                      <li>
                        <strong>בדיקת הבקשה:</strong> נבדוק את הבקשה תוך 2-3 ימי עסקים
                      </li>
                      <li>
                        <strong>אישור:</strong> תקבל אישור באימייל אם הבקשה אושרה
                      </li>
                      <li>
                        <strong>זיכוי:</strong> הכסף יוחזר לאמצעי התשלום המקורי תוך 5-10 ימי עסקים
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. החזר כספי חלקי</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>במקרים מסוימים, נוכל להציע החזר כספי חלקי:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>אם הורדת את המוצר פעמיים או יותר</li>
                    <li>אם עברו יותר מ-14 ימים מיום הרכישה</li>
                    <li>אם יש סימנים לשימוש נרחב במוצר</li>
                    <li>אם קיבלת הנחה משמעותית בעת הרכישה</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. בעיות טכניות</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    אם נתקלת בבעיה טכנית בהורדה או בשימוש במוצר:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>צור איתנו קשר <strong>לפני</strong> שתבקש החזר כספי</li>
                    <li>ננסה לפתור את הבעיה תוך 24-48 שעות</li>
                    <li>אם לא נצליח לפתור, תקבל החזר כספי מלא ללא תנאי</li>
                    <li>בעיות טכניות אינן נספרות כהורדה לצורך מדיניות ההחזר</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. ביטול הזמנה</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    ניתן לבטל הזמנה <strong>לפני</strong> ההורדה הראשונה:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>הזמנות שטרם הורדו ניתנות לביטול תוך 24 שעות מהרכישה</li>
                    <li>ביטול כזה יזכה בהחזר כספי מלא</li>
                    <li>לאחר ההורדה הראשונה, חלה מדיניות ההחזר הרגילה</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. זמני עיבוד</h2>
                <div className="space-y-3 text-[#233071]">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">בדיקת בקשה</h3>
                      <p>2-3 ימי עסקים</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">זיכוי לכרטיס אשראי</h3>
                      <p>5-10 ימי עסקים</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">זיכוי ל-PayPal</h3>
                      <p>1-3 ימי עסקים</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">העברה בנקאית</h3>
                      <p>3-7 ימי עסקים</p>
                    </div>
                  </div>
                  <p className="text-sm mt-3">
                    * הזמנים עשויים להשתנות בהתאם לבנק או לחברת כרטיסי האשראי שלך
                  </p>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-3">שאלות או בקשות להחזר?</h2>
                <p className="text-[#233071] mb-3">
                  אנו כאן כדי לעזור! צור קשר:
                </p>
                <ul className="space-y-2 text-[#233071]">
                  <li><strong>אימייל:</strong> snirfain@gmail.com</li>
                  <li><strong>טלפון:</strong> 050-3133641</li>
                  <li><strong>זמן תגובה:</strong> תוך 24 שעות בימי עסקים</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}