import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show banner after 2 seconds
      setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-orange-500 shadow-2xl animate-slide-up" dir="rtl">
      <div className="container mx-auto px-4 py-6 md:py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
              <Cookie className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">אנו משתמשים בעוגיות 🍪</h3>
              <p className="text-[#233071] text-sm leading-relaxed">
                אנחנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך, לנתח תנועה באתר ולהציג תוכן מותאם אישית.
                על ידי המשך שימוש באתר, אתה מסכים{' '}
                <a href="/privacypolicy" className="text-blue-800 hover:underline font-medium">
                  למדיניות הפרטיות
                </a>
                {' '}שלנו.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 md:flex-initial"
            >
              דחה
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-orange-400 hover:bg-orange-500 flex-1 md:flex-initial"
            >
              אני מסכים
            </Button>
            <button
              onClick={handleDecline}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
              aria-label="סגור"
            >
              <X className="h-5 w-5 text-[#233071]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

