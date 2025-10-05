# 🔧 פתרון בעיות שליחת מיילים ב-Netlify

## ❌ **הבעיה:** מיילים לא נשלחים

## ✅ **רשימת בדיקות:**

### **1. ודא ש-RESEND_API_KEY מוגדר ב-Netlify**

#### **צעד 1: לך ל-Netlify Dashboard**
1. פתח: https://app.netlify.com
2. בחר את האתר שלך: **ecommeres**
3. לחץ **"Site settings"**
4. לחץ **"Environment variables"** (בתפריט השמאלי)

#### **צעד 2: בדוק אם יש משתנה RESEND_API_KEY**
- ✅ **אם יש:** ודא שהערך נכון: `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
- ❌ **אם אין:** הוסף אותו:
  - לחץ **"Add variable"**
  - **Key:** `RESEND_API_KEY`
  - **Value:** `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
  - לחץ **"Save"**

#### **צעד 3: Deploy מחדש**
אחרי שהוספת/עדכנת את המשתנה:
1. לך ל-**"Deploys"**
2. לחץ **"Trigger deploy"**
3. בחר **"Clear cache and deploy site"**
4. המתן 2-3 דקות

---

### **2. ודא שה-Netlify Function עובדת**

#### **בדוק ב-Netlify Dashboard:**
1. לך ל-**"Functions"** (בתפריט העליון)
2. אמור לראות function בשם: **send-email**
3. אם לא רואה - Deploy מחדש

#### **בדוק את ה-logs:**
1. לחץ על ה-function **send-email**
2. לחץ על **"Logs"**
3. נסה לשלוח מייל מהאתר
4. בדוק אם יש שגיאות ב-logs

---

### **3. ודא שהדומיין מאומת ב-Resend**

#### **לך ל-Resend Dashboard:**
1. פתח: https://resend.com/domains
2. ודא שהדומיין `gmail.com` לא חסום (או השתמש בדומיין משלך)

**⚠️ חשוב:** Resend לא מאפשר לשלוח מ-`@gmail.com` בייצור!

#### **הפתרון:**
**אופציה 1:** השתמש בדומיין משלך (אם יש לך)
- הוסף את הדומיין שלך ב-Resend
- אמת אותו (DNS records)
- שנה את ה-`from` ב-Netlify Function

**אופציה 2:** השתמש ב-Resend Domain (זמני)
שנה את הקובץ `netlify/functions/send-email.js` בשורה 56:

```javascript
from: 'onboarding@resend.dev',  // במקום snirfain@gmail.com
```

---

### **4. בדוק אם האתר קורא ל-Netlify Function**

#### **פתח את הקונסול בדפדפן:**
1. לך לאתר: https://ecommeres.netlify.app
2. פתח DevTools (F12)
3. לחץ על **"Console"**
4. נסה לעשות הזמנה
5. חפש הודעות:
   - `📧 Sending email via Netlify Function to:...`
   - `✅ Email sent successfully via Netlify Function:...`

#### **אם רואה שגיאה:**
- העתק את השגיאה ושלח לי
- בדוק ב-Network tab אם הבקשה ל-`/.netlify/functions/send-email` מצליחה

---

## 🔧 **תיקון מהיר - שנה את ה-from address**

אם הבעיה היא ש-Resend חוסם שליחה מ-Gmail, תקן את זה:

### **שלב 1: ערוך את netlify/functions/send-email.js**

שנה שורה 56 מ:
```javascript
from: 'שניר פיינשטיין <snirfain@gmail.com>',
```

ל:
```javascript
from: 'שניר פיינשטיין <onboarding@resend.dev>',
```

### **שלב 2: Commit + Push**
```bash
git add netlify/functions/send-email.js
git commit -m "Fix: Use Resend domain for email sending"
git push origin main
```

### **שלב 3: Netlify יעשה Deploy אוטומטי**
- המתן 2-3 דקות
- נסה לשלוח מייל שוב
- אמור לעבוד!

---

## 🎯 **סיכום:**

### **הבעיות השכיחות:**
1. ❌ **RESEND_API_KEY לא מוגדר** → הוסף ב-Netlify Environment Variables
2. ❌ **Gmail domain חסום** → שנה ל-`onboarding@resend.dev`
3. ❌ **Function לא פועלת** → בדוק ב-Netlify Functions logs
4. ❌ **לא עשית Deploy מחדש** → Trigger deploy אחרי שינויים

### **הפתרון המהיר:**
1. ✅ הוסף `RESEND_API_KEY` ב-Netlify
2. ✅ שנה `from` ל-`onboarding@resend.dev`
3. ✅ Deploy מחדש
4. ✅ נסה לשלוח מייל

---

## 📞 **עזרה:**

אם עדיין לא עובד:
1. שלח לי screenshot מה-Netlify Functions logs
2. שלח לי screenshot מה-Console בדפדפן
3. בדוק ב-Network tab את הבקשה ל-Function

**תגיד לי מה אתה רואה ואני אעזור לך! 🚀**
