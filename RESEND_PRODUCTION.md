# 📧 הגדרת Resend לייצור (Production)

## ⚠️ למה צריך את זה?

**Resend API לא עובד ישירות מהדפדפן** בגלל CORS ואבטחה.
בפיתוח (localhost) המיילים נשלחים ב-Mock Mode (מדומה).
**לייצור צריך אחת מהפתרונות הבאים:**

---

## 🚀 פתרון 1: Netlify Functions (הכי פשוט)

### שלב 1: צור קובץ Function

צור: `netlify/functions/send-email.js`

```javascript
// netlify/functions/send-email.js
export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { to, subject, html } = JSON.parse(event.body);
    
    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'שניר פיינשטיין <snirfain@gmail.com>',
        to: [to],
        subject: subject,
        html: html
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(JSON.stringify(result));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: result.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
```

### שלב 2: עדכן emailService.js

```javascript
export const sendEmail = async ({ to, subject, html }) => {
  // In production, use Netlify function
  if (import.meta.env.PROD) {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html })
    });
    return await response.json();
  }
  
  // In development, use mock
  console.log('📧 Mock email to:', to);
  return { success: true, messageId: 'mock-' + Date.now() };
};
```

### שלב 3: הגדר Environment Variable ב-Netlify

1. לך ל-Netlify Dashboard > Site settings > Environment variables
2. הוסף: `RESEND_API_KEY` = `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
3. Deploy מחדש

---

## 🚀 פתרון 2: Vercel Functions

### שלב 1: צור קובץ Function

צור: `api/send-email.js`

```javascript
// api/send-email.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html } = req.body;
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'שניר פיינשטיין <snirfain@gmail.com>',
        to: [to],
        subject: subject,
        html: html
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(JSON.stringify(result));
    }

    res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### שלב 2: עדכן emailService.js

```javascript
export const sendEmail = async ({ to, subject, html }) => {
  if (import.meta.env.PROD) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html })
    });
    return await response.json();
  }
  
  console.log('📧 Mock email to:', to);
  return { success: true, messageId: 'mock-' + Date.now() };
};
```

### שלב 3: הגדר Environment Variable ב-Vercel

1. לך ל-Vercel Dashboard > Project Settings > Environment Variables
2. הוסף: `RESEND_API_KEY` = `re_6A6ysLpq_HZpp7h8FnvsGYmiUnKgSZ9UE`
3. Deploy מחדש

---

## 🚀 פתרון 3: Backend Server (Node.js/Express)

אם יש לך backend server:

```javascript
// server.js
app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body;
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'שניר פיינשטיין <snirfain@gmail.com>',
      to: [to],
      subject,
      html
    })
  });

  const result = await response.json();
  res.json(result);
});
```

---

## 📝 סיכום

**עכשיו (פיתוח):**
- ✅ מיילים ב-Mock Mode
- ✅ רואה logs ב-console
- ✅ הכל עובד מקומית

**לייצור צריך:**
1. ✅ יש לך Resend API key
2. ⏳ צריך Serverless Function (Netlify/Vercel)
3. ⏳ צריך להגדיר Environment Variable

**המלצה:**
- אם משתמש ב-Netlify → פתרון 1
- אם משתמש ב-Vercel → פתרון 2
- אם יש Backend → פתרון 3

---

## 🆘 עזרה

אם צריך עזרה עם ההגדרה, תגיד לי איזה פלטפורמה אתה משתמש (Netlify/Vercel/אחר) ואני אעזור לך!

