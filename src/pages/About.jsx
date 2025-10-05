
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Book, 
  Users, 
  ArrowRight, 
  CheckCircle,
  ArrowLeft
} from "lucide-react";

export default function About() {
  return (
    <div>

      {/* About Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Left Column with Image and Certificates */}
            <div className="md:col-span-2">
              <div className="sticky top-24">
                <div className="relative mb-8">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 opacity-10 transform rotate-3"></div>
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d19fc325_vlcsnap-2021-11-30-08h43m03s286.png" 
                    alt="שניר פיינשטיין" 
                    className="rounded-lg relative z-10 shadow-lg"
                  />
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border-2 border-blue-100">
                  <h3 className="text-lg font-bold mb-6 flex items-center text-blue-900">
                    <Award className="h-6 w-6 ml-2 text-orange-500" />
                    השכלה והסמכות מקצועיות
                  </h3>
                  <div className="space-y-5">
                    <CertificateHighlight 
                      title="תואר שני במנהל עסקים (M.B.A)" 
                      subtitle="התמחות בייעוץ אסטרטגי לארגונים"
                      org="המרכז האקדמי פרס" 
                      year="2024-2026" 
                      icon="🎓"
                    />
                    
                    <CertificateHighlight 
                      title="תואר ראשון בטכנולוגיות למידה (B.A)" 
                      subtitle="פיתוח וניהול הדרכה • ניהול דיגיטל • עיצוב ממשקי מידע • פיתוח אפליקציות • פיתוח אתרים • פיתוח משחקים"
                      org="HIT - מכון טכנולוגי חולון" 
                      year="2020-2023" 
                      icon="🎓"
                    />
                    
                    <div className="border-t-2 border-blue-200 pt-4 mt-4">
                      <p className="text-xs font-semibold text-blue-800 mb-3 uppercase tracking-wide">הסמכות מקצועיות</p>
                      
                      <Certificate 
                        title="ניהול באמצעות בינה מלאכותית" 
                        org="המרכז האקדמי פרס" 
                        year="2025" 
                      />
                      <Certificate 
                        title="הקמת וניהול אתרי אי-קומרס" 
                        org="המרכז האקדמי פרס" 
                        year="2025" 
                      />
                      <Certificate 
                        title="פיתוח הדרכה בשילוב בינה מלאכותית" 
                        org="HIT + מגן דוד אדום" 
                        year="2025" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column with Bio */}
            <div className="md:col-span-3 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 section-title">
                  מי אני
                </h2>
                <div className="space-y-4 text-lg text-[#233071]">
                  <p>
שמי שניר פיינשטיין, מפתח הדרכה, למידה ארגונית ומשלב טכנולוגיות AI בלמידה. עם ותק של מעל 7 שנים כעצמאי ושכיר, עבדתי עם ארגונים מתחומי האקדמיה, הביטחון וכן עם עצמאיים במגוון גדול מאוד של תחומים.                  </p>
                  <p>
הניסיון שצברתי מאפשר לי להבין את האתגרים הייחודיים שארגונים מתמודדים איתם בתחומי ההדרכה והלמידה, ולפתח פתרונות מותאמים אישית המשלבים מתודולוגיות מוכחות עם טכנולוגיות חדשניות.                  </p>
                  <p>
                    אני מאמין שהדרכה אפקטיבית היא הבסיס לצמיחה וחדשנות בכל ארגון. הגישה שלי מתמקדת בפיתוח תכניות למידה שלא רק מקנה ידע, אלא גם משפרת את החיבור בין עובדים, מגבירה את המעורבות ומובילה לשיפור ביצועים מדידים.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 section-title">
                  הגישה המקצועית שלי
                </h2>
                <div className="space-y-4 text-lg text-[#233071]">
               
                  
                  <div className="grid sm:grid-cols-2 gap-4 my-6">
                    <MethodItem 
                      icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
                      title="ניתוח צרכים מעמיק" 
                      description="הבנה מדויקת של פערי הידע והמיומנויות בארגון" 
                    />
                    <MethodItem 
                      icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
                      title="פתרונות מותאמים אישית" 
                      description="תכניות הדרכה המותאמות לצרכים הספציפיים של הארגון" 
                    />
                    <MethodItem 
                      icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
                      title="שילוב טכנולוגיות מתקדמות" 
                      description="יישום AI וטכנולוגיות חדשניות להגברת אפקטיביות הלמידה" 
                    />
                    <MethodItem 
                      icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
                      title="מדידה והערכת תוצאות" 
                      description="מעקב אחר KPIs רלוונטיים ומדידת ROI של תהליכי ההדרכה" 
                    />
                  </div>
                  
                  <p>
                    בשנים האחרונות אני מתמחה בפיתוח פתרונות למידה המשלבים בינה מלאכותית, כולל מערכות למידה מותאמות אישית, צ'אטבוטים להדרכה, וכלי ניתוח נתונים לשיפור תהליכי הלמידה הארגונית.
                  </p>
                </div>
              </div>
              
             
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  חזון מקצועי
                </h3>
                <p className="text-lg leading-relaxed">
                  אני פועל להוביל את תחום הלמידה וההדרכה הארגונית לעידן חדש, שבו טכנולוגיות מתקדמות כמו AI משולבות בצורה הרמונית עם תהליכי הדרכה אנושיים. החזון שלי הוא לאפשר לארגונים לבנות תרבות של למידה מתמדת, לחסוך במשאבים ולהשיג תוצאות עסקיות טובות יותר באמצעות הדרכה אפקטיבית ומותאמת אישית.
                </p>
              </div>
              
              <div className="text-center py-8">
                <Link to={createPageUrl("Schedule")}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 text-white">
                    <Calendar className="h-5 w-5 ml-2 text-white" />
                    קבע פגישת היכרות
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certifications Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">הסמכות נוספות</Badge>
            <h2 className="text-3xl font-bold">שיפור והתפתחות מתמידים</h2>
            <p className="text-lg text-[#233071] mt-4">
              הקפדה על התפתחות מקצועית מתמדת ורכישת ידע ומיומנויות עדכניים בתחומי הדרכה, למידה וטכנולוגיה
              קורסים והשתלמויות שעשיתי כדי להרחיב ידע, לשפר אינטגרציה עם בעלי מקצוע נוספים ולהישאר מעודכן:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Smarter Learning with AI",  year: "2025" },
              { title: "Transform Classroom Training to E-Learning ",  year: "2024" },
              { title: "Skills in Graphic Design",  year: "2024" },
              { title: "Gamification of Learning",  year: "2023" },
              { title: "How to Increase Learner Engagementn",  year: "2023" },
              { title: "Measuring Learning Effectiveness",  year: "2022" },
              { title: "Developing Managers in Organizations", year: "2022" },
              { title: "UX Design for Learning", year: "2022" },
              { title: "L&D Professional",  year: "2021" },
              { title: "Graphic Design Tips & Tricks",  year: "2019" }
            ].map((cert, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-start">
                  <GraduationCap className="h-6 w-6 text-blue-800 mt-1 ml-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#233071]">{cert.title}</h3>
                    <p className="text-sm text-[#233071]">{cert.org}, {cert.year}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              ליווי מקצועי לצרכי ההדרכה והלמידה הארגונית שלכם
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={createPageUrl("Schedule")}>
                <Button className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-6 py-6">
                  <Calendar className="h-5 w-5 ml-2" />
                  קבע פגישת ייעוץ
                </Button>
              </Link>
              <Link to={createPageUrl("Services")}>
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-6 py-6">
                  לפרטים על השירותים
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Components
const CertificateHighlight = ({ title, subtitle, org, year, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
    <div className="flex items-start gap-3">
      <span className="text-3xl flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <h4 className="font-bold text-[#233071] text-base leading-tight">{title}</h4>
        <p className="text-sm text-blue-800 font-medium mt-1">{subtitle}</p>
        <p className="text-xs text-gray-500 mt-2">{org} • {year}</p>
      </div>
    </div>
  </div>
);

const Certificate = ({ title, org, year }) => (
  <div className="flex items-start mb-3">
    <Award className="h-4 w-4 text-blue-500 mt-1 ml-2 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-[#233071] text-sm">{title}</h4>
      <p className="text-xs text-[#233071]">{org} • {year}</p>
    </div>
  </div>
);

const MethodItem = ({ icon, title, description }) => (
  <Card className="bg-white">
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className="mt-1 ml-3 flex-shrink-0">{icon}</div>
        <div>
          <h4 className="font-semibold text-[#233071]">{title}</h4>
          <p className="text-sm text-[#233071]">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ExperienceItem = ({ years, title, description }) => (
  <div className="flex">
    <div className="ml-4 flex flex-col items-center">
      <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
        <Briefcase className="h-3 w-3 text-white" />
      </div>
      <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
    </div>
    <div className="flex-1">
      <div className="text-sm font-semibold text-blue-800">{years}</div>
      <h3 className="text-lg font-bold mt-1 mb-2">{title}</h3>
      <p className="text-[#233071]">{description}</p>
    </div>
  </div>
);
