
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Search, HelpCircle, CreditCard, Truck, RefreshCw, Shield, FileText, Info } from "lucide-react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqCategories = {
    purchase: {
      title: "רכישה ותשלום",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          q: "אילו אמצעי תשלום אתם מקבלים?",
          a: "אנו מקבלים כרטיסי אשראי (Visa, Mastercard, American Express), PayPal, Bit ו-Paybox. כל התשלומים מאובטחים ומוצפנים."
        },
        {
          q: "האם התשלום באתר מאובטח?",
          a: "כן לחלוטין! כל התשלומים מוצפנים באמצעות SSL ומעובדים דרך ספקי תשלום מאושרים ומהימנים. איננו שומרים פרטי כרטיס אשראי במערכות שלנו."
        },
        {
          q: "האם אקבל חשבונית או קבלה?",
          a: "כן, לאחר השלמת הרכישה תקבל מייל אוטומטי עם אישור הזמנה וקבלה. החשבונית תכלול את כל פרטי העסקה."
        },
        {
          q: "מה קורה אם התשלום נכשל?",
          a: "אם התשלום נכשל, תקבל הודעת שגיאה מיידית. נסה להשתמש בכרטיס אחר או בצע קשר עם הבנק שלך. אם הבעיה נמשכת, צור איתנו קשר."
        },
        {
          q: "האם יש אפשרות לתשלומים?",
          a: "כרגע אנחנו לא מציעים תשלומים באתר, אך ניתן ליצור קשר לגבי רכישות גדולות או חבילות ייחודיות."
        },
        {
          q: "האם המחירים כוללים מע\"ם?",
          a: "כן, כל המחירים המוצגים באתר כוללים מע\"ם. מה שאתה רואה הוא מה שאתה משלם."
        }
      ]
    },
    shipping: {
      title: "משלוח והורדה",
      icon: <Truck className="h-5 w-5" />,
      questions: [
        {
          q: "מתי אקבל גישה למוצר הדיגיטלי שרכשתי?",
          a: "מוצרים דיגיטליים מועברים באופן מיידי - תוך מספר שניות לאחר אישור התשלום. תקבל קישור להורדה במייל ובעמוד אישור ההזמנה."
        },
        {
          q: "כמה עולה משלוח למוצרים דיגיטליים?",
          a: "משלוח למוצרים דיגיטליים הוא חינם! אין עלות נוספת - אתה מקבל גישה מיידית ללא עלויות משלוח."
        },
        {
          q: "האם יש משלוח למוצרים פיזיים?",
          a: "כן, משלוח רגיל בארץ עולה ₪30, משלוח מהיר ₪50. הזמנות מעל ₪300 כוללות משלוח חינם! זמן אספקה: 3-7 ימי עסקים למשלוח רגיל, 1-3 ימים למשלוח מהיר."
        },
        {
          q: "איך אוכל לעקוב אחר המשלוח שלי?",
          a: "לאחר שליחת המוצר הפיזי, תקבל מספר מעקב (tracking number) במייל. תוכל להשתמש בו כדי לעקוב אחר החבילה בזמן אמת."
        },
        {
          q: "מה קורה אם החבילה לא הגיעה?",
          a: "צור קשר איתנו תוך 3 ימים ממועד האספקה המשוער ונטפל בזה מיד. אנחנו עובדים עם חברות משלוח אמינות ופותרים כל בעיה במהירות."
        },
        {
          q: "האם אתם משלחים לכל הארץ?",
          a: "אנחנו משלחים למרבית האיזורים בארץ. לאיזורים מרוחקים או כתובות מיוחדות, כדאי להתייעץ איתנו לפני הזמנה."
        },
        {
          q: "האם אפשר לאסוף עצמית?",
          a: "כן, ניתן לתאם איסוף עצמי תוך 24-48 שעות לאחר ההזמנה. זה חינם לחלוטין!"
        }
      ]
    },
    refund: {
      title: "החזרים וביטולים",
      icon: <RefreshCw className="h-5 w-5" />,
      questions: [
        {
          q: "מה מדיניות הביטולים שלכם?",
          a: "ניתן לבטל הזמנה ולקבל החזר מלא תוך 14 ימים מיום הרכישה, בתנאי שהמוצר הדיגיטלי לא הורד ולא נעשה בו שימוש. למוצרים שהורדו - אין החזר על פי חוק."
        },
        {
          q: "איך מבקשים ביטול והחזר כספי?",
          a: "כדי לבטל הזמנה: 1) צור קשר דרך עמוד 'צור קשר', 2) ציין את מספר ההזמנה וסיבת הביטול, 3) נטפל בבקשה תוך 5-7 ימי עסקים, 4) תקבל אישור במייל."
        },
        {
          q: "כמה זמן לוקח לקבל את הכסף בחזרה?",
          a: "לאחר אישור הביטול, הכסף יוחזר לאמצעי התשלום המקורי: כרטיס אשראי 7-14 ימי עסקים, PayPal/Bit 3-5 ימי עסקים, העברה בנקאית עד 14 ימי עסקים."
        },
        {
          q: "האם מוצרים במבצע ניתנים להחזרה?",
          a: "מוצרים במבצע (הנחה של 20% ומעלה) עשויים להיות כפופים למדיניות החזרה מיוחדת. הפרטים יצוינו בדף המוצר ובאישור ההזמנה."
        },
        {
          q: "האם אפשר לקבל החזר חלקי?",
          a: "כן, במקרים מסוימים ניתן החזר חלקי - למשל: מוצר שלא עמד בתיאור, בעיות טכניות שמנעו גישה, או החזרה מאושרת של חלק מחבילה."
        },
        {
          q: "איך מבטלים מנוי או חבילה?",
          a: "ביטול מנויים/חבילות בהתאם לתנאי החבילה הספציפית. מנוי חודשי ניתן לביטול בכל עת עד 7 ימים לפני החיוב הבא."
        },
        {
          q: "האם ניתן לבטל פגישת ייעוץ?",
          a: "ניתן לבטל פגישת ייעוץ עד 24 שעות לפני המועד ולקבל החזר מלא. לאחר שהפגישה התקיימה - אין החזר."
        }
      ]
    },
    privacy: {
      title: "פרטיות ואבטחה",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          q: "איזה מידע אתם אוספים עליי?",
          a: "אנו אוספים מידע בסיסי: שם, אימייל, טלפון, כתובת (למשלוחים), פרטי תשלום (באופן מוצפן), והיסטוריית רכישות. כל המידע נשמר באופן מאובטח."
        },
        {
          q: "האם המידע האישי שלי מאובטח?",
          a: "כן! אנו משתמשים בטכנולוגיות הצפנה מתקדמות (SSL), שרתים מאובטחים, גישה מוגבלת למידע, ובקרות אבטחה קפדניות. המידע שלך מוגן היטב."
        },
        {
          q: "האם אתם משתפים את המידע שלי עם צדדים שלישיים?",
          a: "לא! אנו לא מוכרים או משכירים מידע אישי. אנו משתפים מידע רק עם ספקי שירות הכרחיים (עיבוד תשלומים, משלוחים) ורק במידה הנדרשת."
        },
        {
          q: "איך אוכל למחוק את החשבון והמידע שלי?",
          a: "אתה יכול לבקש מחיקת חשבון בכל עת דרך עמוד 'צור קשר'. נמחק את כל המידע האישי שלך תוך 30 יום, למעט מידע שחובה לשמור על פי חוק."
        },
        {
          q: "האם אתם משתמשים בעוגיות (Cookies)?",
          a: "כן, אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה, לזכור העדפות, ולנתח שימוש באתר. אתה יכול לנהל את העוגיות דרך הגדרות הדפדפן שלך."
        },
        {
          q: "מה הזכויות שלי לפי חוק הגנת הפרטיות?",
          a: "יש לך זכות לצפות במידע, לתקן פרטים, למחוק חשבון, להגביל שימוש במידע, להתנגד לשיווק ישיר, ולקבל העתק של המידע שלך."
        }
      ]
    },
    terms: {
      title: "תנאי שימוש",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          q: "מה ההסכמה לתנאי השימוש?",
          a: "על ידי שימוש באתר, רכישת מוצרים או שירותים, אתה מסכים לכל תנאי השימוש שלנו. מומלץ לקרוא אותם בקפידה לפני הרכישה."
        },
        {
          q: "האם אני יכול להשתמש במוצרים למטרות מסחריות?",
          a: "זה תלוי בסוג המוצר ובתנאי הרישיון שלו. חלק מהמוצרים מיועדים לשימוש אישי בלבד, אחרים מאפשרים שימוש מסחרי. בדוק את תנאי הרישיון בדף המוצר."
        },
        {
          q: "מי הבעלים על זכויות היוצרים של המוצרים?",
          a: "כל זכויות היוצרים, הקניין הרוחני והסימנים המסחריים של המוצרים והתוכן באתר שייכים לנו או למעניקי הרישיונות שלנו."
        },
        {
          q: "האם אפשר לשתף את המוצרים עם אחרים?",
          a: "לא. המוצרים מיועדים לשימוש אישי בלבד. שיתוף, העתקה, הפצה או מכירה חוזרת מהווים הפרת זכויות יוצרים ואסורים בחוק."
        },
        {
          q: "מה קורה אם יש שינוי בתנאי השימוש?",
          a: "אנו שומרים את הזכות לעדכן את תנאי השימוש מעת לעת. נפרסם גרסה מעודכנת באתר עם תאריך העדכון. המשך שימוש לאחר עדכון = הסכמה לתנאים החדשים."
        },
        {
          q: "מה אחריות האתר על תוכן ושירותים?",
          a: "אנו עושים כל מאמץ לספק מידע מדויק ומוצרים איכותיים, אך האתר מסופק 'כמות שהוא'. אין אחריות מפורשת או משתמעת למוצרים, למעט כפי שנדרש בחוק."
        }
      ]
    },
    general: {
      title: "שאלות כלליות",
      icon: <Info className="h-5 w-5" />,
      questions: [
        {
          q: "איך אני יוצר חשבון באתר?",
          a: "לחץ על 'התחבר/הירשם' בפינה השמאלית העליונה. תוכל להירשם עם אימייל וסיסמה או באמצעות חשבון Google. זה לוקח פחות מדקה!"
        },
        {
          q: "שכחתי את הסיסמה, מה לעשות?",
          a: "בדף ההתחברות, לחץ על 'שכחתי סיסמה'. תקבל מייל עם קישור לאיפוס. עקוב אחר ההוראות וצור סיסמה חדשה."
        },
        {
          q: "איך אפשר ליצור איתכם קשר?",
          a: "דרך עמוד 'צור קשר' באתר, במייל ישיר, או בטלפון בשעות הפעילות. אנחנו זמינים ותמיד שמחים לעזור!"
        },
        {
          q: "האם יש עדכונים חינם למוצרים?",
          a: "כן! כשמוצר שרכשת מתעדכן, תקבל מייל אוטומטי עם קישור לגרסה המעודכנת - ללא תשלום נוסף."
        },
        {
          q: "מה ההבדל בין המוצרים השונים באתר?",
          a: "יש תבניות (מסמכים מוכנים לשימוש), צ'קליסטים (רשימות בדיקה מקצועיות), קורסים דיגיטליים (הדרכות עם וידאו), ושירותי ייעוץ (פגישות אישיות 1-על-1)."
        },
        {
          q: "האם יש תמיכה טכנית?",
          a: "כן! יש תמיכה טכנית חינמית למשך 30 יום מרגע הרכישה. ניתן לפנות במייל, בטלפון או דרך עמוד צור קשר."
        },
        {
          q: "האם אתם מציעים הנחות או קופונים?",
          a: "כן, אנחנו מציעים מבצעים מעת לעת, הנחות לחבילות, וקופונים מיוחדים למנויים לניוזלטר. הירשם לניוזלטר כדי לקבל עדכונים על מבצעים!"
        }
      ]
    }
  };

  const allQuestions = Object.values(faqCategories).flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({ ...q, id: `${catIndex}-${qIndex}`, category: cat.title }))
  );

  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="py-16 md:py-24 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-base px-4 py-2 bg-blue-100 text-blue-900 ">שאלות נפוצות</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">שאלות ותשובות</h1>
            <p className="text-[#233071] mb-8">
              מצא תשובות לשאלות הנפוצות ביותר. לא מצאת מה שחיפשת? צור איתנו קשר!
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="חפש שאלה..."
                className="pr-12 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {searchQuery && filteredQuestions.length > 0 ? (
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold">תוצאות חיפוש ({filteredQuestions.length})</h2>
              {filteredQuestions.map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-blue-800" />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-2">{question.category}</Badge>
                        <h3 className="font-bold text-lg mb-2">{question.q}</h3>
                        <p className="text-[#233071]">{question.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <Card className="mb-8">
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#233071] mb-2">לא נמצאו תוצאות</h3>
                <p className="text-gray-500">נסה מילות חיפוש אחרות או עיין בקטגוריות למטה</p>
              </CardContent>
            </Card>
          ) : null}

          {!searchQuery && (
            <Tabs defaultValue="purchase">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto mb-8 gap-2">
                {Object.entries(faqCategories).map(([key, cat]) => (
                  <TabsTrigger key={key} value={key} className="gap-2">
                    {cat.icon}
                    {cat.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(faqCategories).map(([key, cat]) => (
                <TabsContent key={key} value={key}>
                  <div className="space-y-4">
                    {cat.questions.map((question, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() =>
                          setOpenQuestion(openQuestion === `${key}-${index}` ? null : `${key}-${index}`)
                        }
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2">{question.q}</h3>
                              {openQuestion === `${key}-${index}` && (
                                <p className="text-[#233071] mt-3 leading-relaxed">{question.a}</p>
                              )}
                            </div>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-400 flex-shrink-0 mr-4 transition-transform ${
                                openQuestion === `${key}-${index}` ? 'transform rotate-180' : ''
                              }`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          <Card className="mt-12 bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">לא מצאת תשובה לשאלה שלך?</h2>
              <p className="text-[#233071] mb-6">
                אנחנו כאן כדי לעזור! צור איתנו קשר ונשמח לענות על כל שאלה.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    צור קשר
                  </Button>
                </a>
                <a href="mailto:snirfain@gmail.com">
                  <Button variant="outline">
                    שלח מייל
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
