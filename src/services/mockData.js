// Mock data to replace Base44
import { v4 as uuidv4 } from 'uuid';

// Helper to get data from localStorage
const getFromStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultValue;
  }
};

// Helper to save data to localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

// Initial Site Content data
const initialSiteContent = [
  // Home Page Content
  {
    id: uuidv4(),
    page: 'home',
    section: 'hero',
    type: 'text',
    key: 'hero_title',
    label: 'כותרת ראשית - עמוד הבית',
    value: 'ברוכים הבאים לחנות שלנו',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'home',
    section: 'hero',
    type: 'text',
    key: 'hero_subtitle',
    label: 'כותרת משנה - עמוד הבית',
    value: 'המקום המושלם למוצרים דיגיטליים',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'home',
    section: 'hero',
    type: 'textarea',
    key: 'hero_description',
    label: 'תיאור - עמוד הבית',
    value: 'גלו את מגוון המוצרים הדיגיטליים שלנו - תבניות, קורסים, כלים ועוד',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'home',
    section: 'hero',
    type: 'text',
    key: 'hero_cta_button',
    label: 'טקסט כפתור - עמוד הבית',
    value: 'גלו עכשיו',
    order: 4,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'home',
    section: 'features',
    type: 'text',
    key: 'features_title',
    label: 'כותרת מאפיינים - עמוד הבית',
    value: 'למה לבחור בנו?',
    order: 5,
    created_date: new Date().toISOString()
  },
  
  // Shop Page Content
  {
    id: uuidv4(),
    page: 'shop',
    section: 'header',
    type: 'text',
    key: 'shop_title',
    label: 'כותרת - חנות',
    value: 'החנות שלנו',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'shop',
    section: 'header',
    type: 'textarea',
    key: 'shop_description',
    label: 'תיאור - חנות',
    value: 'גלו את כל המוצרים הדיגיטליים שלנו',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'shop',
    section: 'filters',
    type: 'text',
    key: 'filter_all',
    label: 'טקסט סינון - הכל',
    value: 'הכל',
    order: 3,
    created_date: new Date().toISOString()
  },
  
  // About Page Content
  {
    id: uuidv4(),
    page: 'about',
    section: 'header',
    type: 'text',
    key: 'about_title',
    label: 'כותרת - אודות',
    value: 'אודותינו',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'about',
    section: 'content',
    type: 'textarea',
    key: 'about_description',
    label: 'תיאור - אודות',
    value: 'אנחנו מתמחים במוצרים דיגיטליים איכותיים',
    order: 2,
    created_date: new Date().toISOString()
  },
  
  // Contact Page Content
  {
    id: uuidv4(),
    page: 'contact',
    section: 'header',
    type: 'text',
    key: 'contact_title',
    label: 'כותרת - צור קשר',
    value: 'צור קשר',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'contact',
    section: 'form',
    type: 'text',
    key: 'contact_name_label',
    label: 'תווית שם - טופס יצירת קשר',
    value: 'שם מלא',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'contact',
    section: 'form',
    type: 'text',
    key: 'contact_email_label',
    label: 'תווית אימייל - טופס יצירת קשר',
    value: 'כתובת אימייל',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'contact',
    section: 'form',
    type: 'text',
    key: 'contact_message_label',
    label: 'תווית הודעה - טופס יצירת קשר',
    value: 'הודעה',
    order: 4,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'contact',
    section: 'form',
    type: 'text',
    key: 'contact_submit_button',
    label: 'כפתור שליחה - טופס יצירת קשר',
    value: 'שלח',
    order: 5,
    created_date: new Date().toISOString()
  },
  
  // Schedule Page Content
  {
    id: uuidv4(),
    page: 'schedule',
    section: 'header',
    type: 'text',
    key: 'schedule_title',
    label: 'כותרת - קביעת פגישה',
    value: 'קבעו פגישה',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'schedule',
    section: 'header',
    type: 'textarea',
    key: 'schedule_description',
    label: 'תיאור - קביעת פגישה',
    value: 'בחרו תאריך ושעה שמתאימים לכם',
    order: 2,
    created_date: new Date().toISOString()
  },
  
  // Deals Page Content
  {
    id: uuidv4(),
    page: 'deals',
    section: 'header',
    type: 'text',
    key: 'deals_title',
    label: 'כותרת - מבצעים',
    value: 'המבצעים שלנו',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'deals',
    section: 'countdown',
    type: 'text',
    key: 'deals_countdown_label',
    label: 'טקסט ספירה לאחור - מבצעים',
    value: 'המבצע מסתיים בעוד',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'deals',
    section: 'bundles',
    type: 'text',
    key: 'deals_bundle_title',
    label: 'כותרת חבילה - מבצעים',
    value: 'קנו חבילה וחסכו עוד יותר',
    order: 3,
    created_date: new Date().toISOString()
  },
  
  // Cart Page Content
  {
    id: uuidv4(),
    page: 'cart',
    section: 'header',
    type: 'text',
    key: 'cart_title',
    label: 'כותרת - עגלת קניות',
    value: 'עגלת הקניות שלך',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'cart',
    section: 'empty',
    type: 'text',
    key: 'cart_empty_message',
    label: 'הודעת עגלה ריקה',
    value: 'העגלה שלך ריקה',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'cart',
    section: 'summary',
    type: 'text',
    key: 'cart_subtotal_label',
    label: 'תווית סכום ביניים',
    value: 'סכום ביניים',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'cart',
    section: 'summary',
    type: 'text',
    key: 'cart_checkout_button',
    label: 'כפתור מעבר לתשלום',
    value: 'המשך לתשלום',
    order: 4,
    created_date: new Date().toISOString()
  },
  
  // Checkout Page Content
  {
    id: uuidv4(),
    page: 'checkout',
    section: 'header',
    type: 'text',
    key: 'checkout_title',
    label: 'כותרת - תשלום',
    value: 'השלמת הזמנה',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'checkout',
    section: 'form',
    type: 'text',
    key: 'checkout_billing_title',
    label: 'כותרת פרטי חיוב',
    value: 'פרטי חיוב',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'checkout',
    section: 'form',
    type: 'text',
    key: 'checkout_payment_button',
    label: 'כפתור תשלום',
    value: 'שלם עכשיו',
    order: 3,
    created_date: new Date().toISOString()
  },
  
  // Footer Content
  {
    id: uuidv4(),
    page: 'global',
    section: 'footer',
    type: 'text',
    key: 'footer_about_title',
    label: 'כותרת אודות - פוטר',
    value: 'אודותינו',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'footer',
    type: 'textarea',
    key: 'footer_about_text',
    label: 'טקסט אודות - פוטר',
    value: 'אנחנו מתמחים במוצרים דיגיטליים איכותיים',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'footer',
    type: 'text',
    key: 'footer_links_title',
    label: 'כותרת קישורים - פוטר',
    value: 'קישורים מהירים',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'footer',
    type: 'text',
    key: 'footer_contact_title',
    label: 'כותרת יצירת קשר - פוטר',
    value: 'צור קשר',
    order: 4,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'footer',
    type: 'text',
    key: 'footer_copyright',
    label: 'זכויות יוצרים - פוטר',
    value: '© 2025 כל הזכויות שמורות',
    order: 5,
    created_date: new Date().toISOString()
  },
  
  // Header Content
  {
    id: uuidv4(),
    page: 'global',
    section: 'header',
    type: 'text',
    key: 'header_login_button',
    label: 'כפתור התחברות - הדר',
    value: 'התחבר',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'header',
    type: 'text',
    key: 'header_schedule_button',
    label: 'כפתור קביעת פגישה - הדר',
    value: 'קבעו פגישה',
    order: 2,
    created_date: new Date().toISOString()
  },
  
  // General UI Content
  {
    id: uuidv4(),
    page: 'global',
    section: 'ui',
    type: 'text',
    key: 'loading_text',
    label: 'טקסט טעינה',
    value: 'טוען...',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'ui',
    type: 'text',
    key: 'error_text',
    label: 'טקסט שגיאה כללי',
    value: 'משהו השתבש, אנא נסה שוב',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'global',
    section: 'ui',
    type: 'text',
    key: 'success_text',
    label: 'טקסט הצלחה כללי',
    value: 'הפעולה בוצעה בהצלחה',
    order: 3,
    created_date: new Date().toISOString()
  },
  
  // Terms of Service Page Content
  {
    id: uuidv4(),
    page: 'terms',
    section: 'header',
    type: 'text',
    key: 'terms_title',
    label: 'כותרת - תנאי שימוש',
    value: 'תנאי שימוש',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'terms',
    section: 'content',
    type: 'textarea',
    key: 'terms_intro',
    label: 'מבוא - תנאי שימוש',
    value: 'ברוכים הבאים לאתר שלנו. השימוש באתר מהווה הסכמה לתנאי השימוש המפורטים להלן.',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'terms',
    section: 'content',
    type: 'html',
    key: 'terms_section_1',
    label: 'סעיף 1 - כללי',
    value: '<h3>1. כללי</h3><p>תנאי שימוש אלה חלים על כל השימושים באתר זה. השימוש באתר מהווה הסכמה מלאה לתנאים אלה.</p>',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'terms',
    section: 'content',
    type: 'html',
    key: 'terms_section_2',
    label: 'סעיף 2 - שימוש במוצרים',
    value: '<h3>2. שימוש במוצרים</h3><p>המוצרים הדיגיטליים המוצעים באתר מיועדים לשימוש אישי בלבד. אין להעתיק, לשכפל או למכור מוצרים אלה.</p>',
    order: 4,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'terms',
    section: 'content',
    type: 'html',
    key: 'terms_section_3',
    label: 'סעיף 3 - קניין רוחני',
    value: '<h3>3. קניין רוחני</h3><p>כל התוכן, העיצוב והמוצרים באתר מוגנים בזכויות יוצרים ושייכים לבעלי האתר.</p>',
    order: 5,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'terms',
    section: 'content',
    type: 'html',
    key: 'terms_section_4',
    label: 'סעיף 4 - הגבלת אחריות',
    value: '<h3>4. הגבלת אחריות</h3><p>האתר והמוצרים ניתנים "כמות שהם" ללא אחריות מכל סוג. בעלי האתר לא יהיו אחראים לכל נזק ישיר או עקיף.</p>',
    order: 6,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'terms',
    section: 'footer',
    type: 'textarea',
    key: 'terms_last_updated',
    label: 'תאריך עדכון אחרון',
    value: 'עדכון אחרון: ינואר 2025',
    order: 7,
    created_date: new Date().toISOString()
  },
  
  // Privacy Policy Page Content
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'header',
    type: 'text',
    key: 'privacy_title',
    label: 'כותרת - מדיניות פרטיות',
    value: 'מדיניות פרטיות',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'textarea',
    key: 'privacy_intro',
    label: 'מבוא - מדיניות פרטיות',
    value: 'אנו מחויבים להגן על פרטיותך. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'html',
    key: 'privacy_section_1',
    label: 'סעיף 1 - איסוף מידע',
    value: '<h3>1. איסוף מידע</h3><p>אנו אוספים מידע שאתה מספק בעת הרשמה, ביצוע רכישה או יצירת קשר איתנו, כולל שם, כתובת דוא"ל, ופרטי תשלום.</p>',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'html',
    key: 'privacy_section_2',
    label: 'סעיף 2 - שימוש במידע',
    value: '<h3>2. שימוש במידע</h3><p>אנו משתמשים במידע שלך לעיבוד הזמנות, שיפור השירות, ושליחת עדכונים רלוונטיים (בהסכמתך).</p>',
    order: 4,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'html',
    key: 'privacy_section_3',
    label: 'סעיף 3 - אבטחת מידע',
    value: '<h3>3. אבטחת מידע</h3><p>אנו משתמשים באמצעי אבטחה מתקדמים כדי להגן על המידע שלך, כולל הצפנה ושרתים מאובטחים.</p>',
    order: 5,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'html',
    key: 'privacy_section_4',
    label: 'סעיף 4 - שיתוף מידע',
    value: '<h3>4. שיתוף מידע עם צדדים שלישיים</h3><p>אנו לא משתפים את המידע האישי שלך עם צדדים שלישיים, למעט כאשר נדרש על פי חוק או לצורך עיבוד תשלומים.</p>',
    order: 6,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'html',
    key: 'privacy_section_5',
    label: 'סעיף 5 - זכויותיך',
    value: '<h3>5. זכויותיך</h3><p>יש לך זכות לגשת למידע שלך, לעדכן אותו, למחוק אותו או להגביל את השימוש בו. צור איתנו קשר לכל בקשה.</p>',
    order: 7,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'content',
    type: 'html',
    key: 'privacy_section_6',
    label: 'סעיף 6 - קובצי Cookie',
    value: '<h3>6. שימוש בקובצי Cookie</h3><p>אנו משתמשים בקובצי Cookie כדי לשפר את חוויית המשתמש, לנתח תנועה באתר ולהתאים אישית תוכן.</p>',
    order: 8,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'privacy',
    section: 'footer',
    type: 'textarea',
    key: 'privacy_last_updated',
    label: 'תאריך עדכון אחרון',
    value: 'עדכון אחרון: ינואר 2025',
    order: 9,
    created_date: new Date().toISOString()
  },
  
  // Refund Policy Page Content
  {
    id: uuidv4(),
    page: 'refund',
    section: 'header',
    type: 'text',
    key: 'refund_title',
    label: 'כותרת - מדיניות ביטולים',
    value: 'מדיניות ביטולים והחזרות',
    order: 1,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'textarea',
    key: 'refund_intro',
    label: 'מבוא - מדיניות ביטולים',
    value: 'אנו שואפים לשביעות רצונך המלאה. מדיניות זו מפרטת את התנאים להחזרות וביטולים.',
    order: 2,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'html',
    key: 'refund_section_1',
    label: 'סעיף 1 - תקופת ביטול',
    value: '<h3>1. תקופת ביטול</h3><p>ניתן לבטל הזמנה תוך 14 ימים מיום הרכישה ולקבל החזר מלא, בכפוף לתנאים.</p>',
    order: 3,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'html',
    key: 'refund_section_2',
    label: 'סעיף 2 - תנאים להחזר',
    value: '<h3>2. תנאים להחזר</h3><p>החזר כספי יינתן רק אם המוצר לא הורד או נעשה בו שימוש. מוצרים דיגיטליים שהורדו אינם זכאים להחזר.</p>',
    order: 4,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'html',
    key: 'refund_section_3',
    label: 'סעיף 3 - תהליך ביטול',
    value: '<h3>3. תהליך ביטול</h3><p>לביטול, צור קשר עם שירות הלקוחות עם פרטי ההזמנה. נטפל בבקשה תוך 5-7 ימי עסקים.</p>',
    order: 5,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'html',
    key: 'refund_section_4',
    label: 'סעיף 4 - זמן החזר',
    value: '<h3>4. זמן החזר כספי</h3><p>לאחר אישור הביטול, הכסף יוחזר לאמצעי התשלום המקורי תוך 7-14 ימי עסקים.</p>',
    order: 6,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'html',
    key: 'refund_section_5',
    label: 'סעיף 5 - מוצרים במבצע',
    value: '<h3>5. מוצרים במבצע</h3><p>מוצרים שנרכשו במחיר מבצע עשויים להיות כפופים למדיניות החזרה מיוחדת, כמפורט בדף המוצר.</p>',
    order: 7,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'content',
    type: 'html',
    key: 'refund_section_6',
    label: 'סעיף 6 - יצירת קשר',
    value: '<h3>6. יצירת קשר</h3><p>לשאלות או בקשות ביטול, צרו קשר בדוא"ל או בטלפון המופיעים בעמוד "צור קשר".</p>',
    order: 8,
    created_date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    page: 'refund',
    section: 'footer',
    type: 'textarea',
    key: 'refund_last_updated',
    label: 'תאריך עדכון אחרון',
    value: 'עדכון אחרון: ינואר 2025',
    order: 9,
    created_date: new Date().toISOString()
  }
];

