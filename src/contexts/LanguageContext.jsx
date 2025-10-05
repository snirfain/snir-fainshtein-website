import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('he'); // Default to Hebrew
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDirection(savedLanguage === 'he' ? 'rtl' : 'ltr');
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDirection(lang === 'he' ? 'rtl' : 'ltr');
    localStorage.setItem('language', lang);
    
    // Update document direction and lang attribute
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  /**
   * Get translated text by key
   * @param {string} key - Translation key in dot notation (e.g., 'nav.home')
   * @returns {string} - Translated text
   */
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };

  const value = {
    language,
    direction,
    changeLanguage,
    t,
    isRTL: direction === 'rtl',
    isHebrew: language === 'he',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

