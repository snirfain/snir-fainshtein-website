
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
  BarChart, 
  Calendar, 
  CheckCircle, 
  Rocket, 
  Target, 
  Zap, 
  FileText, 
  Video,
  Monitor,
  BookOpen,
  MessageSquare,
  LayoutGrid
} from "lucide-react";

export default function Services() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=2070&auto=format&fit=crop')]
          bg-center bg-cover"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-orange-400 hover:bg-orange-500 text-white">השירותים שלנו</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
              פתרונות הדרכה וחדשנות מותאמים לצורכי הארגון שלכם
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              שילוב מושלם של תהליכי למידה מוכחים עם טכנולוגיות מתקדמות לשיפור הביצועים וצמיחת הארגון
            </p>
            <Link to={createPageUrl("Schedule")}>
              <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-6">
                <Calendar className="h-5 w-5 ml-2" />
                קבע פגישת ייעוץ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              איך אני יכול לסייע לארגון שלכם
            </h2>
            <p className="text-lg text-[#233071]">
              מציע מגוון פתרונות מקיפים למערך ההדרכה והלמידה הארגונית שלכם, תוך שילוב חדשנות טכנולוגית ומתודולוגיות מוכחות
            </p>
          </div>
          
          <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto" dir="rtl">
              <TabsTrigger value="training" className="py-3 data-[state=active]:bg-blue-50 text-right">
                <div className="flex flex-col items-center p-1">
                  <PencilRuler className="h-5 w-5 mb-1" />
                  <span>פיתוח הדרכה ופתרונות למידה</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="ai" className="py-3 data-[state=active]:bg-blue-50 text-right">
                <div className="flex flex-col items-center p-1">
                  <Brain className="h-5 w-5 mb-1" />
                  <span>יישום AI בהדרכה וניהול ידע</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="innovation" className="py-3 data-[state=active]:bg-blue-50 text-right">
                <div className="flex flex-col items-center p-1">
                  <Lightbulb className="h-5 w-5 mb-1" />
                  <span>ייעוץ בחדשנות בלמידה ארגונית</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8 bg-gray-50 rounded-lg p-6" dir="rtl">
              <TabsContent value="training" className="mt-0 text-right">
                <ServiceTabContent 
                  title="פיתוח הדרכה ופתרונות למידה"
                  description="פיתוח תוכניות הדרכה מותאמות ומקיפות המבוססות על ניתוח צרכים מעמיק ויישום שיטות למידה אפקטיביות, תוך התמקדות בתוצאות עסקיות."
                  icon={<PencilRuler className="h-10 w-10 text-blue-800" />}
                  features={[
                    { icon: <FileText className="h-5 w-5 text-blue-800" />, title: "תכניות הדרכה מותאמות", description: "פיתוח תכניות המותאמות לצרכים הספציפיים של הארגון והעובדים" },
                    { icon: <Video className="h-5 w-5 text-blue-800" />, title: "הדרכות פרונטליות ומקוונות", description: "בניית קורסים וסדנאות במגוון פורמטים המתאימים לצרכי הארגון" },
                    { icon: <Monitor className="h-5 w-5 text-blue-800" />, title: "תוכן דיגיטלי ולומדות", description: "פיתוח לומדות אינטראקטיביות וחומרי לימוד דיגיטליים" },
                    { icon: <BookOpen className="h-5 w-5 text-blue-800" />, title: "מערכי הדרכה למנהלים", description: "פיתוח תכניות הכשרה והדרכה למנהלים בכל הדרגים" },
                    { icon: <Target className="h-5 w-5 text-blue-800" />, title: "ניתוח צרכי הדרכה", description: "זיהוי פערי ידע ומיומנויות והכנת תוכנית הדרכה מקיפה" },
                    { icon: <BarChart className="h-5 w-5 text-blue-800" />, title: "מדידת אפקטיביות", description: "פיתוח מדדים להערכת האפקטיביות של תהליכי ההדרכה והלמידה" }
                  ]}
                />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0 text-right">
                <ServiceTabContent 
                  title="יישום AI בהדרכה וניהול ידע"
                  description="שילוב בינה מלאכותית ופתרונות טכנולוגיים מתקדמים לשיפור חוויות הלמידה, התאמה אישית ויעילות תהליכי ההדרכה והטמעת הידע בארגון."
                  icon={<Brain className="h-10 w-10 text-purple-600" />}
                  features={[
                    { icon: <MessageSquare className="h-5 w-5 text-purple-600" />, title: "צ'אטבוטים להדרכה וליווי", description: "פיתוח צ'אטבוטים חכמים לתמיכה בתהליכי למידה והטמעה" },
                    { icon: <Users className="h-5 w-5 text-purple-600" />, title: "למידה מותאמת אישית", description: "מערכות המתאימות את תכני הלמידה ליכולות וצרכי כל עובד" },
                    { icon: <LayoutGrid className="h-5 w-5 text-purple-600" />, title: "מערכות ניהול ידע חכמות", description: "פיתוח והטמעת פתרונות לשימור וניהול ידע ארגוני" },
                    { icon: <BarChart className="h-5 w-5 text-purple-600" />, title: "ניתוח נתוני למידה", description: "הפקת תובנות מנתוני הלמידה לשיפור תהליכים והתאמת תכנים" },
                    { icon: <Rocket className="h-5 w-5 text-purple-600" />, title: "סימולציות מתקדמות", description: "פיתוח סימולציות מבוססות AI להתנסות מעשית ושיפור מיומנויות" },
                    { icon: <Zap className="h-5 w-5 text-purple-600" />, title: "אוטומציה בהדרכה", description: "אוטומציה של תהליכי הדרכה חוזרים לחיסכון במשאבים והגברת יעילות" }
                  ]}
                />
              </TabsContent>
              
              <TabsContent value="innovation" className="mt-0 text-right">
                <ServiceTabContent 
                  title="ייעוץ בחדשנות בלמידה ארגונית"
                  description="ייעוץ אסטרטגי ליצירת תרבות של למידה מתמדת וחדשנות בארגון, תוך התמקדות בפיתוח קהילות למידה, מתודולוגיות חדשניות וגיימיפיקציה."
                  icon={<Lightbulb className="h-10 w-10 text-orange-500" />}
                  features={[
                    { icon: <Users className="h-5 w-5 text-orange-500" />, title: "קהילות למידה ארגוניות", description: "הקמה וליווי של קהילות ידע ולמידה לשיתוף ופיתוח ידע" },
                    { icon: <Rocket className="h-5 w-5 text-orange-500" />, title: "חדשנות במתודולוגיות הדרכה", description: "יישום שיטות הדרכה מתקדמות ופורצות דרך" },
                    { icon: <Target className="h-5 w-5 text-orange-500" />, title: "גיימיפיקציה בלמידה", description: "שילוב אלמנטים משחקיים בתהליכי למידה להגברת המעורבות" },
                    { icon: <BarChart className="h-5 w-5 text-orange-500" />, title: "מדידת השפעת הלמידה", description: "פיתוח מדדים לבחינת אפקטיביות הלמידה והשפעתה על הארגון" },
                    { icon: <Brain className="h-5 w-5 text-orange-500" />, title: "חשיבה עיצובית בהדרכה", description: "יישום עקרונות Design Thinking בפיתוח תכניות למידה" },
                    { icon: <Zap className="h-5 w-5 text-orange-500" />, title: "אסטרטגיית למידה ארגונית", description: "פיתוח אסטרטגיה כוללת ללמידה וניהול ידע בארגון" }
                  ]}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 text-base px-4 py-2 bg-blue-100 text-blue-900">תהליך העבודה</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              איך אנחנו עובדים יחד
            </h2>
            <p className="text-lg text-[#233071]">
              תהליך עבודה מותאם ושקוף המבטיח תוצאות מיטביות ושיתוף פעולה לאורך כל הדרך
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessCard 
              number="01"
              title="ניתוח צרכים מקיף"
              description="מיפוי הצרכים והאתגרים של הארגון, זיהוי פערי ידע ומיומנויות, וגיבוש מטרות ויעדים ברורים"
              icon={<Target className="h-10 w-10 text-blue-800" />}
            />
            
            <ProcessCard 
              number="02"
              title="תכנון ועיצוב"
              description="פיתוח אסטרטגיית למידה והדרכה מותאמת, בחירת המתודולוגיות והטכנולוגיות המתאימות ביותר"
              icon={<PencilRuler className="h-10 w-10 text-blue-800" />}
            />
            
            <ProcessCard 
              number="03"
              title="פיתוח ויישום"
              description="פיתוח תכנים ופתרונות למידה, והטמעתם בארגון תוך ליווי וסיוע לאורך כל התהליך"
              icon={<Rocket className="h-10 w-10 text-blue-800" />}
            />
            
            <ProcessCard 
              number="04"
              title="הערכה ושיפור"
              description="מדידת אפקטיביות תהליכי הלמידה, ניתוח התוצאות וביצוע שיפורים והתאמות נדרשות"
              icon={<BarChart className="h-10 w-10 text-blue-800" />}
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 text-base px-4 py-2 bg-blue-100 text-blue-900">תוצאות</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מה אתם יכולים לצפות להשיג
            </h2>
            <p className="text-center mr-20 ml-20 p-0 text-lg">
              הפתרונות שאנחנו מציעים מביאים לתוצאות מוכחות ומדידות שמשפיעות באופן ישיר על הביצועים הארגוניים
            </p>
            <p className="text-center mr-20 ml-20 p-0 text-sm font-light">