// Initialize site content if not exists or version mismatch
const SITE_CONTENT_VERSION = '2.0'; // Updated to include Terms, Privacy, Refund pages
const currentVersion = localStorage.getItem('siteContentVersion');

if (!localStorage.getItem('siteContent') || currentVersion !== SITE_CONTENT_VERSION) {
  console.log('🔄 Initializing/Updating site content to version', SITE_CONTENT_VERSION);
  saveToStorage('siteContent', initialSiteContent);
  localStorage.setItem('siteContentVersion', SITE_CONTENT_VERSION);
}

// Policy Pages - Full HTML content for each policy page
const initialPolicyPages = [
  {
    id: 'terms-of-service',
    title: 'תנאי שימוש',
    slug: 'terms',
    content: `<div class="prose max-w-4xl mx-auto">
  <h1>תנאי שימוש</h1>
  
  <p class="lead">ברוכים הבאים לאתר שלנו. השימוש באתר מהווה הסכמה לתנאי השימוש המפורטים להלן.</p>
  
  <h2>1. כללי</h2>
  <p>תנאי שימוש אלה חלים על כל השימושים באתר זה. השימוש באתר מהווה הסכמה מלאה לתנאים אלה. אנו שומרים לעצמנו את הזכות לעדכן תנאים אלה מעת לעת.</p>
  
  <h2>2. שימוש במוצרים</h2>
  <p>המוצרים הדיגיטליים המוצעים באתר מיועדים לשימוש אישי בלבד. אין להעתיק, לשכפל, למכור או להפיץ מוצרים אלה ללא אישור מפורש בכתב.</p>
  
  <h2>3. קניין רוחני</h2>
  <p>כל התוכן, העיצוב, הלוגו, הגרפיקה והמוצרים באתר מוגנים בזכויות יוצרים ושייכים לבעלי האתר. אין לעשות שימוש בתכנים אלה ללא הסכמה מראש.</p>
  
  <h2>4. הגבלת אחריות</h2>
  <p>האתר והמוצרים ניתנים "כמות שהם" ללא אחריות מכל סוג. בעלי האתר לא יהיו אחראים לכל נזק ישיר או עקיף הנובע משימוש באתר או במוצרים.</p>
  
  <h2>5. שינויים בתנאים</h2>
  <p>אנו שומרים לעצמנו את הזכות לשנות תנאים אלה בכל עת. המשך השימוש באתר לאחר עדכון התנאים מהווה הסכמה לתנאים המעודכנים.</p>
  
  <p class="text-sm text-gray-500 mt-8">עדכון אחרון: ינואר 2025</p>
</div>`,
    last_updated: new Date().toISOString()
  },
  {
    id: 'privacy-policy',
    title: 'מדיניות פרטיות',
    slug: 'privacy',
    content: `<div class="prose max-w-4xl mx-auto">
  <h1>מדיניות פרטיות</h1>
  
  <p class="lead">אנו מחויבים להגן על פרטיותך. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.</p>
  
  <h2>1. איסוף מידע</h2>
  <p>אנו אוספים מידע שאתה מספק בעת:</p>
  <ul>
    <li>הרשמה לאתר</li>
    <li>ביצוע רכישה</li>
    <li>יצירת קשר איתנו</li>
    <li>הרשמה לניוזלטר</li>
  </ul>
  <p>המידע שאנו אוספים כולל: שם מלא, כתובת דוא"ל, מספר טלפון, ופרטי תשלום.</p>
  
  <h2>2. שימוש במידע</h2>
  <p>אנו משתמשים במידע שלך לצרכים הבאים:</p>
  <ul>
    <li>עיבוד הזמנות ותשלומים</li>
    <li>שיפור השירות והמוצרים שלנו</li>
    <li>שליחת עדכונים ופרסומות (בהסכמתך)</li>
    <li>מענה לפניות ושירות לקוחות</li>
  </ul>
  
  <h2>3. אבטחת מידע</h2>
  <p>אנו משתמשים באמצעי אבטחה מתקדמים כדי להגן על המידע שלך, כולל:</p>
  <ul>
    <li>הצפנת SSL/TLS</li>
    <li>שרתים מאובטחים</li>
    <li>גישה מוגבלת למידע רגיש</li>
    <li>ניטור אבטחה שוטף</li>
  </ul>
  
  <h2>4. שיתוף מידע עם צדדים שלישיים</h2>
  <p>אנו לא משתפים את המידע האישי שלך עם צדדים שלישיים, למעט:</p>
  <ul>
    <li>כאשר נדרש על פי חוק</li>
    <li>לצורך עיבוד תשלומים (דרך ספקי תשלום מאובטחים)</li>
    <li>בהסכמתך המפורשת</li>
  </ul>
  
  <h2>5. זכויותיך</h2>
  <p>יש לך זכות לגשת למידע האישי שלך, לעדכן אותו, למחוק אותו או להגביל את השימוש בו. צור איתנו קשר לכל בקשה הקשורה למידע האישי שלך.</p>
  
  <h2>6. שימוש בקובצי Cookie</h2>
  <p>אנו משתמשים בקובצי Cookie כדי לשפר את חוויית המשתמש, לנתח תנועה באתר ולהתאים אישית תוכן. אתה יכול לנהל העדפות Cookie בהגדרות הדפדפן שלך.</p>
  
  <h2>7. יצירת קשר</h2>
  <p>לשאלות בנוגע למדיניות פרטיות זו, אנא צור קשר דרך עמוד "צור קשר" באתר.</p>
  
  <p class="text-sm text-gray-500 mt-8">עדכון אחרון: ינואר 2025</p>
</div>`,
    last_updated: new Date().toISOString()
  },
  {
    id: 'refund-policy',
    title: 'מדיניות ביטולים והחזרות',
    slug: 'refund',
    content: `<div class="prose max-w-4xl mx-auto">
  <h1>מדיניות ביטולים והחזרות</h1>
  
  <p class="lead">אנו שואפים לשביעות רצונך המלאה. מדיניות זו מפרטת את התנאים להחזרות וביטולים.</p>
  
  <h2>1. תקופת ביטול</h2>
  <p>ניתן לבטל הזמנה תוך <strong>14 ימים</strong> מיום הרכישה ולקבל החזר מלא, בכפוף לתנאים המפורטים להלן.</p>
  
  <h2>2. תנאים להחזר כספי</h2>
  <p>החזר כספי יינתן רק אם:</p>
  <ul>
    <li>המוצר הדיגיטלי לא הורד</li>
    <li>לא נעשה שימוש במוצר</li>
    <li>הבקשה הוגשה בתוך תקופת הביטול</li>
  </ul>
  <p class="text-red-600"><strong>שימו לב:</strong> מוצרים דיגיטליים שהורדו אינם זכאים להחזר על פי חוק.</p>
  
  <h2>3. תהליך ביטול</h2>
  <p>כדי לבטל הזמנה:</p>
  <ol>
    <li>צור קשר עם שירות הלקוחות דרך עמוד "צור קשר"</li>
    <li>ציין את מספר ההזמנה ואת סיבת הביטול</li>
    <li>נטפל בבקשה תוך 5-7 ימי עסקים</li>
    <li>תקבל אישור בדוא"ל לגבי סטטוס הבקשה</li>
  </ol>
  
  <h2>4. זמן החזר כספי</h2>
  <p>לאחר אישור הביטול, הכסף יוחזר לאמצעי התשלום המקורי תוך:</p>
  <ul>
    <li>כרטיס אשראי: 7-14 ימי עסקים</li>
    <li>PayPal / Bit: 3-5 ימי עסקים</li>
    <li>העברה בנקאית: עד 14 ימי עסקים</li>
  </ul>
  
  <h2>5. מוצרים במבצע</h2>
  <p>מוצרים שנרכשו במחיר מבצע (הנחה של 20% ומעלה) עשויים להיות כפופים למדיניות החזרה מיוחדת. הפרטים יצוינו בדף המוצר ובאישור ההזמנה.</p>
  
  <h2>6. חבילות ומנויים</h2>
  <p>ביטול חבילות או מנויים יהיה אפשרי בהתאם לתנאי החבילה הספציפית. ניתן לבטל מנוי חודשי בכל עת עד 7 ימים לפני החיוב הבא.</p>
  
  <h2>7. החזרים חלקיים</h2>
  <p>במקרים מסוימים, עשוי להינתן החזר חלקי, למשל:</p>
  <ul>
    <li>מוצר שלא עמד בתיאור שניתן באתר</li>
    <li>בעיות טכניות שמנעו גישה למוצר</li>
    <li>החזרה מאושרת של חלק מחבילה</li>
  </ul>
  
  <h2>8. יצירת קשר</h2>
  <p>לשאלות או בקשות ביטול, אנא צרו קשר:</p>
  <ul>
    <li>דרך עמוד "צור קשר" באתר</li>
    <li>בדוא"ל (המופיע בעמוד צור קשר)</li>
    <li>בטלפון בשעות הפעילות</li>
  </ul>
  
  <p class="text-sm text-gray-500 mt-8">עדכון אחרון: ינואר 2025</p>
</div>`,
    last_updated: new Date().toISOString()
  },
  {
    id: 'shipping-policy',
    title: 'מדיניות משלוחים',
    slug: 'shipping',
    content: `<div class="prose max-w-4xl mx-auto">
  <h1>מדיניות משלוחים</h1>
  
  <p class="lead">מדיניות זו מפרטת את תנאי המשלוח, זמני האספקה ועלויות המשלוח של המוצרים באתר.</p>
  
  <h2>1. מוצרים דיגיטליים</h2>
  <p>רוב המוצרים באתר שלנו הם מוצרים דיגיטליים המועברים באופן מיידי:</p>
  <ul>
    <li><strong>זמן אספקה:</strong> מיידי - תוך מספר שניות לאחר אישור התשלום</li>
    <li><strong>אופן אספקה:</strong> קישור להורדה יישלח למייל שלך ויהיה זמין גם בעמוד אישור ההזמנה</li>
    <li><strong>עלות משלוח:</strong> חינם - אין עלות משלוח למוצרים דיגיטליים</li>
    <li><strong>גישה:</strong> גישה בלתי מוגבלת למוצר לאחר הרכישה</li>
  </ul>
  
  <h2>2. מוצרים פיזיים (אם רלוונטי)</h2>
  <p>במידה ויש באתר מוצרים פיזיים, התנאים הבאים חלים:</p>
  
  <h3>2.1. זמני אספקה</h3>
  <ul>
    <li><strong>איסוף עצמי:</strong> ניתן לתאם איסוף תוך 24-48 שעות</li>
    <li><strong>משלוח רגיל:</strong> 3-7 ימי עסקים בתוך הארץ</li>
    <li><strong>משלוח מהיר:</strong> 1-3 ימי עסקים (בתוספת תשלום)</li>
    <li><strong>משלוח לחו"ל:</strong> 7-21 ימי עסקים (בהתאם ליעד)</li>
  </ul>
  
  <h3>2.2. עלויות משלוח</h3>
  <table class="min-w-full border">
    <thead>
      <tr class="bg-gray-100">
        <th class="border p-2">סוג משלוח</th>
        <th class="border p-2">עלות</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border p-2">משלוח רגיל בארץ</td>
        <td class="border p-2">₪30</td>
      </tr>
      <tr>
        <td class="border p-2">משלוח מהיר בארץ</td>
        <td class="border p-2">₪50</td>
      </tr>
      <tr>
        <td class="border p-2">הזמנה מעל ₪300</td>
        <td class="border p-2">חינם!</td>
      </tr>
      <tr>
        <td class="border p-2">איסוף עצמי</td>
        <td class="border p-2">חינם</td>
      </tr>
    </tbody>
  </table>
  
  <h2>3. תהליך המשלוח</h2>
  <ol>
    <li><strong>אישור הזמנה:</strong> תקבל מייל עם אישור ההזמנה מיד לאחר התשלום</li>
    <li><strong>עיבוד:</strong> ההזמנה תעובד תוך 1-2 ימי עסקים</li>
    <li><strong>משלוח:</strong> תקבל מספר מעקב (tracking) במייל</li>
    <li><strong>אספקה:</strong> המוצר יגיע לפי זמני האספקה שצוינו</li>
  </ol>
  
  <h2>4. מעקב אחר משלוח</h2>
  <p>לאחר שליחת המוצר, תקבל:</p>
  <ul>
    <li>מספר מעקב (tracking number)</li>
    <li>קישור למעקב במייל</li>
    <li>עדכונים אוטומטיים על סטטוס המשלוח</li>
  </ul>
  
  <h2>5. בעיות במשלוח</h2>
  <p>במקרה של בעיה במשלוח:</p>
  <ul>
    <li><strong>חבילה לא הגיעה:</strong> צור קשר תוך 3 ימים ממועד האספקה המשוער</li>
    <li><strong>חבילה פגומה:</strong> דווח תוך 24 שעות מקבלת החבילה</li>
    <li><strong>כתובת שגויה:</strong> ניתן לעדכן כתובת עד 24 שעות לאחר ההזמנה</li>
  </ul>
  
  <h2>6. איזורי חלוקה</h2>
  <p>אנו משלחים למרבית האיזורים בארץ. יש להתייעץ איתנו לגבי:</p>
  <ul>
    <li>אזורים מרוחקים</li>
    <li>יישובים מעבר לקו הירוק</li>
    <li>כתובות מיוחדות (בסיסים צבאיים, אזורי פיתוח וכו')</li>
  </ul>
  
  <h2>7. משלוחים בחגים</h2>
  <p>בתקופות חגים ומבצעים, זמני המשלוח עשויים להתארך ב-2-3 ימי עסקים נוספים. נעדכן אתכם במידת הצורך.</p>
  
  <h2>8. יצירת קשר</h2>
  <p>לשאלות נוספות בנוגע למשלוחים:</p>
  <ul>
    <li>דרך עמוד "צור קשר" באתר</li>
    <li>בדוא"ל (המופיע בעמוד צור קשר)</li>
    <li>בטלפון בשעות הפעילות</li>
  </ul>
  
  <p class="text-sm text-gray-500 mt-8">עדכון אחרון: ינואר 2025</p>
</div>`,
    last_updated: new Date().toISOString()
  }
];

