import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/CartContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import ErrorBoundary from "@/components/ErrorBoundary"
import FloatingChat from "@/components/FloatingChat"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import CookieConsent from "@/components/CookieConsent"

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Pages />
            <Toaster />
            <FloatingChat />
            <FloatingWhatsApp />
            <CookieConsent />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App 