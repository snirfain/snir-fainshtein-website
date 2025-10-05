import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, RefreshCw, Scale } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="py-16 md:py-24 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">תנאי שימוש</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">תנאי שימוש באתר</h1>
            <p className="text-[#233071]">עדכון אחרון: ינואר 2024</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-800" />
                  </div>
                  <h2 className="text-2xl font-bold">1. כללי</h2>
                </div>
                <p className="text-[#233071] leading-relaxed">
                  ברוכים הבאים לאתר של שניר פיינשטיין. השימוש באתר זה כפוף לתנאים המפורטים להלן. 
                  על ידי גישה לאתר ושימוש בו, אתה מסכים לתנאים אלה במלואם. אם אינך מסכים לתנאים אלה, 
                  אנא הימנע משימוש באתר.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold">2. זכויות קניין רוחני</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p>כל התכנים באתר זה, לרבות אך לא רק:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>טקסטים, תמונות, גרפיקה, לוגואים ועיצובים</li>
                    <li>תוכן דיגיטלי כגון תבניות, צ'קליסטים וקורסים</li>
                    <li>קוד מקור, תוכנות ואפליקציות</li>
                    <li>סימני מסחר ושמות מסחריים</li>
                  </ul>
                  <p>
                    הם רכוש של שניר פיינשטיין או בעלי הזכויות המתאימים, ומוגנים על פי דיני זכויות היוצרים 
                    והקניין הרוחני בישראל ובעולם.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. שימוש מותר</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>אתה רשאי:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>לצפות בתכני האתר למטרות אינפורמטיביות בלבד</li>
                    <li>לרכוש מוצרים ושירותים המוצעים באתר</li>
                    <li>להוריד ולהשתמש במוצרים דיגיטליים שרכשת בהתאם לרישיון שניתן</li>
                    <li>ליצור קשר עם שירות הלקוחות לשאלות ובעיות</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. הגבלות שימוש</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>אסור לך:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>להעתיק, לשכפל, להפיץ או למכור תכנים מהאתר ללא אישור</li>
                    <li>לשנות, לעדכן או ליצור יצירות נגזרות מהתכנים</li>
                    <li>להשתמש בתכנים למטרות מסחריות ללא הסכמה בכתב</li>
                    <li>לשתף או למכור מוצרים דיגיטליים שרכשת לצדדים שלישיים</li>
                    <li>להסיר סימני זכויות יוצרים או סימנים מזהים אחרים</li>
                    <li>להשתמש בבוטים, סקריפטים או כלים אוטומטיים לגישה לאתר</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">5. רכישות והחזרים</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p><strong>מדיניות רכישה:</strong></p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>כל הרכישות כפופות למדיניות התשלום וההחזרים של האתר</li>
                    <li>המחירים באתר הם במטבע המצוין וכוללים מע"מ (במידה והחוק מחייב)</li>
                    <li>אנו שומרים את הזכות לשנות מחירים ללא הודעה מראש</li>
                  </ul>
                  <p className="mt-3">
                    למידע מפורט, עיין ב<a href="/refund-policy" className="text-blue-800 hover:underline">מדיניות ההחזרים</a>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. מוצרים דיגיטליים</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>לגבי מוצרים דיגיטליים (תבניות, צ'קליסטים, קורסים):</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>קבלת גישה למוצר תתבצע לאחר אישור התשלום</li>
                    <li>מספר ההורדות מוגבל בהתאם למוצר (בדרך כלל 3 הורדות)</li>
                    <li>קישור ההורדה תקף למשך 30 יום מרגע הרכישה</li>
                    <li>אין זכות החזר על מוצרים דיגיטליים לאחר ההורדה</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. הגבלת אחריות</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    האתר והתכנים בו מוצגים "כמות שהם" (AS IS) ו"כפי שזמינים" (AS AVAILABLE) ללא אחריות מכל סוג. 
                    אנו לא מתחייבים כי:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>האתר יהיה זמין בכל עת ללא הפרעות</li>
                    <li>התכנים יהיו נקיים מטעויות או שגיאות</li>
                    <li>השימוש באתר יהיה בטוח לחלוטין</li>
                    <li>התוצאות משימוש במוצרים יתאימו לציפיותיך</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. שיפוי</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    אתה מסכים לשפות ולפצות את שניר פיינשטיין, עובדיו, נציגיו ושותפיו מפני כל תביעה, 
                    נזק, הפסד או הוצאה (לרבות שכר טרחת עורך דין) הנובעים מ:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>השימוש שלך באתר או במוצרים</li>
                    <li>הפרת תנאי השימוש</li>
                    <li>הפרת כל זכות של צד שלישי</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Scale className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">9. שיפוט וחוק חל</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    תנאי שימוש אלה כפופים לדיני מדינת ישראל. כל סכסוך הנובע מתנאים אלה 
                    או מהשימוש באתר יידון אך ורק בבתי המשפט המוסמכים בישראל.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. שינויים בתנאי השימוש</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    אנו שומרים לעצמנו את הזכות לעדכן ולשנות את תנאי השימוש בכל עת. 
                    שינויים יכנסו לתוקף מיד עם פרסומם באתר. המשך שימוש באתר לאחר השינויים 
                    יהווה הסכמה לתנאים המעודכנים.
                  </p>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-3">יצירת קשר</h2>
                <p className="text-[#233071] mb-3">
                  לשאלות או הבהרות בנוגע לתנאי השימוש, ניתן ליצור קשר:
                </p>
                <ul className="space-y-2 text-[#233071]">
                  <li><strong>אימייל:</strong> snirfain@gmail.com</li>
                  <li><strong>טלפון:</strong> 050-3133641</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}