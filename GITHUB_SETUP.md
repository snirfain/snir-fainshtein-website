# 🐙 מדריך יצירת Repository ב-GitHub

## ✅ Git מוכן!

הפרויקט שלך כבר מאותחל עם Git ויש לו commit ראשון.

---

## 📋 שלבים ליצירת Repository ב-GitHub:

### **שלב 1: צור חשבון GitHub (אם אין)**
1. לך ל: **github.com**
2. לחץ **"Sign up"**
3. הירשם עם Gmail שלך
4. אמת את המייל

### **שלב 2: צור Repository חדש**
1. ב-GitHub Dashboard לחץ **"New"** (ירוק)
2. שם Repository: **`snir-fainshtein-website`**
3. תיאור: **`AI Learning Platform - Website for Snir Fainshtein`**
4. בחר **"Public"** (חינמי)
5. **אל תסמן** "Add a README file" (כבר יש לנו)
6. **אל תסמן** "Add .gitignore" (כבר יש לנו)
7. **אל תסמן** "Choose a license" (לא צריך)
8. לחץ **"Create repository"**

### **שלב 3: חבר את הפרויקט ל-GitHub**

**העתק והדבק את הפקודות הבאות בטרמינל:**

```bash
cd "/Users/fainshtein/Documents/עסק אישי/-941cd4f8"

# חבר את הפרויקט ל-GitHub (החלף את שם-המשתמש שלך)
git remote add origin https://github.com/שם-המשתמש/snir-fainshtein-website.git

# שנה את שם ה-branch ל-main
git branch -M main

# העלה את הפרויקט ל-GitHub
git push -u origin main
```

---

## 🔧 **אם יש שגיאות:**

### **אם כתובת ה-URL לא נכונה:**
```bash
# בדוק את הכתובת
git remote -v

# אם צריך לשנות:
git remote set-url origin https://github.com/שם-המשתמש/snir-fainshtein-website.git
```

### **אם יש בעיה עם Authentication:**
1. לך ל: **github.com/settings/tokens**
2. לחץ **"Generate new token"**
3. בחר **"classic"**
4. סמן **"repo"** (גישה מלאה)
5. העתק את ה-Token
6. השתמש ב-Token במקום סיסמה

---

## ✅ **אחרי שתסיים:**

הפרויקט יהיה זמין ב:
**`https://github.com/שם-המשתמש/snir-fainshtein-website`**

---

## 🚀 **הצעד הבא:**

אחרי ש-GitHub מוכן, נמשיך ל-Netlify!

**תגיד לי כשתסיים עם GitHub! 🎯**
