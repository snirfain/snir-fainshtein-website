
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Menu, ShoppingCart, User as UserIcon, LogOut, Package, Download, Calendar, Phone, Mail, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(currentPageName);
  
  // Use contexts
  const { user, isLoading: isLoadingUser, login, logout } = useAuth();
  const { getCartItemsCount } = useCart();

  useEffect(() => {
    setCurrentPage(currentPageName);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPageName]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLogin = () => {
    // Navigate to login page
    window.location.href = createPageUrl("Login");
  };

  const isActive = (pageName) => {
    return currentPage === pageName ? "text-blue-800 font-semibold" : "text-[#233071] hover:text-blue-800";
  };

  const cartItemsCount = getCartItemsCount();

  const navItems = [
    { name: "אודות", path: "About" },
    { name: "שירותים", path: "Services" },
    { name: "חנות", path: "Shop", highlighted: true },
    { name: "שאלות ותשובות", path: "FAQ" },
    { name: "צור קשר", path: "Contact" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <style>{`
        * {
          direction: rtl;
        }
        
        :root {
          --primary: #1E6FB6;
          --primary-light: #4A90CD;
          --accent: #F5A623;
          --accent-light: #FFB84D;
          --light-bg: #F5F7FA;
          --text: #2D3748;
          --text-light: #718096;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
        
        body, html {
          color: var(--text);
          font-family: 'Heebo', sans-serif;
          direction: rtl;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Heebo', sans-serif;
          font-weight: 700;
        }
        
        .admin-btn {
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        
        .admin-btn:hover {
          opacity: 1;
        }
      `}</style>

      {/* Header - RTL */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/98 backdrop-blur-sm py-4'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/logo.png" 
                alt="שניר פיינשטיין - פיתוח הדרכה ושילוב AI בלמידה" 
                className="h-20" 
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`px-4 py-2 rounded-lg transition-all text-base font-medium ${
                    item.highlighted 
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl font-bold' 
                      : isActive(item.path)
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* User Menu */}
              {!isLoadingUser && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2">
                          <UserIcon className="h-5 w-5" />
                          <span className="hidden xl:inline">{user.full_name || 'החשבון שלי'}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56 bg-white shadow-xl border-2">
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("Dashboard")} className="cursor-pointer w-full flex items-center">
                            <Package className="h-4 w-4 ml-2" />
                            <span>הדשבורד שלי</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("Downloads")} className="cursor-pointer w-full flex items-center">
                            <Download className="h-4 w-4 ml-2" />
                            <span>המוצרים שלי</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer flex items-center">
                          <LogOut className="h-4 w-4 ml-2" />
                          <span>התנתק</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link to={createPageUrl("Login")}>
                      <Button variant="outline" className="gap-2">
                        <UserIcon className="h-4 w-4" />
                        התחבר
                      </Button>
                    </Link>
                  )}
                </>
              )}

              {/* Cart Button */}
              <Link to={createPageUrl("Cart")}>
                <Button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg gap-2 relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span>עגלה</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* CTA Button */}
              <Link to={createPageUrl("Schedule")}>
                <Button className="bg-gradient-to-l from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>קבע פגישת ייעוץ</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full py-6">
                  <div className="flex justify-center mb-8">
                    <img 
                      src="/logo.png" 
                      alt="שניר פיינשטיין - פיתוח הדרכה ושילוב AI בלמידה" 
                      className="h-16" 
                    />
                  </div>

                  <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={createPageUrl(item.path)}
                        className={`block px-4 py-3 rounded-lg transition-colors ${
                          item.highlighted 
                            ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold shadow-md' 
                            : isActive(item.path)
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {user && (
                      <>
                        <Link
                          to={createPageUrl("Dashboard")}
                          className="block px-4 py-3 rounded-lg transition-colors text-[#233071] hover:bg-gray-100 flex items-center"
                        >
                          <Package className="h-4 w-4 ml-2" />
                          <span>הדשבורד שלי</span>
                        </Link>
                        <Link
                          to={createPageUrl("Downloads")}
                          className="block px-4 py-3 rounded-lg transition-colors text-[#233071] hover:bg-gray-100 flex items-center"
                        >
                          <Download className="h-4 w-4 ml-2" />
                          <span>המוצרים שלי</span>
                        </Link>
                      </>
                    )}
                  </nav>

                  <div className="space-y-3 pt-6 border-t">
                    {user ? (
                      <>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg">
                          <p className="text-sm text-[#233071]">מחובר כ:</p>
                          <p className="font-semibold">{user.full_name || user.email}</p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="w-full flex items-center justify-center gap-2" size="lg">
                          <LogOut className="h-4 w-4" />
                          <span>התנתק</span>
                        </Button>
                      </>
                    ) : (
                      <Link to={createPageUrl("Login")} className="w-full">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg">
                          <UserIcon className="h-4 w-4" />
                          <span>התחבר</span>
                        </Button>
                      </Link>
                    )}
                    <Link to={createPageUrl("Cart")} className="block">
                      <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 flex items-center justify-center gap-2 relative" size="lg">
                        <ShoppingCart className="h-5 w-5" />
                        <span>עגלה ({cartItemsCount})</span>
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Schedule")} className="block">
                      <Button className="w-full bg-gradient-to-l from-blue-600 to-blue-700 flex items-center justify-center gap-2" size="lg">
                        <Calendar className="h-4 w-4" />
                        <span>קבע פגישת ייעוץ</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/592c3d_Asset2.png" 
                alt="שניר פיינשטיין" 
                className="h-16 brightness-0 invert" 
              />
              <p className="text-gray-400 text-sm">
                מומחה למידה וטכנולוגיה, מתמחה בהטמעת AI בארגונים ומוסדות חינוך
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">קישורים מהירים</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl("About")} className="text-gray-400 hover:text-white transition-colors">אודות</Link></li>
                <li><Link to={createPageUrl("Shop")} className="text-gray-400 hover:text-white transition-colors">חנות ומבצעים</Link></li>
                <li><Link to={createPageUrl("Bundles")} className="text-gray-400 hover:text-white transition-colors">חבילות</Link></li>
                <li><Link to={createPageUrl("FAQ")} className="text-gray-400 hover:text-white transition-colors">שאלות ותשובות</Link></li>
                <li><Link to={createPageUrl("Contact")} className="text-gray-400 hover:text-white transition-colors">צור קשר</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">מידע משפטי</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl("TermsOfService")} className="text-gray-400 hover:text-white transition-colors">תנאי שימוש</Link></li>
                <li><Link to={createPageUrl("PrivacyPolicy")} className="text-gray-400 hover:text-white transition-colors">מדיניות פרטיות</Link></li>
                <li><Link to={createPageUrl("RefundPolicy")} className="text-gray-400 hover:text-white transition-colors">מדיניות החזרים</Link></li>
                <li><Link to={createPageUrl("ShippingPolicy")} className="text-gray-400 hover:text-white transition-colors">מדיניות משלוחים</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">יצירת קשר</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href="tel:+972503133641" className="hover:underline">050-313-3641</a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto:snirfain@gmail.com" className="hover:underline">snirfain@gmail.com</a>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                  <span>הרימון, קרית גת</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-right">
                  &copy; {new Date().getFullYear()} שניר פיינשטיין. כל הזכויות שמורות.
                </p>
                {/* Admin Button - In Footer */}
                <Link to={createPageUrl("Admin")} className="text-gray-600 hover:text-gray-400 transition-colors">
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                  >
                    <Lock className="h-3 w-3 ml-1" />
                    מערכת ניהול
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>🔒 תשלום מאובטח</span>
                <span>•</span>
                <span>🚀 משלוח מיידי</span>
                <span>•</span>
                <span>💬 תמיכה מקצועית</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