// Initialize policy pages if not exists - force update to include shipping policy
const POLICY_VERSION = '1.1'; // Added shipping policy
const currentPolicyVersion = localStorage.getItem('policyPagesVersion');

if (!localStorage.getItem('policyPages') || currentPolicyVersion !== POLICY_VERSION) {
  console.log('🔄 Initializing/Updating policy pages to version', POLICY_VERSION);
  saveToStorage('policyPages', initialPolicyPages);
  localStorage.setItem('policyPagesVersion', POLICY_VERSION);
  console.log('✅ Policy pages initialized:', initialPolicyPages.length, 'pages');
} else {
  console.log('✅ Policy pages already exist in localStorage (version', POLICY_VERSION + ')');
}

// Initial products data
const initialProducts = [
  {
    id: '1',
    title: 'תבנית פיתוח קורס מקוון מקיף',
    description: 'תבנית מלאה לתכנון ובניית קורס דיגיטלי מקצועי',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    is_active: true,
    featured: true,
    is_digital: true,
    category: 'templates',
    stock: 999,
    created_date: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    title: 'צ\'קליסט להטמעת AI בארגון',
    description: 'מדריך שלב-אחר-שלב להטמעת כלי AI בתהליכי הדרכה',
    price: 199,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    is_active: true,
    featured: true,
    is_digital: true,
    category: 'checklists',
    stock: 999,
    created_date: new Date('2024-02-20').toISOString()
  },
  {
    id: '3',
    title: 'קורס AI לאנשי הדרכה',
    description: 'קורס מקוון מלא על שימוש ב-AI בעולם ההדרכה',
    price: 799,
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    is_active: true,
    featured: false,
    bestseller: true,
    is_digital: true,
    category: 'courses',
    stock: 999,
    created_date: new Date('2024-01-10').toISOString()
  },
  {
    id: '4',
    title: 'חבילת תבניות הדרכה - 10 תבניות',
    description: 'אוסף של 10 תבניות מקצועיות לתכנון הדרכות',
    price: 499,
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    is_active: true,
    featured: true,
    is_digital: true,
    category: 'bundles',
    stock: 999,
    created_date: new Date('2024-03-01').toISOString()
  }
];

