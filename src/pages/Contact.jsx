
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Send, 
  CheckCircle,
  Clock,
  Calendar
} from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "הדרכה",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInterestChange = (value) => {
    setFormState(prev => ({ ...prev, interest: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          phone: "",
          company: "",
          interest: "הדרכה",
          message: ""
        });
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-18 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
         
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              בואו נדבר על הפרויקט הבא שלכם
            </h1>
            <p className="text-lg md:text-xl mb-6 text-blue-100">
              אני כאן כדי לענות על כל שאלה ולעזור לכם לפתח את מערך ההדרכה והלמידה בארגון שלכם
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Contact Form */}
              <div className="md:col-span-8">
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">דברו איתי</h2>
                    
                    {isSubmitted ? (
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-green-800 mb-1">ההודעה נשלחה בהצלחה!</h3>
                        <p className="text-green-700">תודה על פנייתך. אחזור אליך בהקדם האפשרי.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">שם מלא *</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              placeholder="השם המלא שלך" 
                              required
                              value={formState.name}
                              onChange={handleChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">אימייל *</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              placeholder="האימייל שלך" 
                              required
                              value={formState.email}
                              onChange={handleChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">טלפון</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              placeholder="הטלפון שלך" 
                              value={formState.phone}
                              onChange={handleChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="company">חברה / ארגון</Label>
                            <Input 
                              id="company" 
                              name="company" 
                              placeholder="שם החברה או הארגון שלך" 
                              value={formState.company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <Label className="mb-3 block">תחום התעניינות *</Label>
                          <RadioGroup 
                            value={formState.interest} 
                            onValueChange={handleInterestChange}
                            className="flex flex-wrap gap-x-6 gap-y-2"
                          >
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="הדרכה" id="interest-training" />
                              <Label htmlFor="interest-training">פיתוח הדרכה</Label>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="AI" id="interest-ai" />
                              <Label htmlFor="interest-ai">יישום AI בהדרכה</Label>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="חדשנות" id="interest-innovation" />
                              <Label htmlFor="interest-innovation">חדשנות בלמידה</Label>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value="אחר" id="interest-other" />
                              <Label htmlFor="interest-other">אחר</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="mb-6">
                          <Label htmlFor="message">הודעה *</Label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            placeholder="איך אני יכול לעזור לך?" 
                            rows={5}
                            required
                            value={formState.message}
                            onChange={handleChange}
                            className="resize-none"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-700 p-6 text-base text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                              שולח...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 ml-2 text-white" />
                              שלח הודעה
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Info */}
              <div className="md:col-span-4">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4">פרטי קשר</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-blue-800 mt-1 ml-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">אימייל</h4>
                            <a href="mailto:snirfain@gmail.com" className="text-[#233071] hover:text-blue-800 transition-colors">
                              snirfain@gmail.com
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-blue-800 mt-1 ml-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">טלפון</h4>
                            <a href="tel:+972503133641" className="text-[#233071] hover:text-blue-800 transition-colors">
                              050-313-3641
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Linkedin className="h-5 w-5 text-blue-800 mt-1 ml-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">LinkedIn</h4>
                            <a 
                              href="https://www.linkedin.com/in/snir-fainshtein-027640137/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#233071] hover:text-blue-800 transition-colors"
                            >
                              הפרופיל שלי בלינקדאין
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4">זמני מענה</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-blue-800 mt-1 ml-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">זמן תגובה</h4>
                            <p className="text-[#233071]">בדרך כלל תוך 24 שעות</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-blue-800 mt-1 ml-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">זמינות לפגישות</h4>
                            <p className="text-[#233071]">א'-ה', 09:00-18:00</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border-none">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">רוצה לקבוע פגישה?</h3>
                      <p className="text-sm text-[#233071] mb-4">
                        קבע פגישת ייעוץ ראשונית ללא התחייבות
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Calendar className="h-5 w-5 ml-2 text-white" />
                        קבע פגישה
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">שאלות נפוצות</Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                מענה לשאלות נפוצות
              </h2>
            </div>
            
            <div className="space-y-6">
              <FaqItem 
                question="איך מתחילים את תהליך העבודה המשותף?"
                answer="התהליך מתחיל בפגישת היכרות ראשונית (ללא עלות) שבה אנחנו מבינים את הצרכים והאתגרים הספציפיים של הארגון שלכם. לאחר מכן אני מגבש הצעה מותאמת אישית, וכשמתחילים לעבוד, הצעד הראשון הוא בדרך כלל ניתוח צרכים מעמיק."
              />
              
              <FaqItem 
                question="כמה זמן לוקח פרויקט טיפוסי?"
                answer="משך הזמן משתנה בהתאם להיקף ולמורכבות של הפרויקט. פרויקטים בסיסיים של פיתוח הדרכה יכולים להימשך 4-6 שבועות, בעוד שפרויקטים מורכבים יותר, כמו הטמעת מערכות AI או שינוי מקיף במערך ההדרכה, עשויים להימשך 3-6 חודשים."
              />
              
              <FaqItem 
                question="האם אתה עובד עם ארגונים בכל גודל?"
                answer="כן, אני עובד עם ארגונים בכל גודל - מסטארטאפים קטנים ועד חברות גדולות. הפתרונות שאני מציע מותאמים לצרכים הספציפיים, לתקציב ולמשאבים של כל ארגון."
              />
              
              <FaqItem 
                question="איך אני יכול למדוד את ההשפעה של שירותי ההדרכה על הארגון שלי?"
                answer="אני מאמין בחשיבות של מדידת אפקטיביות ו-ROI. בכל פרויקט אנחנו מגדירים יחד מדדי הצלחה ברורים, ומפתחים מערכת מדידה שתאפשר לעקוב אחר התקדמות והשפעה. זה יכול לכלול מדדים כמו שיפור בביצועים, חיסכון בזמן ועלויות, הגברת מעורבות עובדים, ושיפור בשימור ידע."
              />
              
              <FaqItem 
                question="באילו אזורים אתה מספק שירותים?"
                answer="אני מספק שירותים בכל רחבי הארץ, וגם באופן מקוון לארגונים מחוץ לישראל. חלק גדול מהעבודה יכול להתבצע מרחוק, עם פגישות פרונטליות לפי הצורך."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              בואו נדבר על האתגרים שלכם ואיך אני יכול לעזור לכם להשיג את המטרות שלכם
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={createPageUrl("Schedule")}>
                <Button className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-6 py-6">
                  <Calendar className="h-5 w-5 ml-2" />
                  קבע פגישת ייעוץ עכשיו
                </Button>
              </Link>
              <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-6 py-6" 
                onClick={() => window.location.href = "mailto:snir@example.com"}>
                <Mail className="h-5 w-5 ml-2" />
                שלח אימייל
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// FAQ Item Component
const FaqItem = ({ question, answer }) => (
  <div className="border-b border-gray-200 pb-4">
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-[#233071]">{answer}</p>
  </div>
);
