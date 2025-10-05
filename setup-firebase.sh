#!/bin/bash

echo "🔥 Firebase Setup Helper"
echo "========================"
echo ""
echo "קובץ זה יעזור לך ליצור את קובץ .env"
echo ""

if [ -f ".env" ]; then
    echo "⚠️  קובץ .env כבר קיים!"
    read -p "האם להחליף אותו? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "ביטול..."
        exit 0
    fi
fi

echo "נא להזין את הפרטים מ-Firebase Console:"
echo ""

read -p "API Key: " api_key
read -p "Auth Domain: " auth_domain
read -p "Project ID: " project_id
read -p "Storage Bucket: " storage_bucket
read -p "Messaging Sender ID: " sender_id
read -p "App ID: " app_id

cat > .env << EOL
# Firebase Configuration
VITE_FIREBASE_API_KEY=$api_key
VITE_FIREBASE_AUTH_DOMAIN=$auth_domain
VITE_FIREBASE_PROJECT_ID=$project_id
VITE_FIREBASE_STORAGE_BUCKET=$storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=$sender_id
VITE_FIREBASE_APP_ID=$app_id
EOL

echo ""
echo "✅ קובץ .env נוצר בהצלחה!"
echo "עכשיו תוכל להריץ: npm run dev"