// Initialize products if not exists
if (!localStorage.getItem('products')) {
  saveToStorage('products', initialProducts);
}

// Mock Product API
export const ProductAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return getFromStorage('products', initialProducts);
  },
  
  list: async (sortBy) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let products = getFromStorage('products', initialProducts);
    
    // Sort if needed
    if (sortBy === '-created_date') {
      products = products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return products;
  },
  
  filter: async (filters = {}, sortBy) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let products = getFromStorage('products', initialProducts);
    
    if (filters.is_active !== undefined) {
      products = products.filter(p => p.is_active === filters.is_active);
    }
    if (filters.featured !== undefined) {
      products = products.filter(p => p.featured === filters.featured);
    }
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    // Sort if needed
    if (sortBy === '-created_date') {
      products = products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return products;
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getFromStorage('products', initialProducts);
    return products.find(p => p.id === id);
  },
  
  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getFromStorage('products', initialProducts);
    const newProduct = {
      id: uuidv4(),
      ...data,
      created_date: new Date().toISOString()
    };
    products.push(newProduct);
    saveToStorage('products', products);
    return newProduct;
  },
  
  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getFromStorage('products', initialProducts);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      saveToStorage('products', products);
      return products[index];
    }
    throw new Error('Product not found');
  },
  
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getFromStorage('products', initialProducts);
    const filtered = products.filter(p => p.id !== id);
    saveToStorage('products', filtered);
    return { success: true };
  }
};

