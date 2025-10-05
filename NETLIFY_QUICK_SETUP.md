# 🚀 מדריך מהיר ל-Netlify

## ✅ GitHub מוכן!

אחרי ש-GitHub מוכן, בואו נמשיך ל-Netlify.

---

## 📋 שלבים ל-Netlify:

### **שלב 1: צור חשבון Netlify**
1. לך ל: **netlify.com**
2. לחץ **"Sign up"**
3. בחר **"GitHub"** (התחבר עם GitHub)
4. אמת את ההרשאות

### **שלב 2: העלה את האתר**
1. ב-Netlify Dashboard לחץ **"New site from Git"**
2. בחר **"GitHub"**
3. חפש את הפרויקט: **`snir-fainshtein-website`**
4. לחץ עליו
5. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. לחץ **"Deploy site"**

### **שלב 3: הגדר Environment Variables**
1. לך ל: **Site settings > Environment variables**
2. לחץ **"Add variable"**
3. **Key:** `RESEND_API_KEY`
4. **Value:** `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
5. לחץ **"Save"**

### **שלב 4: Deploy מחדש**
1. לך ל: **Deploys**
2. לחץ **"Trigger deploy"**
3. לחץ **"Deploy site"**

---

## 🎯 **אחרי שתסיים:**

האתר יהיה זמין ב:
**`https://שם-האתר.netlify.app`**

**המיילים יעבדו אוטומטית! 📧**

---

## 🔧 **אם יש בעיות:**

### **אם האתר לא נטען:**
1. בדוק ב-Netlify Dashboard > Deploys
2. בדוק את ה-logs של ה-Deploy
3. ודא שה-Build command נכון: `npm run build`

### **אם המיילים לא נשלחים:**
1. בדוק ב-Netlify Dashboard > Functions
2. בדוק את ה-logs של ה-Function
3. ודא שה-Environment Variable מוגדר

### **אם יש שגיאות CORS:**
1. ודא שה-Function נמצא ב-`netlify/functions/`
2. Deploy מחדש

---

## 📧 **איך זה עובד:**

### **בפיתוח (localhost):**
```
דפדפן → Mock Mode → Console Logs
```

### **בייצור (Netlify):**
```
דפדפן → Netlify Function → Resend API → מייל אמיתי
```

---

## 🎉 **סיכום:**

**עכשיו יש לך:**
- ✅ **אתר עובד** על Netlify
- ✅ **מיילים נשלחים** דרך Resend
- ✅ **חינם** - ללא עלויות
- ✅ **אמין** - מאות אלפי אתרים משתמשים

**הכל מוכן! 🚀**

---

## 🆘 **עזרה:**

אם יש בעיות:
1. **בדוק את ה-logs** ב-Netlify Dashboard
2. **בדוק את ה-Environment Variables**
3. **Deploy מחדש** אחרי כל שינוי

**תגיד לי אם צריך עזרה! 🎯**
