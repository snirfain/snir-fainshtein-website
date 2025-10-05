import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page meta tags
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords (comma-separated)
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - Open Graph type (website, article, etc.)
 */
const SEO = ({
  title = 'שניר פיינשטיין - מומחה AI והדרכה',
  description = 'מומחה למידה וטכנולוגיה, מתמחה בהטמעת AI בארגונים ומוסדות חינוך. כלים מוכחים, תבניות מקצוענות וייעוץ אישי.',
  keywords = 'AI, בינה מלאכותית, הדרכה, למידה ארגונית, חדשנות, חינוך, קורסים, ייעוץ',
  image = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/592c3d_Asset2.png',
  url = window.location.href,
  type = 'website',
}) => {
  const fullTitle = title.includes('שניר פיינשטיין') ? title : `${title} | שניר פיינשטיין`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="שניר פיינשטיין" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:site_name" content="שניר פיינשטיין" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Hebrew" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

export default SEO;

