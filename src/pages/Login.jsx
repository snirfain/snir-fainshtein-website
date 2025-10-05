import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Mail, Lock, Loader2, Chrome } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectTo = searchParams.get('redirect') || createPageUrl('Home');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      
      // נווט לדף המבוקש
      navigate(redirectTo);
    } catch (err) {
      console.error('Login error:', err);
      setError('שם משתמש או סיסמה שגויים. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      navigate(redirectTo);
    } catch (err) {
      console.error('Google login error:', err);
      setError('שגיאה בהתחברות דרך Google. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">התחברות</h1>
            <p className="text-[#233071] mt-2">התחבר לחשבון שלך</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            type="button"
            className="w-full h-12 text-base border-2 hover:bg-blue-50"
          >
            <Chrome className="h-5 w-5 ml-2 text-blue-800" />
            התחבר עם Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">או</span>
            </div>
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">אימייל</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to={createPageUrl('Register')} className="text-blue-800 hover:underline">
                אין לך חשבון? הירשם
              </Link>
              <Link to={createPageUrl('ForgotPassword')} className="text-blue-800 hover:underline">
                שכחת סיסמה?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                  מתחבר...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 ml-2" />
                  התחבר
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-[#233071]">
            <Link to={createPageUrl('Home')} className="text-blue-800 hover:underline">
              ← חזור לדף הבית
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

