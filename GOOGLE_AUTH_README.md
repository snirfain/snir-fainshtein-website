# 🚀 הגדרה מהירה - התחברות עם Google

## מה עשינו?

✅ התקנו Firebase  
✅ יצרנו מערכת התחברות עם Google  
✅ הוספנו כפתורי Google ב-Login ו-Register  
✅ כל הקוד מוכן!

---

## 📋 מה צריך לעשות עכשיו? (3 דקות)

### אופציה 1️⃣: שימוש בסקריפט (הכי קל!)

```bash
./setup-firebase.sh
```

הסקריפט ישאל אותך את כל הפרטים וייצור את קובץ `.env` אוטומטית.

---

### אופציה 2️⃣: ידנית

#### שלב 1: צור פרויקט Firebase
1. גש ל-https://console.firebase.google.com
2. לחץ "Add project"
3. תן שם לפרויקט
4. לחץ "Create project"

#### שלב 2: הפעל Google Authentication
1. בצד: Authentication → Get started
2. Sign-in method → Google → Enable
3. שמור

#### שלב 3: קבל את הפרטים
1. Project Settings (גלגל שיניים בצד)
2. תחת "Your apps" → Web app
3. אם אין - לחץ על `</>` ליצירת Web app
4. העתק את כל הערכים

#### שלב 4: צור קובץ .env

```bash
cp .env.template .env
```

ערוך את הקובץ `.env` והכנס את הערכים מFirebase:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
```

#### שלב 5: הפעל את השרת

```bash
npm run dev
```

---

## 🧪 בדיקה

1. פתח: http://localhost:5173/login
2. לחץ "התחבר עם Google"
3. בחר חשבון Google
4. ✅ אתה מחובר!

---

## 📚 מידע נוסף

למדריך מפורט עם screenshots: `FIREBASE_SETUP.md`

---

## ⚠️ חשוב!

- קובץ `.env` לא עולה ל-Git (כבר ב-.gitignore)
- אל תשתף את הקובץ הזה!
- לייצור - הוסף את הדומיין שלך ל-Authorized domains בFirebase

---

## 🎉 זהו!

המשתמשים עכשיו יכולים:
- ✅ להתחבר עם Google (popup)
- ✅ להירשם עם Google
- ✅ להתחבר גם ידנית (אימייל + סיסמה)
- ✅ המערכת זוכרת אותם

**זמן הגדרה משוער: 3-5 דקות**

