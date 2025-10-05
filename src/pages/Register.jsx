import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Mail, Lock, User as UserIcon, Phone, Loader2, Chrome } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Register() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('אנא מלא את כל השדות החובה');
      return false;
    }

    if (formData.password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return false;
    }

    if (!agreedToTerms) {
      setError('יש לאשר את תנאי השימוש');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      await register({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone
      });
      
      // נווט לדף הבית
      navigate(createPageUrl('Home'));
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message?.includes('already exists')) {
        setError('המייל כבר רשום במערכת. נסה להתחבר במקום.');
      } else {
        setError('שגיאה בהרשמה. אנא נסה שוב.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      navigate(createPageUrl('Home'));
    } catch (err) {
      console.error('Google signup error:', err);
      setError('שגיאה בהרשמה דרך Google. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">הרשמה</h1>
            <p className="text-[#233071] mt-2">צור חשבון חדש</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Signup */}
          <Button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            variant="outline"
            type="button"
            className="w-full h-12 text-base border-2 hover:bg-green-50"
          >
            <Chrome className="h-5 w-5 ml-2 text-green-600" />
            הירשם עם Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">או</span>
            </div>
          </div>

          {/* Email/Password Signup */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">שם מלא *</Label>
              <div className="relative">
                <UserIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="שם מלא"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">אימייל *</Label>
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
              <Label htmlFor="phone">טלפון</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="050-1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">סיסמה *</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="לפחות 6 תווים"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">אימות סיסמה *</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="הקלד סיסמה שוב"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={setAgreedToTerms}
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                אני מסכים ל
                <Link to={createPageUrl('TermsOfService')} className="text-blue-800 hover:underline mx-1">
                  תנאי השימוש
                </Link>
                ול
                <Link to={createPageUrl('PrivacyPolicy')} className="text-blue-800 hover:underline mr-1">
                  מדיניות הפרטיות
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                  נרשם...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 ml-2" />
                  הירשם
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm space-y-2">
            <div>
              <span className="text-[#233071]">כבר יש לך חשבון? </span>
              <Link to={createPageUrl('Login')} className="text-blue-800 hover:underline font-medium">
                התחבר
              </Link>
            </div>
            <Link to={createPageUrl('Home')} className="text-[#233071] hover:underline block">
              ← חזור לדף הבית
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

