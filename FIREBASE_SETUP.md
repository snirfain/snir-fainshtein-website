# 🔥 הגדרת Firebase - התחברות עם Google

מדריך מלא להגדרת Firebase Authentication לאתר.

---

## שלב 1: יצירת פרויקט Firebase

1. **היכנס ל-Firebase Console:**
   - גש ל-https://console.firebase.google.com
   - לחץ על "Add project" או "הוסף פרויקט"

2. **הגדרת הפרויקט:**
   - שם הפרויקט: `snir-fainshtein-website` (או כל שם שתבחר)
   - לחץ "Continue"
   - בחר אם להפעיל Google Analytics (לא חובה)
   - לחץ "Create project"

---

## שלב 2: הוספת אפליקציית Web

1. **בדף הראשי של הפרויקט:**
   - לחץ על האייקון `</>` (Web)
   - תן שם לאפליקציה: `snir-website`
   - לחץ "Register app"

2. **שמור את הגדרות Firebase:**
   - תראה קוד עם `firebaseConfig`
   - העתק את כל הערכים (apiKey, authDomain, וכו')

---

## שלב 3: הפעלת Google Authentication

1. **בתפריט צד:**
   - לחץ על "Authentication"
   - לחץ "Get started"

2. **הוספת Google Provider:**
   - לחץ על "Sign-in method"
   - בחר "Google"
   - הפעל את המתג (Enable)
   - בחר את האימייל התומך בפרויקט
   - לחץ "Save"

---

## שלב 4: הגדרת Authorized Domains

1. **ב-Authentication > Settings > Authorized domains:**
   - `localhost` כבר צריך להיות שם (לפיתוח)
   - הוסף את הדומיין שלך לייצור: `yourdomain.com`

---

## שלב 5: יצירת קובץ .env

1. **צור קובץ בשם `.env` בתיקיית הראשית של הפרויקט:**

```bash
# בטרמינל:
touch .env
```

2. **הוסף את הערכים מ-Firebase Console:**

```env
VITE_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**⚠️ חשוב:** 
- הקובץ `.env` כבר ב-`.gitignore` - לא יועלה ל-Git
- אל תשתף את הקובץ הזה פומבית!

---

## שלב 6: הפעלת השרת

```bash
npm run dev
```

השרת ירוץ על: http://localhost:5173

---

## שלב 7: בדיקה

1. **נווט ל-דף ההתחברות:**
   - http://localhost:5173/login

2. **לחץ על "התחבר עם Google"**
   - תיפתח חלון popup של Google
   - בחר חשבון Google
   - אם הכל תקין - תתחבר והמערכת תנווט אותך לדף הבית

---

## 🎨 מה קורה מאחורי הקלעים?

1. **לחיצה על כפתור Google:**
   - נפתח popup של Google Authentication
   - המשתמש בוחר חשבון
   
2. **אחרי אישור:**
   - Firebase מחזיר את פרטי המשתמש
   - המערכת שומרת אותם ב-localStorage
   - המשתמש מנווט לדף הבית

3. **בכניסות הבאות:**
   - Firebase זוכר את המשתמש
   - אוטומטית מתחבר

---

## 🔧 פתרון בעיות נפוצות

### שגיאה: "Firebase: Error (auth/unauthorized-domain)"
**פתרון:** הוסף את הדומיין שלך ל-Authorized domains בFirebase Console.

### שגיאה: "No Firebase App"
**פתרון:** בדוק שהקובץ `.env` קיים ומכיל את כל הערכים הנכונים.

### הכפתור לא עושה כלום
**פתרון:** פתח את Console בדפדפן (F12) וחפש שגיאות.

### Popup נחסם
**פתרון:** אפשר popups בדפדפן עבור localhost.

---

## 📱 פריסה לייצור (Production)

כשאתה מעלה את האתר לשרת:

1. **הוסף את הדומיין ל-Firebase:**
   - Authentication > Settings > Authorized domains
   - הוסף: `yourdomain.com`

2. **הגדר משתני סביבה בשרת:**
   - לדוגמה ב-Vercel/Netlify:
   - הוסף את כל ה-`VITE_FIREBASE_*` variables
   - בדיוק כמו בקובץ `.env`

---

## ✅ זהו! המערכת מוכנה

עכשיו המשתמשים יכולים:
- ✅ להתחבר עם Google
- ✅ להירשם עם Google
- ✅ להתנתק
- ✅ לראות את הפרופיל שלהם (כולל תמונה)

---

**שאלות? בעיות?** 
צור קשר: snirfain@gmail.com