*האחוזים משקפים ממוצעים ומושפעים ממספר גורמים            </p>




          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResultCard 
              title="שיפור ביצועים ומיומנויות"
              description="צוותים מיומנים יותר המשיגים תוצאות טובות יותר, זמני חפיפה קצרים יותר ועקומת למידה מהירה יותר"
              icon={<Zap className="h-10 w-10 text-orange-500" />}
              stats={[
                { value: "35%", label: "שיפור בביצועי העובדים" },
                { value: "40%", label: "קיצור זמני חפיפה" }
              ]}
            />
            
            <ResultCard 
              title="חיסכון במשאבים וזמן"
              description="תהליכי הדרכה יעילים יותר החוסכים זמן ומשאבים יקרים, ומאפשרים למידה עצמאית ומתמשכת"
              icon={<Calendar className="h-10 w-10 text-green-600" />}
              stats={[
                { value: "50%", label: "חיסכון בעלויות הדרכה" },
                { value: "60%", label: "הפחתת זמני למידה" }
              ]}
            />
            
            <ResultCard 
              title="מעורבות ושימור עובדים"
              description="עובדים מעורבים יותר, מחוברים למטרות הארגון ומרוצים מהזדמנויות הפיתוח האישי"
              icon={<Users className="h-10 w-10 text-purple-600" />}
              stats={[
                { value: "45%", label: "שיפור במעורבות" },
                { value: "30%", label: "שיפור בשימור עובדים" }
              ]}
            />
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 text-base px-4 py-2 bg-blue-100 text-blue-900">שאלות נפוצות</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              תשובות לשאלות נפוצות
            </h2>
            <p className="text-lg text-[#233071]">
              להלן מספר שאלות שעולות בשיחות עם לקוחות פוטנציאליים
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FaqItem 
              question="כמה זמן לוקח לפתח תכנית הדרכה מותאמת?"
              answer="הזמן משתנה בהתאם להיקף ומורכבות הפרויקט. המטרה היא תמיד לספק פתרון איכותי ומדויק שיענה על צרכי הארגון ולכן מתן זמנים בצורה כזו יהיה לא אחראי ולא מקצועי. צרו קשר להצעת מחיר."
            />
            
            <FaqItem 
              question="האם ניתן לשלב AI בתהליכי ההדרכה הקיימים בארגון?"
              answer="בהחלט. אחת ההתמחויות שלנו היא שילוב פתרונות AI בתשתיות ותהליכי הדרכה קיימים. השילוב נעשה בצורה הדרגתית ומותאמת, תוך שמירה על עקביות וניצול מקסימלי של המערכות הקיימות."
            />
            
            <FaqItem 
              question="איך מודדים את האפקטיביות של תכניות ההדרכה?"
              answer="מדידת אפקטיביות מבוססת על מגוון מדדים: שיפור בביצועים, רמת שביעות רצון, מידת יישום הידע בשטח, ROI, שיעורי השלמת קורסים ועוד. אנחנו מסייעים בבניית תכנית מדידה מותאמת לארגון שתאפשר מעקב ושיפור מתמיד."
            />
            
            <FaqItem 
              question="האם אתם עובדים עם ארגונים קטנים או רק עם חברות גדולות?"
              answer="אנחנו עובדים בעיקר עם ארגונים קטנים-בינוניים ועצמאיים. הפתרונות שאנחנו מציעים מותאמים לצרכים הספציפיים של הארגון, לתקציב ולמשאבים הקיימים. "
            />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                מוכנים לקחת את ההדרכה והלמידה בארגון שלכם לשלב הבא?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                בואו נתחיל בשיחת ייעוץ ללא התחייבות לגבי הצרכים והאתגרים שלכם
              </p>
              <Link to={createPageUrl("Schedule")}>
                <Button className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-8 py-6">
                  <Calendar className="h-5 w-5 ml-2" />
                  קבע פגישת ייעוץ עכשיו
                </Button>
              </Link>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
                alt="שיתוף פעולה בצוות" 
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Components
const ServiceTabContent = ({ title, description, icon, features }) => (
  <div className="grid md:grid-cols-3 gap-8 items-start" dir="rtl">
    <div className="md:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-sm text-right">
        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 ml-auto">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 text-right">{title}</h3>
        <p className="text-[#233071] text-right">{description}</p>
      </div>
    </div>
    
    <div className="md:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start" dir="rtl">
              <div className="mt-1 ml-3 flex-shrink-0">{feature.icon}</div>
              <div className="text-right">
                <h4 className="font-semibold text-right">{feature.title}</h4>
                <p className="text-sm text-[#233071] mt-1 text-right">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProcessCard = ({ number, title, description, icon }) => (
  <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
    <span className="absolute -top-4 -right-4 text-7xl font-bold text-gray-100">{number}</span>
    <CardContent className="p-6 relative z-10">
      <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[#233071]">
        {description}
      </p>
    </CardContent>
  </Card>
);

const ResultCard = ({ title, description, icon, stats }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="h-14 w-14 rounded-full flex items-center justify-center mb-4 bg-gray-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[#233071] mb-6">
        {description}
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-800">{stat.value}</div>
            <div className="text-xs text-[#233071]">{stat.label}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const FaqItem = ({ question, answer }) => (
  <div className="border-b border-gray-200 pb-4">
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-[#233071]">{answer}</p>
  </div>
);
