import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, Shield, Cookie, UserCheck, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="py-16 md:py-24 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">מדיניות פרטיות</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">מדיניות פרטיות</h1>
            <p className="text-[#233071]">עדכון אחרון: ינואר 2024</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Lock className="h-6 w-6 text-blue-800" />
                  </div>
                  <h2 className="text-2xl font-bold">1. מבוא</h2>
                </div>
                <p className="text-[#233071] leading-relaxed">
                  שניר פיינשטיין ("אנחנו", "שלנו") מחויב להגן על פרטיותך. מדיניות פרטיות זו מסבירה 
                  כיצד אנו אוספים, משתמשים, משתפים ומגנים על המידע האישי שלך כאשר אתה משתמש באתר שלנו 
                  ובשירותים שאנו מספקים.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold">2. איזה מידע אנו אוספים</h2>
                </div>
                <div className="space-y-4 text-[#233071]">
                  <div>
                    <h3 className="font-semibold mb-2">מידע שאתה מספק לנו:</h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li><strong>פרטי הרשמה:</strong> שם מלא, כתובת אימייל, מספר טלפון</li>
                      <li><strong>פרטי תשלום:</strong> פרטי כרטיס אשראי, כתובת לחיוב (מאוחסנים בצד ספקי התשלום בלבד)</li>
                      <li><strong>פרטי תקשורת:</strong> תכתובות אימייל, הודעות דרך טפסי יצירת קשר</li>
                      <li><strong>פרטי פרופיל:</strong> תמונת פרופיל, העדפות, מידע נוסף שתבחר לשתף</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">מידע שנאסף אוטומטית:</h3>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                      <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה</li>
                      <li><strong>נתוני שימוש:</strong> דפים שבוקרו, זמן שהייה באתר, לחיצות</li>
                      <li><strong>מיקום:</strong> מיקום גיאוגרפי כללי (מדינה, עיר) על בסיס IP</li>
                      <li><strong>מכשיר:</strong> מזהה מכשיר, גרסת אפליקציה</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. כיצד אנו משתמשים במידע</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>אנו משתמשים במידע שאנו אוספים למטרות הבאות:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>אספקת שירותים:</strong> עיבוד הזמנות, אספקת מוצרים דיגיטליים, תמיכת לקוחות</li>
                    <li><strong>שיפור חוויית המשתמש:</strong> התאמה אישית של תכנים, המלצות על מוצרים</li>
                    <li><strong>תקשורת:</strong> שליחת עדכונים, דיוור שיווקי (רק עם הסכמה מפורשת)</li>
                    <li><strong>ניתוח ושיפור:</strong> ניתוח דפוסי שימוש, זיהוי בעיות טכניות</li>
                    <li><strong>אבטחה:</strong> מניעת הונאות, הגנה מפני גישה לא מורשית</li>
                    <li><strong>חובות חוקיות:</strong> עמידה בדרישות רגולטוריות ומשפטיות</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">4. שיתוף מידע עם צדדים שלישיים</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p>אנו עשויים לשתף את המידע שלך עם הצדדים הבאים:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>ספקי תשלום:</strong> Stripe, PayPal, Tranzilla (לעיבוד תשלומים)</li>
                    <li><strong>שירותי אחסון:</strong> ספקי אחסון ענן לשמירת קבצים</li>
                    <li><strong>שירותי ניתוח:</strong> Google Analytics, Facebook Pixel (לשיפור השירות)</li>
                    <li><strong>שירותי דיוור:</strong> Mailchimp, Brevo (רק אם נרשמת לרשימת תפוצה)</li>
                    <li><strong>רשויות:</strong> כאשר נדרש על פי חוק או לצורך הגנה על זכויותינו</li>
                  </ul>
                  <p className="mt-3">
                    אנו מבטיחים שהצדדים השלישיים מחויבים להגן על המידע שלך ולא להשתמש בו למטרות אחרות.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Cookie className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">5. עוגיות (Cookies)</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p>אנו משתמשים בעוגיות וטכנולוגיות דומות כדי:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>לזכור את ההעדפות והגדרות שלך</li>
                    <li>לשמור על המשך התחברות למערכת</li>
                    <li>לנתח תעבורה ושימוש באתר</li>
                    <li>לספק פרסומות מותאמות אישית</li>
                  </ul>
                  <p className="mt-3">
                    אתה יכול לנהל את העדפות העוגיות שלך דרך הגדרות הדפדפן שלך. חסימת עוגיות מסוימות 
                    עלולה להשפיע על חווית השימוש באתר.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. אבטחת מידע</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>אנו נוקטים באמצעים סבירים כדי להגן על המידע שלך, כולל:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>הצפנת SSL/TLS לכל העברות נתונים</li>
                    <li>גישה מוגבלת למידע רק לעובדים מורשים</li>
                    <li>עדכוני אבטחה שוטפים של המערכות</li>
                    <li>גיבויים תקופתיים של נתונים</li>
                  </ul>
                  <p className="mt-3">
                    למרות מאמצינו, אין שיטת העברה או אחסון מידע מאובטחת ב-100%. לכן, אנו לא יכולים להבטיח 
                    אבטחה מוחלטת של המידע שלך.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <UserCheck className="h-6 w-6 text-blue-800" />
                  </div>
                  <h2 className="text-2xl font-bold">7. הזכויות שלך (GDPR)</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p>אם אתה תושב אזור הכלכלי האירופי, יש לך את הזכויות הבאות:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>זכות גישה:</strong> לקבל עותק של המידע שאנו מחזיקים עליך</li>
                    <li><strong>זכות לתיקון:</strong> לבקש תיקון מידע שגוי או לא מדויק</li>
                    <li><strong>זכות למחיקה:</strong> לבקש מחיקת המידע שלך ("הזכות להישכח")</li>
                    <li><strong>זכות להגבלה:</strong> להגביל את השימוש במידע שלך</li>
                    <li><strong>זכות לניידות:</strong> לקבל את המידע שלך בפורמט מובנה</li>
                    <li><strong>זכות להתנגדות:</strong> להתנגד לשימוש במידע למטרות שיווקיות</li>
                  </ul>
                  <p className="mt-3">
                    כדי לממש את הזכויות שלך, אנא צור קשר בכתובת: snirfain@gmail.com
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. שמירת מידע</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    אנו שומרים את המידע האישי שלך כל עוד הוא נחוץ למטרות שלשמן נאסף, או כל עוד נדרש 
                    על פי חוק. לאחר תקופה זו, המידע יימחק או יוסר זיהוי באופן שלא ניתן לשחזרו.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold">9. העברות בינלאומיות</h2>
                </div>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    המידע שלך עשוי להיות מועבר ומאוחסן בשרתים הממוקמים מחוץ למדינת המגורים שלך. 
                    אנו מבטיחים כי כל העברה כזו תעשה בהתאם לדרישות החוק החל ועם אמצעי אבטחה מתאימים.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. שינויים במדיניות פרטיות</h2>
                <div className="space-y-3 text-[#233071]">
                  <p>
                    אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו באתר 
                    ויישלחו אליך במייל (אם סיפקת כתובת אימייל). המשך שימוש באתר לאחר השינויים 
                    מהווה הסכמה למדיניות המעודכנת.
                  </p>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-3">יצירת קשר - מנהל הפרטיות</h2>
                <p className="text-[#233071] mb-3">
                  לשאלות, בקשות או תלונות בנוגע למדיניות הפרטיות:
                </p>
                <ul className="space-y-2 text-[#233071]">
                  <li><strong>שם:</strong> שניר פיינשטיין</li>
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