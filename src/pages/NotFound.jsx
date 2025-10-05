import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-800 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[#233071] mb-4">
            אופס! הדף לא נמצא
          </h2>
          <p className="text-lg text-[#233071] mb-8">
            הדף שחיפשת אינו קיים או שהועבר למיקום אחר.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">מה ניתן לעשות?</h3>
          <div className="space-y-3 text-right">
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-800 mt-0.5 flex-shrink-0" />
              <p className="text-[#233071]">בדוק שכתובת האתר נכונה</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-800 mt-0.5 flex-shrink-0" />
              <p className="text-[#233071]">חזור לדף הבית ונסה שוב</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-blue-800 mt-0.5 flex-shrink-0" />
              <p className="text-[#233071]">השתמש בחיפוש כדי למצוא את מה שאתה מחפש</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl("Home")}>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">
              <Home className="h-5 w-5 ml-2" />
              חזרה לדף הבית
            </Button>
          </Link>
          <Link to={createPageUrl("Shop")}>
            <Button variant="outline" className="px-8">
              <Search className="h-5 w-5 ml-2" />
              עבור לחנות
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          צריך עזרה? <Link to={createPageUrl("Contact")} className="text-blue-800 hover:text-blue-800">צור קשר איתנו</Link>
        </p>
      </div>
    </div>
  );
}