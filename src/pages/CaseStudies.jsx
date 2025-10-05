
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Lightbulb, 
  PencilRuler, 
  Users, 
  Calendar, 
  Building, 
  ArrowUpRight, 
  BarChart, 
  Clock, 
  Award,
  Tag,
  ArrowRight,
  MessageSquare
} from "lucide-react";

export default function CaseStudies() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')]
          bg-center bg-cover"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-orange-400 hover:bg-orange-500 text-white">סיפורי הצלחה</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              פרויקטים ותוצאות שמדברות בעד עצמן
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              צפו בפרויקטים שהובלתי אצל לקוחות מגוונים ובתוצאות העסקיות המרשימות שהושגו
            </p>
            <Link to={createPageUrl("Schedule")}>
              <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-6">
                <Calendar className="h-5 w-5 ml-2" />
                קבע פגישה לשיתוף אתגרים
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Filters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">פרויקטים לפי תחום</h2>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">הכל</TabsTrigger>
                <TabsTrigger value="ai">יישום AI</TabsTrigger>
                <TabsTrigger value="training">פיתוח הדרכה</TabsTrigger>
                <TabsTrigger value="innovation">חדשנות בלמידה</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                  logo="חברת תוכנה"
                  category="יישום AI"
                  title="מערכת הדרכה חכמה מבוססת AI"
                  description="פיתוח והטמעת מערכת הדרכה מבוססת AI שמתאימה את תכני הלמידה באופן אישי לכל עובד ומעקב אחר התקדמותו"
                  results={[
                    "40% עלייה בשיעורי השלמת קורסים",
                    "25% קיצור זמני למידה",
                    "92% שביעות רצון משתמשים"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1573164574230-db1d5e960238?q=80&w=2069&auto=format&fit=crop"
                  logo="בנק מוביל"
                  category="פיתוח הדרכה"
                  title="תכנית הכשרה מקיפה לבנקאים"
                  description="פיתוח והטמעת תכנית הכשרה מקיפה לבנקאים חדשים, הכוללת לומדות, סימולציות וליווי אישי"
                  results={[
                    "60% קיצור זמני הכשרה",
                    "35% שיפור בציוני מבחני ההסמכה",
                    "28% שיפור בשביעות רצון לקוחות"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                  logo="חברת תקשורת"
                  category="חדשנות בלמידה"
                  title="קהילת ידע וחדשנות ארגונית"
                  description="הקמת קהילת ידע וחדשנות ארגונית המשלבת למידה חברתית, גיימיפיקציה ומערכת תגמולים"
                  results={[
                    "75% מהעובדים משתתפים בפעילות",
                    "300% עלייה בשיתוף ידע בין עובדים",
                    "52% צמצום בזמן פתרון בעיות"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                  logo="חברת היי-טק"
                  category="יישום AI"
                  title="צ'אטבוט הדרכה לעובדים חדשים"
                  description="פיתוח והטמעת צ'אטבוט חכם המלווה עובדים חדשים בתהליך הקליטה וההכשרה הראשונית"
                  results={[
                    "45% הפחתה בפניות לצוות משאבי אנוש",
                    "30% קיצור זמני קליטה",
                    "96% מהשאלות זוכות למענה מהיר ומדויק"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                  logo="חברת ביטוח"
                  category="פיתוח הדרכה"
                  title="מערך הדרכה דיגיטלי לסוכני ביטוח"
                  description="פיתוח מערך הדרכה דיגיטלי מקיף לסוכני ביטוח, הכולל לומדות, סימולציות ומערך בחינה ומשוב"
                  results={[
                    "50% חיסכון בעלויות הדרכה",
                    "40% שיפור בהישגי סוכנים",
                    "65% עלייה במכירות לאחר הכשרה"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1577100078279-b3445eae827c?q=80&w=1974&auto=format&fit=crop"
                  logo="רשת קמעונאית"
                  category="חדשנות בלמידה"
                  title="מערכת גיימיפיקציה להכשרת עובדי מכירות"
                  description="פיתוח והטמעת מערכת גיימיפיקציה חדשנית להכשרת עובדי מכירות, המשלבת למידה חווייתית ותחרותית"
                  results={[
                    "82% שיעור השתתפות בתכנית",
                    "45% שיפור בידע מקצועי",
                    "28% עלייה במכירות ממוצעות לעובד"
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                  logo="חברת תוכנה"
                  category="יישום AI"
                  title="מערכת הדרכה חכמה מבוססת AI"
                  description="פיתוח והטמעת מערכת הדרכה מבוססת AI שמתאימה את תכני הלמידה באופן אישי לכל עובד ומעקב אחר התקדמותו"
                  results={[
                    "40% עלייה בשיעורי השלמת קורסים",
                    "25% קיצור זמני למידה",
                    "92% שביעות רצון משתמשים"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                  logo="חברת היי-טק"
                  category="יישום AI"
                  title="צ'אטבוט הדרכה לעובדים חדשים"
                  description="פיתוח והטמעת צ'אטבוט חכם המלווה עובדים חדשים בתהליך הקליטה וההכשרה הראשונית"
                  results={[
                    "45% הפחתה בפניות לצוות משאבי אנוש",
                    "30% קיצור זמני קליטה",
                    "96% מהשאלות זוכות למענה מהיר ומדויק"
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="training" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1573164574230-db1d5e960238?q=80&w=2069&auto=format&fit=crop"
                  logo="בנק מוביל"
                  category="פיתוח הדרכה"
                  title="תכנית הכשרה מקיפה לבנקאים"
                  description="פיתוח והטמעת תכנית הכשרה מקיפה לבנקאים חדשים, הכוללת לומדות, סימולציות וליווי אישי"
                  results={[
                    "60% קיצור זמני הכשרה",
                    "35% שיפור בציוני מבחני ההסמכה",
                    "28% שיפור בשביעות רצון לקוחות"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                  logo="חברת ביטוח"
                  category="פיתוח הדרכה"
                  title="מערך הדרכה דיגיטלי לסוכני ביטוח"
                  description="פיתוח מערך הדרכה דיגיטלי מקיף לסוכני ביטוח, הכולל לומדות, סימולציות ומערך בחינה ומשוב"
                  results={[
                    "50% חיסכון בעלויות הדרכה",
                    "40% שיפור בהישגי סוכנים",
                    "65% עלייה במכירות לאחר הכשרה"
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="innovation" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                  logo="חברת תקשורת"
                  category="חדשנות בלמידה"
                  title="קהילת ידע וחדשנות ארגונית"
                  description="הקמת קהילת ידע וחדשנות ארגונית המשלבת למידה חברתית, גיימיפיקציה ומערכת תגמולים"
                  results={[
                    "75% מהעובדים משתתפים בפעילות",
                    "300% עלייה בשיתוף ידע בין עובדים",
                    "52% צמצום בזמן פתרון בעיות"
                  ]}
                />
                
                <CaseStudyCard 
                  image="https://images.unsplash.com/photo-1577100078279-b3445eae827c?q=80&w=1974&auto=format&fit=crop"
                  logo="רשת קמעונאית"
                  category="חדשנות בלמידה"
                  title="מערכת גיימיפיקציה להכשרת עובדי מכירות"
                  description="פיתוח והטמעת מערכת גיימיפיקציה חדשנית להכשרת עובדי מכירות, המשלבת למידה חווייתית ותחרותית"
                  results={[
                    "82% שיעור השתתפות בתכנית",
                    "45% שיפור בידע מקצועי",
                    "28% עלייה במכירות ממוצעות לעובד"
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Detailed Case Study */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">מקרה בוחן מורחב</h2>
            <p className="text-lg text-[#233071]">
              הצצה מעמיקה לאחד הפרויקטים המשמעותיים שהובלתי, מהאתגר הראשוני ועד לתוצאות הסופיות
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <div className="h-64 md:h-full bg-blue-600 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1947&auto=format&fit=crop" 
                    alt="צוות עבודה על פרויקט AI" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <Badge className="self-start mb-3 bg-orange-400 text-white">יישום AI בחברת היי-טק</Badge>
                    <h3 className="text-2xl font-bold">מערכת למידה אדפטיבית מבוססת AI</h3>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/5 p-6 md:p-10">
                <div className="mb-8">
                  <h4 className="text-xl font-bold flex items-center mb-4">
                    <Tag className="h-5 w-5 ml-2 text-blue-800" />
                    האתגר
                  </h4>
                  <p className="text-[#233071]">
                    חברת היי-טק מובילה התמודדה עם צורך להכשיר מאות עובדים חדשים מדי שנה במערכות מורכבות. תהליכי ההכשרה היו ארוכים, יקרים, ולא תמיד אפקטיביים. החברה נדרשה לפתרון שיאפשר הכשרה מהירה יותר, מותאמת אישית, וחסכונית יותר, תוך שמירה על רמת מקצועיות גבוהה.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold flex items-center mb-4">
                    <Lightbulb className="h-5 w-5 ml-2 text-blue-800" />
                    הפתרון
                  </h4>
                  <p className="text-[#233071] mb-4">
                    פיתחנו מערכת למידה אדפטיבית מבוססת AI שכללה:
                  </p>
                  <ul className="space-y-2 text-[#233071] mr-5">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1 ml-2">1</span>
                      מערכת ניתוח פערי ידע אוטומטית המזהה את הצרכים הספציפיים של כל עובד
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1 ml-2">2</span>
                      תכני למידה מודולריים שמותאמים דינמית לכל לומד בהתאם להתקדמותו
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1 ml-2">3</span>
                      צ'אטבוט מבוסס AI לתמיכה ומענה על שאלות בזמן אמת
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1 ml-2">4</span>
                      מערכת סימולציות אינטראקטיבית להתנסות מעשית
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1 ml-2">5</span>
                      דשבורד למנהלים לניטור התקדמות העובדים וזיהוי נקודות לשיפור
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold flex items-center mb-4">
                    <Award className="h-5 w-5 ml-2 text-blue-800" />
                    התוצאות
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-800">40%</div>
                      <div className="text-sm text-[#233071]">קיצור זמן הכשרה</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600">58%</div>
                      <div className="text-sm text-[#233071]">חיסכון בעלויות</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-600">92%</div>
                      <div className="text-sm text-[#233071]">שביעות רצון עובדים</div>
                    </div>
                  </div>
                  <p className="text-[#233071]">
                    המערכת זכתה להצלחה משמעותית והובילה לאימוץ של שיטות הלמידה החדשניות בכל מחלקות החברה. בעקבות הצלחת הפרויקט, החברה הרחיבה את השימוש במערכת לכל תהליכי ההדרכה הארגוניים.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">המלצות לקוחות</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              מה אומרים הלקוחות על העבודה שלנו
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl relative">
              <div className="text-4xl text-blue-200 absolute top-3 right-4">"</div>
              <div className="relative z-10">
                <p className="text-[#233071] mb-4">
                  העבודה של שניר על מערכת ההדרכה החדשה שלנו הובילה לשיפור משמעותי ביכולת שלנו לקלוט עובדים ולהכשיר אותם. הפתרון המבוסס AI שפיתח מתאים את עצמו לצרכים הייחודיים של כל עובד ומאפשר לנו לחסוך זמן ומשאבים רבים.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                    רל
                  </div>
                  <div className="mr-3">
                    <div className="font-semibold">רון לוי</div>
                    <div className="text-sm text-[#233071]">סמנכ"ל משאבי אנוש, חברת היי-טק</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl relative">
              <div className="text-4xl text-blue-200 absolute top-3 right-4">"</div>
              <div className="relative z-10">
                <p className="text-[#233071] mb-4">
                  שניר הוביל פרויקט מורכב של שדרוג מערך ההדרכה שלנו. הגישה המקצועית שלו, יחד עם ההבנה העמוקה של הצרכים העסקיים שלנו, אפשרה לנו להטמיע מערכת הדרכה חדשנית שהובילה לשיפור ביצועים מדיד אצל העובדים.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    מכ
                  </div>
                  <div className="mr-3">
                    <div className="font-semibold">מיכל כהן</div>
                    <div className="text-sm text-[#233071]">מנהלת הדרכה, חברת ביטוח גדולה</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים לשפר את מערך ההדרכה והלמידה בארגון שלכם?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              בואו נדבר על האתגרים שלכם ונמצא יחד את הפתרון המתאים ביותר
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={createPageUrl("Schedule")}>
                <Button className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-6 py-6">
                  <Calendar className="h-5 w-5 ml-2" />
                  קבע פגישת ייעוץ
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-6 py-6">
                  <MessageSquare className="h-5 w-5 ml-2" />
                  צור קשר
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Component for case study cards
const CaseStudyCard = ({ image, logo, category, title, description, results }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
    <div className="h-48 relative overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
      />
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#233071]">
        {logo}
      </div>
    </div>
    <CardContent className="p-6">
      <Badge className="mb-2">{category}</Badge>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[#233071] mb-6">
        {description}
      </p>
      
      <div className="space-y-2 mb-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-start">
            <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
            <span className="text-[#233071]">{result}</span>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full gap-2">
        פרטים נוספים
        <ArrowRight className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);