// Mock User API
export const UserAPI = {
  currentUser: null,
  
  list: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getFromStorage('users', []);
  },
  
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simple mock - in production use real authentication
    const users = getFromStorage('users', []);
    const user = users.find(u => u.email === credentials.email);
    
    if (user && user.password === credentials.password) {
      UserAPI.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getFromStorage('users', []);
    
    // Check if user exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    
    // Special handling for admin email
    const isAdminEmail = userData.email === 'snirfain@gmail.com';
    
    const newUser = {
      id: uuidv4(),
      ...userData,
      role: isAdminEmail ? 'admin' : 'user',
      created_date: new Date().toISOString()
    };
    
    users.push(newUser);
    saveToStorage('users', users);
    UserAPI.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  },
  
  me: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = localStorage.getItem('currentUser');
    if (user) {
      UserAPI.currentUser = JSON.parse(user);
      return UserAPI.currentUser;
    }
    throw new Error('Not authenticated');
  },
  
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    UserAPI.currentUser = null;
    localStorage.removeItem('currentUser');
    return { success: true };
  },
  
  updateProfile: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!UserAPI.currentUser) throw new Error('Not authenticated');
    
    const users = getFromStorage('users', []);
    const index = users.findIndex(u => u.id === UserAPI.currentUser.id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      saveToStorage('users', users);
      UserAPI.currentUser = users[index];
      localStorage.setItem('currentUser', JSON.stringify(users[index]));
      return users[index];
    }
    throw new Error('User not found');
  }
};

// Email API with Resend integration
export const EmailAPI = {
  send: async (emailData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if we have Resend API key
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log('📧 Mock Email Sent (no Resend API key):', emailData);
      return { success: true, message: 'Email sent successfully (mock mode)' };
    }
    
    try {
      console.log('📧 Sending real email via Resend to:', emailData.to);
      
      // Import Resend dynamically
      const { sendOrderConfirmation } = await import('./emailService.js');
      
      // Send real email via Resend
      const result = await sendOrderConfirmation(emailData.data);
      
      console.log('✅ Real email sent via Resend:', result);
      return { success: true, message: 'Email sent successfully via Resend' };
      
    } catch (error) {
      console.error('❌ Resend email failed, falling back to mock:', error);
      console.log('📧 Mock Email Sent (Resend failed):', emailData);
      return { success: true, message: 'Email sent successfully (mock mode - Resend failed)' };
    }
  }
};

