# 🔧 תיקון התחברות Google ב-Netlify

## ❌ **הבעיה:**
Firebase חוסם התחברות מדומיינים לא מורשים (Authorized domains)

## ✅ **הפתרון:**

### **שלב 1: לך ל-Firebase Console**
1. **פתח:** https://console.firebase.google.com
2. **בחר את הפרויקט שלך**
3. **לחץ על "Authentication"** (משמאל)
4. **לחץ על "Settings"** (למעלה)
5. **לחץ על "Authorized domains"** (טאב)

### **שלב 2: הוסף את הדומיין של Netlify**
1. **לחץ על "Add domain"**
2. **הכנס את הדומיין שלך:**
   - `ecommeres.netlify.app`
3. **לחץ "Add"**

### **שלב 3: בדוק שהדומיינים הבאים קיימים:**
- ✅ `localhost` (לפיתוח)
- ✅ `ecommeres.netlify.app` (לייצור)

---

## 🎯 **אחרי זה:**

### **1. Deploy מחדש ב-Netlify**
- לך ל-Netlify Dashboard
- לחץ "Trigger deploy"
- בחר "Deploy site"

### **2. בדוק שההתחברות עובדת**
- לך לאתר: https://ecommeres.netlify.app/login
- לחץ "התחבר עם Google"
- בחר חשבון Google
- ✅ אתה מחובר!

---

## 🆘 **אם עדיין לא עובד:**

### **בדוק את ה-Environment Variables ב-Netlify:**

1. **לך ל-Netlify Dashboard**
2. **לחץ על Site Settings**
3. **לחץ על Environment variables**
4. **ודא שיש לך את כל המשתנים הבאים:**

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
RESEND_API_KEY=re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE
```

### **איך לקבל את הערכים מFirebase:**

1. **לך ל-Firebase Console**
2. **לחץ על הגלגל שיניים (Settings)**
3. **לחץ על "Project settings"**
4. **גלול למטה ל-"Your apps"**
5. **לחץ על האפליקציה שלך (Web)**
6. **העתק את כל הערכים**

---

## 📋 **סיכום:**

### **מה צריך לעשות:**
1. ✅ **הוסף את הדומיין של Netlify ל-Firebase Authorized domains**
2. ✅ **הוסף את Environment Variables ל-Netlify**
3. ✅ **Deploy מחדש**

### **אחרי זה:**
- ✅ **התחברות עם Google תעבוד**
- ✅ **המיילים יעבדו**
- ✅ **הכל מוכן לייצור**

---

## 🎉 **הכל מוכן!**

**תגיד לי אם צריך עזרה! 🎯**
