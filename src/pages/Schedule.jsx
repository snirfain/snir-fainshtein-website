
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { SendEmail } from "@/api/integrations";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Building,
  Mail,
  Phone,
  User,
  Send,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { he } from 'date-fns/locale';

// זמני פגישות קבועים - בפועל זה יכול להיות מסונכרן עם היומן שלך
const MEETING_HOURS = [
  "09:00", "10:30", "12:00", "13:30", "15:00", "16:30"
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    meetingType: "zoom",
    city: "", // New field
    streetAddress: "", // New field
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullAddress = formData.meetingType === 'frontal'
        ? `${formData.streetAddress}, ${formData.city}`
        : "פגישת זום";

      // שליחת המייל עם פרטי הפגישה אלי (שניר)
      await SendEmail({
        to: "snirfain@gmail.com",
        subject: "בקשת פגישת ייעוץ חדשה",
        body: createAdminEmailTemplate(selectedDate, selectedTime, formData, fullAddress)
      });

      // שליחת אישור ללקוח
      await SendEmail({
        to: formData.email,
        subject: "אישור בקשת פגישת ייעוץ - שניר פיינשטיין",
        body: createClientEmailTemplate(selectedDate, selectedTime, formData, fullAddress)
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // יצירת תבנית HTML עבור מייל אישור ללקוח
  const createClientEmailTemplate = (date, time, data, fullAddress) => {
    return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>אישור פגישת ייעוץ</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #1E6FB6, #4A90CD);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 0 0 5px 5px;
        }
        .meeting-details {
          background: white;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          border-right: 4px solid #1E6FB6;
        }
        .detail-row {
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;
        }
        .detail-label {
          min-width: 120px;
          color: #666;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #888;
        }
        .button {
          display: inline-block;
          background-color: #F5A623;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 15px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>אישור בקשת פגישת ייעוץ</h1>
        </div>
        <div class="content">
          <p>שלום ${data.fullName},</p>
          <p>תודה על פנייתך לקביעת פגישת ייעוץ. בקשתך התקבלה ואחזור אליך בקרוב עם אישור סופי והצעת מחיר.</p>

          <div class="meeting-details">
            <h2>פרטי הפגישה המבוקשת:</h2>
            <div class="detail-row">
              <div class="detail-label">תאריך:</div>
              <div>${format(date, 'EEEE, d בMMMM yyyy', { locale: he })}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">שעה:</div>
              <div>${time}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">סוג פגישה:</div>
              <div>${data.meetingType === 'zoom' ? 'פגישת זום' : 'פגישה פרונטלית'}</div>
            </div>
            ${data.meetingType === 'frontal' ? `
            <div class="detail-row">
              <div class="detail-label">כתובת:</div>
              <div>${fullAddress}</div>
            </div>` : ''}
          </div>

          <p>לתיאום מועד אחר או לכל שאלה, אנא צור איתי קשר בטלפון 050-1234567 או באימייל snirfain@gmail.com.</p>

          <p>בברכה,<br>שניר פיינשטיין<br>מומחה פיתוח הדרכה, למידה ו-AI</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} שניר פיינשטיין. כל הזכויות שמורות.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  };

  // יצירת תבנית HTML עבור מייל למנהל (שניר)
  const createAdminEmailTemplate = (date, time, data, fullAddress) => {
    return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>בקשת פגישת ייעוץ חדשה</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #1E6FB6, #4A90CD);
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 0 0 5px 5px;
        }
        .meeting-details, .client-details {
          background: white;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .meeting-details {
          border-right: 4px solid #F5A623;
        }
        .client-details {
          border-right: 4px solid #1E6FB6;
        }
        .detail-row {
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;
        }
        .detail-label {
          min-width: 120px;
          color: #666;
          font-weight: bold;
        }
        .note-section {
          background-color: #eaf5ff;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .button {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-right: 10px;
          font-weight: bold;
        }
        .buttons {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>בקשת פגישת ייעוץ חדשה</h1>
        </div>
        <div class="content">
          <p>התקבלה בקשה חדשה לפגישת ייעוץ. להלן הפרטים:</p>

          <div class="meeting-details">
            <h2>פרטי הפגישה המבוקשת:</h2>
            <div class="detail-row">
              <div class="detail-label">תאריך:</div>
              <div>${format(date, 'EEEE, d בMMMM yyyy', { locale: he })}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">שעה:</div>
              <div>${time}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">סוג פגישה:</div>
              <div>${data.meetingType === 'zoom' ? 'פגישת זום' : 'פגישה פרונטלית'}</div>
            </div>
            ${data.meetingType === 'frontal' ? `
            <div class="detail-row">
              <div class="detail-label">כתובת:</div>
              <div>${fullAddress}</div>
            </div>` : ''}
          </div>

          <div class="client-details">
            <h2>פרטי הלקוח:</h2>
            <div class="detail-row">
              <div class="detail-label">שם מלא:</div>
              <div>${data.fullName}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">אימייל:</div>
              <div><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="detail-row">
              <div class="detail-label">טלפון:</div>
              <div><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="detail-row">
              <div class="detail-label">חברה:</div>
              <div>${data.company || '(לא צוין)'}</div>
            </div>
          </div>

          ${data.notes ? `
          <div class="note-section">
            <h3>הערות נוספות:</h3>
            <p>${data.notes}</p>
          </div>` : ''}

          <div class="buttons">
            <a href="https://calendar.google.com/calendar/u/0/r/eventedit?text=פגישת+ייעוץ+עם+${encodeURIComponent(data.fullName)}&dates=${format(date, 'yyyyMMdd')}T${time.replace(':', '')}00/${format(date, 'yyyyMMdd')}T${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}${time.split(':')[1]}00&details=פגישה+עם+${encodeURIComponent(data.fullName)}%0D%0Aטלפון:+${encodeURIComponent(data.phone)}%0D%0Aאימייל:+${encodeURIComponent(data.email)}${data.meetingType === 'frontal' ? `%0D%0Aמיקום:+${encodeURIComponent(fullAddress)}` : ''}" class="button" target="_blank">הוסף ליומן Google</a>
            <a href="mailto:${data.email}?subject=אישור פגישת ייעוץ&body=שלום ${encodeURIComponent(data.fullName)},%0D%0A%0D%0Aאני מאשר בזאת את פגישת הייעוץ שלנו ביום ${format(date, 'dd/MM/yyyy')} בשעה ${time}.%0D%0A%0D%0Aבברכה,%0D%0Aשניר פיינשטיין" class="button" style="background-color: #1E6FB6;">שלח אישור</a>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">קביעת פגישה</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              קבע פגישת ייעוץ ראשונית
            </h1>
            <p className="text-lg md:text-xl mb-6 text-blue-100">
              בחר מועד נוח, מלא את הפרטים ואחזור אליך בהקדם עם אישור ופרטים נוספים
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {isSubmitted ? (
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-800 mb-2">בקשתך התקבלה בהצלחה!</h2>
                  <p className="text-[#233071] mb-6">
                    תודה על פנייתך. שלחנו לך מייל עם פרטי הפגישה המבוקשת.
                    בקרוב תקבל מייל נוסף עם אישור סופי והצעת מחיר.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setSelectedDate(null);
                      setSelectedTime(null);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        company: "",
                        meetingType: "zoom",
                        city: "", // Reset new field
                        streetAddress: "", // Reset new field
                        notes: ""
                      });
                    }}
                  >
                    קבע פגישה נוספת
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  {/* Steps Indicator */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`flex-1 h-2 rounded-full ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-[#233071]'
                    }`}>1</div>
                    <div className={`flex-1 h-2 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-[#233071]'
                    }`}>2</div>
                    <div className={`flex-1 h-2 rounded-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  </div>

                  {currentStep === 1 && (
                    <div className="max-w-6xl mx-auto">
                      <h2 className="text-4xl font-bold mb-12 text-center">בחר תאריך ושעה</h2>
                      
                      {/* Calendar Section */}
                      <div className="mb-12">
                        <Label className="mb-6 block text-center text-2xl font-bold">תאריך</Label>
                        <div className="flex justify-center">
                          <div className="scale-150 origin-center">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              locale={he}
                              disabled={(date) => {
                                // חסימת תאריכים בעבר ובסופי שבוע
                                return date < new Date() || date.getDay() === 5 || date.getDay() === 6;
                              }}
                              className="rounded-md border shadow-lg bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Time Selection */}
                      {selectedDate && (
                        <div className="max-w-3xl mx-auto">
                          <Label className="mb-6 block text-center text-2xl font-bold">שעה זמינה</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {MEETING_HOURS.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                className={`justify-center text-lg py-7 ${selectedTime === time ? 'bg-blue-600' : ''}`}
                                onClick={() => setSelectedTime(selectedTime === time ? null : time)}
                                type="button"
                              >
                                <Clock className="ml-2 h-5 w-5" />
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-12 flex justify-end">
                        <Button
                          onClick={() => setCurrentStep(2)}
                          disabled={!selectedDate || !selectedTime}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          המשך
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">הפרטים שלך</h2>
                      <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">שם מלא *</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="השם המלא שלך"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">אימייל *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="האימייל שלך"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">טלפון *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="מספר הטלפון שלך"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="company">חברה</Label>
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="שם החברה"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>סוג פגישה *</Label>
                          <RadioGroup
                            dir="rtl" // Ensure RTL direction for the group
                            value={formData.meetingType}
                            onValueChange={(value) => handleInputChange({ target: { name: 'meetingType', value } })}
                            className="flex gap-6 justify-start" // Align options to the start (right in RTL)
                          >
                            <div className="flex items-center">
                              <RadioGroupItem value="zoom" id="zoom-option" />
                              <Label htmlFor="zoom-option" className="mr-2 flex items-center cursor-pointer">
                                <Video className="ml-2 h-4 w-4" />
                                פגישת זום
                              </Label>
                            </div>
                            <div className="flex items-center">
                              <RadioGroupItem value="frontal" id="frontal-option" />
                              <Label htmlFor="frontal-option" className="mr-2 flex items-center cursor-pointer">
                                <MapPin className="ml-2 h-4 w-4" />
                                פגישה פרונטלית
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {formData.meetingType === 'frontal' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="city">עיר *</Label>
                              <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="לדוגמה: תל אביב"
                                required={formData.meetingType === 'frontal'}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="streetAddress">כתובת (רחוב ומספר) *</Label>
                              <Input
                                id="streetAddress"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleInputChange}
                                placeholder="לדוגמה: הרצל 15"
                                required={formData.meetingType === 'frontal'}
                              />
                            </div>
                          </>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="notes">הערות נוספות</Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="נושאים שתרצה לדון בהם בפגישה, שאלות או בקשות מיוחדות"
                            rows={4}
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                          >
                            חזור
                          </Button>
                          <Button
                            onClick={() => setCurrentStep(3)}
                            disabled={
                              !formData.fullName ||
                              !formData.email ||
                              !formData.phone ||
                              (formData.meetingType === 'frontal' && (!formData.city || !formData.streetAddress))
                            }
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            המשך
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">אישור פרטי הפגישה</h2>

                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-[#233071] mb-4">פרטי הפגישה</h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 text-blue-800 ml-2" />
                                <span>{format(selectedDate, 'EEEE, d בMMMM yyyy', { locale: he })}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-blue-800 ml-2" />
                                <span>{selectedTime}</span>
                              </div>
                              <div className="flex items-center">
                                {formData.meetingType === 'zoom' ? (
                                  <Video className="h-5 w-5 text-blue-800 ml-2" />
                                ) : (
                                  <MapPin className="h-5 w-5 text-blue-800 ml-2" />
                                )}
                                <span>{formData.meetingType === 'zoom' ? 'פגישת זום' : 'פגישה פרונטלית'}</span>
                              </div>
                              {formData.meetingType === 'frontal' && (
                                <>
                                  <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-blue-800 ml-2 invisible" /> {/* Placeholder for alignment */}
                                    <span>עיר: {formData.city}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-blue-800 ml-2" />
                                    <span>כתובת: {formData.streetAddress}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-[#233071] mb-4">פרטי הלקוח</h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <User className="h-5 w-5 text-blue-800 ml-2" />
                                <span>{formData.fullName}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-5 w-5 text-blue-800 ml-2" />
                                <span>{formData.email}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-5 w-5 text-blue-800 ml-2" />
                                <span>{formData.phone}</span>
                              </div>
                              {formData.company && (
                                <div className="flex items-center">
                                  <Building className="h-5 w-5 text-blue-800 ml-2" />
                                  <span>{formData.company}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {formData.notes && (
                          <div className="mt-6">
                            <h3 className="font-semibold text-[#233071] mb-2">הערות נוספות</h3>
                            <p className="text-[#233071]">{formData.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          לאחר שליחת הטופס תקבל אימייל עם פרטי הפגישה המבוקשת.
                          בהמשך אשלח אליך אישור סופי יחד עם הצעת מחיר מותאמת.
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                        >
                          חזור
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                              שולח...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 w-5 ml-2" />
                              אשר ושלח
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