// Initialize default coupons if none exist
const initializeCoupons = () => {
  const existingCoupons = getFromStorage('coupons', []);
  console.log('🔍 Existing coupons:', existingCoupons);
  
  if (existingCoupons.length === 0) {
    console.log('🎫 No coupons found, initializing default coupons...');
    const defaultCoupons = [
      {
        id: 'test10',
        code: 'TEST10',
        discount_type: 'percentage',
        discount_value: 10,
        description: '10% הנחה',
        active: true,
        created_date: new Date().toISOString()
      },
      {
        id: 'save20',
        code: 'SAVE20',
        discount_type: 'percentage',
        discount_value: 20,
        description: '20% הנחה',
        active: true,
        created_date: new Date().toISOString()
      },
      {
        id: 'welcome',
        code: 'WELCOME',
        discount_type: 'percentage',
        discount_value: 15,
        description: '15% הנחה ללקוחות חדשים',
        active: true,
        created_date: new Date().toISOString()
      }
    ];
    saveToStorage('coupons', defaultCoupons);
    console.log('🎫 Default coupons initialized:', defaultCoupons.map(c => c.code).join(', '));
  }
};

// Initialize coupons on load
initializeCoupons();

// Mock Coupon API
export const CouponAPI = {
  create: async (couponData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const coupons = getFromStorage('coupons', []);
    const newCoupon = {
      id: uuidv4(),
      ...couponData,
      created_date: new Date().toISOString()
    };
    coupons.push(newCoupon);
    saveToStorage('coupons', coupons);
    return newCoupon;
  },

  list: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getFromStorage('coupons', []);
  },

  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getFromStorage('coupons', []);
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const coupons = getFromStorage('coupons', []);
    const index = coupons.findIndex(c => c.id === id);
    if (index !== -1) {
      coupons[index] = { ...coupons[index], ...data };
      saveToStorage('coupons', coupons);
      return coupons[index];
    }
    throw new Error('Coupon not found');
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const coupons = getFromStorage('coupons', []);
    const filtered = coupons.filter(c => c.id !== id);
    saveToStorage('coupons', filtered);
    return { success: true };
  },

  validate: async (code) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const coupons = getFromStorage('coupons', []);
    console.log('🔍 All coupons in storage:', coupons);
    console.log('🔍 Looking for code:', code);
    
    const coupon = coupons.find(c => c.code === code && c.active);
    console.log('🎫 Found coupon:', coupon);
    
    if (!coupon) return null;
    
    // Check expiry
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      console.log('⏰ Coupon expired');
      return null;
    }
    
    return coupon;
  }
};

// Mock Orders API
export const OrderAPI = {
  create: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const orders = getFromStorage('orders', []);
    const newOrder = {
      id: uuidv4(),
      ...orderData,
      status: orderData.status || 'completed',
      created_date: new Date().toISOString()
    };
    orders.push(newOrder);
    saveToStorage('orders', orders);
    return newOrder;
  },
  
  list: async (sortBy) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let orders = getFromStorage('orders', []);
    
    if (sortBy === '-created_date') {
      orders = orders.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return orders;
  },
  
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getFromStorage('orders', []);
  },
  
  getUserOrders: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const orders = getFromStorage('orders', []);
    return orders.filter(o => o.userId === userId);
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const orders = getFromStorage('orders', []);
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...data };
      saveToStorage('orders', orders);
      return orders[index];
    }
    throw new Error('Order not found');
  },

  filter: async (filters, sortBy) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let orders = getFromStorage('orders', []);
    
    // Filter by customer_email if provided
    if (filters.customer_email) {
      orders = orders.filter(o => o.customer_email === filters.customer_email);
    }
    
    // Sort if requested
    if (sortBy === '-created_date') {
      orders = orders.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return orders;
  }
};

// Mock AI API
export const AIAPI = {
  chat: async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple rule-based responses
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('מוצר') || lowerMessage.includes('קורס') || lowerMessage.includes('תבנית')) {
      return 'אנחנו מציעים מגוון רחב של תבניות, קורסים וצ\'קליסטים בתחום ההדרכה וה-AI. המוצרים הפופולריים ביותר שלנו הם תבניות פיתוח קורסים והצ\'קליסט להטמעת AI. איזה תחום מעניין אותך?';
    }
    
    if (lowerMessage.includes('מחיר') || lowerMessage.includes('כמה')) {
      return 'המחירים שלנו נעים בין ₪199 לתבניות בודדות ועד ₪799 לקורסים מלאים. יש לנו גם חבילות במחירים מיוחדים. מה תרצה לדעת עוד?';
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('בינה')) {
      return 'אנחנו מתמחים בהטמעת AI בתהליכי הדרכה וחינוך. יש לנו קורסים, תבניות וצ\'קליסטים שיעזרו לך להתחיל. מומלץ להתחיל עם הצ\'קליסט להטמעת AI בארגון.';
    }
    
    return 'תודה על השאלה! אני כאן לעזור. אתה יכול לשאול אותי על המוצרים שלנו, המחירים, או על תהליך הרכישה. איך אוכל לעזור?';
  }
};

