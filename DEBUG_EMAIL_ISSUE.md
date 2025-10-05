# 🔍 בדיקת בעיית שליחת מיילים

## 📋 **צ'קליסט לבדיקה:**

### **1. בדוק אם `RESEND_API_KEY` מוגדר ב-Netlify:**

**לך לכאן:**
https://app.netlify.com/sites/ecommeres/configuration/env

**בדוק:**
- ✅ יש משתנה בשם `RESEND_API_KEY`?
- ✅ הערך שלו: `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`?

**אם לא - הוסף אותו עכשיו!**

---

### **2. בדוק את ה-Function Logs ב-Netlify:**

**לך לכאן:**
https://app.netlify.com/sites/ecommeres/functions/send-email

**לחץ על הטאב "Logs"**

**עשה הזמנה חדשה באתר:**
https://ecommeres.netlify.app/checkout

**מה אתה רואה ב-Logs?**

#### **אם רואה:**
```
📧 Sending email via Netlify Function
📧 To: xxx@example.com
📧 Subject: אישור הזמנה
✅ Email sent successfully via Resend: xxx
```
**→ המייל נשלח! בדוק בתיבת דואר (גם בספאם)**

#### **אם רואה שגיאה:**
```
❌ Error sending email: ...
```
**→ תעתיק את השגיאה ותשלח לי**

#### **אם לא רואה כלום:**
**→ ה-Function לא נקראת. בדוק את הקונסול בדפדפן**

---

### **3. בדוק את הקונסול בדפדפן:**

**פתח את האתר:**
https://ecommeres.netlify.app/checkout

**פתח DevTools:**
- לחץ F12
- לחץ על טאב "Console"

**עשה הזמנה**

**מה אתה רואה?**

#### **אם רואה:**
```
📧 Sending email via Netlify Function to: xxx
✅ Email sent successfully via Netlify Function: xxx
```
**→ הבקשה עברה! בדוק את ה-Logs ב-Netlify**

#### **אם רואה:**
```
📧 Mock Email Sent (no Resend API key)
```
**→ אתה עדיין ב-localhost! לך ל-Netlify URL**

#### **אם רואה שגיאה:**
```
❌ Error sending email: ...
```
**→ תעתיק את השגיאה ותשלח לי**

---

### **4. בדוק את ה-Network בדפדפן:**

**פתח DevTools → טאב "Network"**

**עשה הזמנה**

**חפש בקשה ל:**
`/.netlify/functions/send-email`

**לחץ עליה**

**מה הסטטוס?**

#### **200 (OK):**
**→ הבקשה הצליחה! בדוק את ה-Response**

#### **404 (Not Found):**
**→ ה-Function לא נמצאת. צריך Deploy מחדש**

#### **500 (Internal Server Error):**
**→ יש שגיאה ב-Function. בדוק את ה-Logs**

---

## 🆘 **בעיות נפוצות ופתרונות:**

### **בעיה 1: `RESEND_API_KEY` לא מוגדר**

**פתרון:**
1. לך ל: https://app.netlify.com/sites/ecommeres/configuration/env
2. הוסף: `RESEND_API_KEY` = `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
3. Deploy מחדש

---

### **בעיה 2: המייל נשלח אבל לא מגיע**

**פתרון:**
1. בדוק בתיבת ספאם
2. בדוק שהמייל נכון (לא טעות הקלדה)
3. נסה מייל אחר

---

### **בעיה 3: Resend API Key לא תקין**

**שגיאה:**
```
Resend API error: 401 - Unauthorized
```

**פתרון:**
1. בדוק שה-API Key נכון: `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
2. בדוק ב-Resend Dashboard שה-API Key לא נמחק
3. צור API Key חדש אם צריך

---

### **בעיה 4: Domain לא מאומת ב-Resend**

**שגיאה:**
```
Resend API error: 403 - Domain not verified
```

**פתרון:**
השתמש ב-domain של Resend:
- `onboarding@resend.dev` (כבר מוגדר בקוד!)

---

### **בעיה 5: ה-Function לא נטענת**

**שגיאה:**
```
404 - Function not found
```

**פתרון:**
1. בדוק ש-`netlify.toml` מועלה ל-GitHub
2. בדוק ש-`netlify/functions/send-email.js` קיים
3. Deploy מחדש עם "Clear cache"

---

## 📸 **מה לשלוח לי לעזרה:**

אם זה עדיין לא עובד, שלח לי screenshots של:

1. **Netlify Environment Variables:**
   - https://app.netlify.com/sites/ecommeres/configuration/env
   - (תסתיר את ה-API Key אם רוצה)

2. **Netlify Function Logs:**
   - https://app.netlify.com/sites/ecommeres/functions/send-email
   - כולל השגיאות שרואה

3. **Console בדפדפן:**
   - F12 → Console
   - אחרי שעשית הזמנה

4. **Network בדפדפן:**
   - F12 → Network → `send-email`
   - ה-Response שחזר

---

## 🎯 **סיכום מהיר:**

**בדוק לפי הסדר:**
1. ✅ `RESEND_API_KEY` מוגדר ב-Netlify?
2. ✅ עשית Deploy מחדש אחרי הוספת ה-Key?
3. ✅ אתה בודק ב-Netlify URL (לא localhost)?
4. ✅ יש logs ב-Netlify Function?
5. ✅ אין שגיאות בקונסול?
6. ✅ בדקת בספאם?

**אחרי שתבדוק - תגיד לי מה מצאת! 🔍**
