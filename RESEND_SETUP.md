# 📧 מדריך הגדרת Resend לשליחת מיילים

## ✅ מה כבר הוגדר

- ✅ Resend API Key הוגדר ב-.env
- ✅ emailService.js מוגדר לעבוד עם Resend
- ✅ mockData.js מוגדר לשלוח מיילים אמיתיים

---

## 🔧 מה עוד צריך לעשות

### שלב 1: אימות כתובת אימייל ב-Resend

1. **היכנס ל-Resend Dashboard:**
   - לך ל-[resend.com/login](https://resend.com/login)
   - התחבר עם החשבון שלך

2. **אמת את כתובת האימייל:**
   - לך ל-**Domains** או **Verified Emails**
   - לחץ על **Add Email**
   - הזן: `snirfain@gmail.com`
   - Resend ישלח מייל אימות ל-snirfain@gmail.com
   - פתח את המייל ולחץ על קישור האימות

3. **חכה לאישור:**
   - זה יכול לקחת כמה דקות
   - תראה ✅ ליד האימייל כשהוא מאומת

---

## 🧪 בדיקת שליחת מיילים

### אופציה 1: דרך האתר

1. **רענן את הדף** (F5)
2. **צור הזמנה:**
   - הוסף מוצר לעגלה
   - לך ל-Checkout
   - מלא את הפרטים
   - השלם הזמנה

3. **בדוק ב-Console:**
   ```
   📧 Sending email via Resend to: snirfain@gmail.com
   ✅ Email sent successfully via Resend: {id: '...'}
   ```

4. **בדוק את תיבת הדואר:**
   - פתח את snirfain@gmail.com
   - חפש מייל עם הנושא: "אישור הזמנה - ORD-..."

### אופציה 2: בדיקה מהירה דרך Resend Dashboard

1. לך ל-[resend.com/emails](https://resend.com/emails)
2. תראה רשימה של כל המיילים שנשלחו
3. לחץ על מייל לראות פרטים

---

## 🚨 פתרון בעיות

### אם המיילים לא מגיעים:

1. **בדוק ב-Console אם יש שגיאות:**
   - `❌ Error sending email via Resend`
   - קרא את הודעת השגיאה

2. **בדוק אם האימייל מאומת:**
   - לך ל-Resend Dashboard > Verified Emails
   - ודא שיש ✅ ליד snirfain@gmail.com

3. **בדוק את תיקיית Spam:**
   - המיילים הראשונים עלולים להגיע ל-Spam

4. **בדוק ב-Resend Dashboard:**
   - לך ל-Emails
   - בדוק את הסטטוס של המיילים
   - אם יש שגיאה, תראה אותה שם

### שגיאות נפוצות:

**"Email not verified":**
- פתרון: אמת את snirfain@gmail.com ב-Resend Dashboard

**"API key invalid":**
- פתרון: בדוק ש-.env מכיל את ה-API key הנכון

**"Rate limit exceeded":**
- פתרון: Resend מאפשר 100 מיילים ביום בחינם. חכה 24 שעות או שדרג את החשבון

---

## 📊 מגבלות החשבון החינמי

- **100 מיילים ביום** - מספיק לבדיקות ואתר קטן
- **1 verified email** - snirfain@gmail.com
- **אין מגבלת זמן** - החשבון החינמי לא פג

---

## 🎯 מה קורה עכשיו?

כשמישהו משלים הזמנה באתר:
1. המערכת שולחת מייל דרך Resend
2. הלקוח מקבל מייל יפה בעברית עם:
   - כותרת מעוצבת
   - פרטי ההזמנה
   - סכומים והנחות
   - פרטי יצירת קשר
3. המייל מגיע תוך שניות

---

## 📞 תמיכה

אם יש בעיות:
1. בדוק את [Resend Documentation](https://resend.com/docs)
2. בדוק ב-Console logs
3. בדוק ב-Resend Dashboard > Emails

---

**✅ ההגדרה הושלמה! רק צריך לאמת את האימייל ואתה מוכן לשלוח מיילים אמיתיים! 🎉**