// Initial FAQ Data
const initialFAQData = [
  // כללי
  {
    id: 'faq-general-1',
    category: 'general',
    categoryTitle: 'שאלות כלליות',
    question: 'אילו סוגי מוצרים ניתן לרכוש באתר?',
    answer: 'באתר ניתן לרכוש מוצרים דיגיטליים בלבד – תבניות, מסמכי PDF, קורסים מוקלטים, ספרים דיגיטליים, חומרי הדרכה, וקבצי מדיה שונים.',
    order: 1
  },
  {
    id: 'faq-general-2',
    category: 'general',
    categoryTitle: 'שאלות כלליות',
    question: 'האם אקבל מוצר פיזי בדואר?',
    answer: 'לא. כל המוצרים מסופקים בצורה דיגיטלית בלבד ואין משלוחים פיזיים.',
    order: 2
  },
  {
    id: 'faq-general-3',
    category: 'general',
    categoryTitle: 'שאלות כלליות',
    question: 'כמה זמן לוקח לקבל את המוצר לאחר רכישה?',
    answer: 'המוצר נמסר באופן מיידי – בדרך כלל תוך 1–5 דקות מאישור התשלום, ובמקרים חריגים עד 30 דקות.',
    order: 3
  },
  {
    id: 'faq-general-4',
    category: 'general',
    categoryTitle: 'שאלות כלליות',
    question: 'האם יש תמיכה טכנית במקרה של בעיות?',
    answer: 'כן. שירות הלקוחות זמין בימים א\'-ה\' בין השעות 09:00–18:00 בטלפון או בדוא"ל, ומספק פתרונות מהירים לכל בעיה.',
    order: 4
  },
  {
    id: 'faq-general-5',
    category: 'general',
    categoryTitle: 'שאלות כלליות',
    question: 'האם ניתן לרכוש מהאתר מכל מקום בעולם?',
    answer: 'כן. כל עוד יש לך גישה לאינטרנט ואמצעי תשלום נתמך, ניתן לרכוש ולהוריד את המוצרים מכל מדינה.',
    order: 5
  },
  // תנאים
  {
    id: 'faq-terms-1',
    category: 'terms',
    categoryTitle: 'תנאי שימוש',
    question: 'מה המשמעות של ביצוע רכישה באתר?',
    answer: 'רכישה באתר מהווה הסכמה מלאה למדיניות האתר – כולל פרטיות, החזרים ומשלוחים.',
    order: 1
  },
  {
    id: 'faq-terms-2',
    category: 'terms',
    categoryTitle: 'תנאי שימוש',
    question: 'האם ניתן להשתמש במוצרים שרכשתי לכל מטרה?',
    answer: 'לא. המוצרים ניתנים לשימוש אישי בלבד, אלא אם צוין אחרת בדף המוצר.',
    order: 2
  },
  {
    id: 'faq-terms-3',
    category: 'terms',
    categoryTitle: 'תנאי שימוש',
    question: 'מה האחריות שלי כקונה לפני הרכישה?',
    answer: 'עליך לקרוא היטב את תיאור המוצר, דרישות המערכת, מגבלות השימוש ותקופת ההורדה לפני רכישה.',
    order: 3
  },
  {
    id: 'faq-terms-4',
    category: 'terms',
    categoryTitle: 'תנאי שימוש',
    question: 'האם ניתן להעביר את המוצרים שרכשתי לאדם אחר?',
    answer: 'לא. הרישיון הוא אישי בלבד והמוצרים אינם ניתנים להעברה.',
    order: 4
  },
  {
    id: 'faq-terms-5',
    category: 'terms',
    categoryTitle: 'תנאי שימוש',
    question: 'האם החברה יכולה לשנות את המדיניות?',
    answer: 'כן. החברה רשאית לעדכן את מדיניות האתר מעת לעת. עדכון מהותי יתפרסם באתר ויכלול תאריך "עדכון אחרון".',
    order: 5
  },
  // פרטיות
  {
    id: 'faq-privacy-1',
    category: 'privacy',
    categoryTitle: 'פרטיות ואבטחה',
    question: 'איזה מידע אישי אתם אוספים עליי?',
    answer: 'אנו אוספים מידע שנמסר על ידך ישירות (שם, אימייל, טלפון, סיסמה), מידע בעת רכישה (פרטי חיוב והיסטוריית רכישות), וכן מידע טכני בעת השימוש באתר (IP, סוג מכשיר, מיקום כללי).',
    order: 1
  },
  {
    id: 'faq-privacy-2',
    category: 'privacy',
    categoryTitle: 'פרטיות ואבטחה',
    question: 'האם המידע שלי מאובטח?',
    answer: 'כן. אנו משתמשים באמצעי אבטחה מתקדמים כגון SSL/TLS, הצפנת סיסמאות, חומות אש וגיבויים קבועים.',
    order: 2
  },
  {
    id: 'faq-privacy-3',
    category: 'privacy',
    categoryTitle: 'פרטיות ואבטחה',
    question: 'האם המידע שלי נמכר לצדדים שלישיים?',
    answer: 'לא. אנו משתפים מידע רק עם ספקי שירות חיוניים לצורך הפעלת האתר (כגון סליקה, אחסון, דיוור), ולא למטרות מכירה.',
    order: 3
  },
  {
    id: 'faq-privacy-4',
    category: 'privacy',
    categoryTitle: 'פרטיות ואבטחה',
    question: 'אילו זכויות יש לי לגבי המידע שלי?',
    answer: 'יש לך זכויות לעיין, לעדכן, למחוק, להגביל עיבוד, להתנגד לשיווק ולקבל את המידע שלך בפורמט נייד.',
    order: 4
  },
  {
    id: 'faq-privacy-5',
    category: 'privacy',
    categoryTitle: 'פרטיות ואבטחה',
    question: 'איך אני מפעיל את זכויותיי?',
    answer: 'ניתן לפנות במייל או בטלפון לחברה, ואנו מחויבים להשיב תוך 30 ימים.',
    order: 5
  },
  // החזרים
  {
    id: 'faq-refund-1',
    category: 'refund',
    categoryTitle: 'החזרים וביטולים',
    question: 'האם ניתן לבטל רכישה?',
    answer: 'לא. כל המכירות באתר הן סופיות בשל אופי המוצרים הדיגיטליים.',
    order: 1
  },
  {
    id: 'faq-refund-2',
    category: 'refund',
    categoryTitle: 'החזרים וביטולים',
    question: 'באילו מקרים ניתן לבקש החזר חריג?',
    answer: 'החזר יישקל במקרה של תקלה טכנית חמורה, חיוב כפול, רכישה לא מורשית או אי-התאמה מהותית בין התיאור למוצר.',
    order: 2
  },
  {
    id: 'faq-refund-3',
    category: 'refund',
    categoryTitle: 'החזרים וביטולים',
    question: 'תוך כמה זמן ניתן להגיש בקשה להחזר?',
    answer: 'יש להגיש בקשה עד 7 ימים ממועד הרכישה, בצירוף פרטי הזמנה והוכחות.',
    order: 3
  },
  {
    id: 'faq-refund-4',
    category: 'refund',
    categoryTitle: 'החזרים וביטולים',
    question: 'איך מגישים בקשה להחזר?',
    answer: 'יש לפנות במייל או בטלפון עם מספר הזמנה, תיאור הבעיה וראיות תומכות (כגון צילומי מסך).',
    order: 4
  },
  {
    id: 'faq-refund-5',
    category: 'refund',
    categoryTitle: 'החזרים וביטולים',
    question: 'האם החזרים הם מלאים או חלקיים?',
    answer: 'החזרים, אם אושרו, הם מלאים בלבד.',
    order: 5
  },
  {
    id: 'faq-refund-6',
    category: 'refund',
    categoryTitle: 'החזרים וביטולים',
    question: 'מה לא מזכה בהחזר?',
    answer: 'שינוי דעה, העדפות אישיות, בעיות טכניות בצד הלקוח או חוסר ידע בשימוש במוצר אינם מהווים עילה להחזר.',
    order: 6
  },
  // משלוח
  {
    id: 'faq-shipping-1',
    category: 'shipping',
    categoryTitle: 'משלוח והורדה',
    question: 'איך אני מקבל את המוצרים שרכשתי?',
    answer: 'המוצרים נשלחים אליך בדוא"ל עם קישורי הורדה, וזמינים גם באזור האישי באתר.',
    order: 1
  },
  {
    id: 'faq-shipping-2',
    category: 'shipping',
    categoryTitle: 'משלוח והורדה',
    question: 'האם יש עלויות משלוח?',
    answer: 'לא. כל המוצרים דיגיטליים ואין עלויות נוספות מעבר למחיר המוצר.',
    order: 2
  },
  {
    id: 'faq-shipping-3',
    category: 'shipping',
    categoryTitle: 'משלוח והורדה',
    question: 'כמה פעמים ניתן להוריד את המוצר?',
    answer: 'לכל מוצר יש מספר מוגדר של הורדות ותקופת זמינות (לפחות 30 ימים), כפי שמפורט בדף המוצר.',
    order: 3
  },
  {
    id: 'faq-shipping-4',
    category: 'shipping',
    categoryTitle: 'משלוח והורדה',
    question: 'מה קורה אם לא קיבלתי את המייל עם הקישור?',
    answer: 'יש לבדוק תיקיית ספאם או להתחבר לאזור האישי באתר. אם עדיין אין גישה, ניתן ליצור קשר עם התמיכה.',
    order: 4
  },
  {
    id: 'faq-shipping-5',
    category: 'shipping',
    categoryTitle: 'משלוח והורדה',
    question: 'האם המוצרים נגישים גם בסמארטפון או טאבלט?',
    answer: 'כן. ניתן להוריד את המוצרים מכל מכשיר עם גישה לאינטרנט.',
    order: 5
  },
  // רכישה
  {
    id: 'faq-purchase-1',
    category: 'purchase',
    categoryTitle: 'רכישה ותשלום',
    question: 'אילו אמצעי תשלום זמינים באתר?',
    answer: 'ניתן לשלם באמצעות כרטיסי אשראי, Bit, Paybox ושירותי סליקה מאובטחים.',
    order: 1
  },
  {
    id: 'faq-purchase-2',
    category: 'purchase',
    categoryTitle: 'רכישה ותשלום',
    question: 'איך אדע שהרכישה שלי הצליחה?',
    answer: 'לאחר התשלום יוצג מסך אישור ותישלח אליך הודעת אימייל עם פרטי ההזמנה וקישורי הורדה.',
    order: 2
  },
  {
    id: 'faq-purchase-3',
    category: 'purchase',
    categoryTitle: 'רכישה ותשלום',
    question: 'האם פרטי האשראי שלי נשמרים באתר?',
    answer: 'לא. התשלומים מתבצעים באמצעות ספקי סליקה חיצוניים מאובטחים, ואיננו שומרים את פרטי הכרטיס.',
    order: 3
  },
  {
    id: 'faq-purchase-4',
    category: 'purchase',
    categoryTitle: 'רכישה ותשלום',
    question: 'האם יש הגבלת זמן לגישה למוצרים?',
    answer: 'כן. כל מוצר מוגבל לתקופת זמינות ומספר הורדות, כפי שמצוין בדף המוצר.',
    order: 4
  },
  {
    id: 'faq-purchase-5',
    category: 'purchase',
    categoryTitle: 'רכישה ותשלום',
    question: 'האם ניתן לקבל חשבונית מס/קבלה?',
    answer: 'כן. לכל רכישה נשלחת חשבונית מס/קבלה לכתובת הדוא"ל שסיפקת בעת הרכישה.',
    order: 5
  }
];

