# 🚀 מדריך העלאה ל-Netlify עם שליחת מיילים

## ✅ מה כבר מוכן:

- ✅ **Netlify Function** - `netlify/functions/send-email.js`
- ✅ **Email Service** - מעודכן לעבוד עם Netlify
- ✅ **Resend API Key** - מוכן לשימוש

---

## 📋 שלבים להעלאה:

### **שלב 1: הכנת הפרויקט ל-GitHub**

#### 1.1 אתחל Git (אם עדיין לא):
```bash
cd "/Users/fainshtein/Documents/עסק אישי/-941cd4f8"
git init
git add .
git commit -m "Initial commit"
```

#### 1.2 צור Repository ב-GitHub:
1. לך ל: **github.com**
2. לחץ **"New repository"**
3. שם: **`snir-fainshtein-website`**
4. לחץ **"Create repository"**

#### 1.3 חבר את הפרויקט:
```bash
git remote add origin https://github.com/שם-המשתמש/snir-fainshtein-website.git
git branch -M main
git push -u origin main
```

---

### **שלב 2: העלאה ל-Netlify**

#### 2.1 צור חשבון Netlify:
1. לך ל: **netlify.com**
2. לחץ **"Sign up"**
3. הירשם עם GitHub

#### 2.2 העלה את האתר:
1. ב-Netlify Dashboard לחץ **"New site from Git"**
2. בחר **"GitHub"**
3. בחר את הפרויקט **`snir-fainshtein-website`**
4. לחץ **"Deploy site"**

#### 2.3 הגדר Environment Variables:
1. לך ל: **Site settings > Environment variables**
2. הוסף: **`RESEND_API_KEY`** = **`re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`**
3. לחץ **"Save"**

#### 2.4 Deploy מחדש:
1. לך ל: **Deploys**
2. לחץ **"Trigger deploy"**
3. לחץ **"Deploy site"**

---

### **שלב 3: בדיקה**

#### 3.1 בדוק שהאתר עובד:
- לך לכתובת: **`https://שם-האתר.netlify.app`**
- בדוק שהאתר נטען

#### 3.2 בדוק שליחת מיילים:
1. צור הזמנה באתר
2. בדוק ב-console של הדפדפן
3. בדוק שהמייל נשלח ל-`snirfain@gmail.com`

---

## 🔧 פתרון בעיות:

### **אם המיילים לא נשלחים:**
1. בדוק ב-Netlify Dashboard > Functions
2. בדוק את ה-logs של ה-Function
3. ודא שה-Environment Variable מוגדר

### **אם יש שגיאות CORS:**
1. ודא שה-Function נמצא ב-`netlify/functions/`
2. ודא שה-Environment Variable מוגדר
3. Deploy מחדש

### **אם האתר לא נטען:**
1. בדוק ב-Netlify Dashboard > Deploys
2. בדוק את ה-logs של ה-Deploy
3. ודא שכל הקבצים הועלו

---

## 📧 איך זה עובד:

### **בפיתוח (localhost):**
```
דפדפן → Mock Mode → Console Logs
```

### **בייצור (Netlify):**
```
דפדפן → Netlify Function → Resend API → מייל אמיתי
```

---

## 🎯 סיכום:

**עכשיו יש לך:**
- ✅ **אתר עובד** על Netlify
- ✅ **מיילים נשלחים** דרך Resend
- ✅ **חינם** - ללא עלויות
- ✅ **אמין** - מאות אלפי אתרים משתמשים

**הכל מוכן! 🚀**

---

## 🆘 עזרה:

אם יש בעיות:
1. **בדוק את ה-logs** ב-Netlify Dashboard
2. **בדוק את ה-Environment Variables**
3. **Deploy מחדש** אחרי כל שינוי

**תגיד לי אם צריך עזרה! 🎯**