// Initialize FAQ if not exists
if (!localStorage.getItem('faqData')) {
  console.log('🔄 Initializing FAQ data...');
  saveToStorage('faqData', initialFAQData);
  console.log('✅ FAQ data initialized:', initialFAQData.length, 'questions');
}

// Mock FAQ API
export const FAQAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getFromStorage('faqData', initialFAQData);
  },
  
  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const faqs = getFromStorage('faqData', initialFAQData);
    return faqs.filter(f => f.category === category);
  },
  
  create: async (faqData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const faqs = getFromStorage('faqData', initialFAQData);
    const newFAQ = {
      ...faqData,
      id: `faq-${Date.now()}`,
      order: faqData.order || faqs.filter(f => f.category === faqData.category).length + 1
    };
    faqs.push(newFAQ);
    saveToStorage('faqData', faqs);
    return newFAQ;
  },
  
  update: async (id, faqData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const faqs = getFromStorage('faqData', initialFAQData);
    const index = faqs.findIndex(f => f.id === id);
    if (index !== -1) {
      faqs[index] = { ...faqs[index], ...faqData };
      saveToStorage('faqData', faqs);
      return faqs[index];
    }
    return null;
  },
  
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const faqs = getFromStorage('faqData', initialFAQData);
    const filtered = faqs.filter(f => f.id !== id);
    saveToStorage('faqData', filtered);
    return { success: true };
  }
};

// Mock Policy Pages API
export const PolicyPagesAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const pages = getFromStorage('policyPages', initialPolicyPages);
    console.log('📄 PolicyPagesAPI.getAll() returning:', pages.length, 'pages');
    return pages;
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const pages = getFromStorage('policyPages', initialPolicyPages);
    return pages.find(p => p.id === id);
  },
  
  getBySlug: async (slug) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const pages = getFromStorage('policyPages', initialPolicyPages);
    return pages.find(p => p.slug === slug);
  },
  
  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const pages = getFromStorage('policyPages', initialPolicyPages);
    const index = pages.findIndex(p => p.id === id);
    
    if (index !== -1) {
      pages[index] = { 
        ...pages[index], 
        ...data,
        last_updated: new Date().toISOString()
      };
      saveToStorage('policyPages', pages);
      return pages[index];
    }
    throw new Error('Policy page not found');
  }
};

// Mock Site Content API
export const SiteContentAPI = {
  list: async (sortBy) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let content = getFromStorage('siteContent', initialSiteContent);
    
    // Sort by order by default, or by created_date if specified
    if (sortBy === 'order' || !sortBy) {
      content = content.sort((a, b) => a.order - b.order);
    } else if (sortBy === '-created_date') {
      content = content.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return content;
  },
  
  filter: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let content = getFromStorage('siteContent', initialSiteContent);
    
    // Filter by page
    if (filters.page) {
      content = content.filter(c => c.page === filters.page);
    }
    
    // Filter by section
    if (filters.section) {
      content = content.filter(c => c.section === filters.section);
    }
    
    // Filter by type
    if (filters.type) {
      content = content.filter(c => c.type === filters.type);
    }
    
    // Filter by key
    if (filters.key) {
      content = content.filter(c => c.key === filters.key);
    }
    
    // Sort by order
    content = content.sort((a, b) => a.order - b.order);
    
    return content;
  },
  
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getFromStorage('siteContent', initialSiteContent);
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    return content.find(c => c.id === id);
  },
  
  getByKey: async (key) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    return content.find(c => c.key === key);
  },
  
  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    
    // Find the highest order number for this page/section
    const samePageSection = content.filter(c => c.page === data.page && c.section === data.section);
    const maxOrder = samePageSection.length > 0 ? Math.max(...samePageSection.map(c => c.order)) : 0;
    
    const newContent = {
      id: uuidv4(),
      ...data,
      order: data.order || maxOrder + 1,
      created_date: new Date().toISOString()
    };
    
    content.push(newContent);
    saveToStorage('siteContent', content);
    return newContent;
  },
  
  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    const index = content.findIndex(c => c.id === id);
    
    if (index !== -1) {
      content[index] = { ...content[index], ...data };
      saveToStorage('siteContent', content);
      return content[index];
    }
    throw new Error('Content not found');
  },
  
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    const filtered = content.filter(c => c.id !== id);
    saveToStorage('siteContent', filtered);
    return { success: true };
  },
  
  // Get all unique pages
  getPages: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    const pages = [...new Set(content.map(c => c.page))];
    return pages.sort();
  },
  
  // Get all unique sections for a page
  getSections: async (page) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    const sections = [...new Set(content.filter(c => c.page === page).map(c => c.section))];
    return sections.sort();
  },
  
  // Get all content for a specific page
  getPageContent: async (page) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = getFromStorage('siteContent', initialSiteContent);
    return content.filter(c => c.page === page).sort((a, b) => a.order - b.order);
  }
};

