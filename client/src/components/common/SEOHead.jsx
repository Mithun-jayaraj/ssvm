import { useEffect } from 'react';
import { SITE_CONFIG } from '../../utils/seoConfig';

/**
 * Update or create an HTML head meta element
 */
const setMetaTag = (attributeName, attributeValue, content) => {
  if (typeof document === 'undefined') return;
  if (!content) return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Update or create an HTML head link element (e.g. canonical)
 */
const setLinkTag = (rel, href) => {
  if (typeof document === 'undefined') return;
  if (!href) return;

  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

/**
 * Inject or update Schema.org JSON-LD structured data
 */
const setJsonLd = (schemaData, scriptId = 'ssvm-structured-data') => {
  if (typeof document === 'undefined') return;

  const existingScript = document.getElementById(scriptId);
  if (!schemaData) {
    if (existingScript) existingScript.remove();
    return;
  }

  const jsonString = typeof schemaData === 'string' ? schemaData : JSON.stringify(schemaData, null, 2);

  if (existingScript) {
    existingScript.textContent = jsonString;
  } else {
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = jsonString;
    document.head.appendChild(script);
  }
};

/**
 * Production SEO Head Manager for Sri Shakthi Vinayaga Metals
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  noindex = false,
  schema = null,
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const baseTitle = SITE_CONFIG.name;
    const finalTitle = title ? (title.includes(baseTitle) ? title : `${title} | ${baseTitle}`) : `${baseTitle} | Temple Metal Products Manufacturer`;

    // 1. Document Title
    document.title = finalTitle;

    // 2. Standard Meta Tags
    setMetaTag('name', 'title', finalTitle);
    if (description) {
      setMetaTag('name', 'description', description);
    }
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag('name', 'author', SITE_CONFIG.name);

    // Robots meta directive
    const robotsContent = noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsContent);
    setMetaTag('name', 'googlebot', robotsContent);

    // 3. Canonical URL
    const siteUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');
    let canonicalUrl = siteUrl;
    if (canonical) {
      canonicalUrl = canonical.startsWith('http')
        ? canonical
        : `${siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`;
    }
    setLinkTag('canonical', canonicalUrl);

    // 4. Open Graph Tags
    const fullImageUrl = image
      ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`)
      : `${siteUrl}${SITE_CONFIG.defaultImage}`;

    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', finalTitle);
    if (description) {
      setMetaTag('property', 'og:description', description);
    }
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:site_name', SITE_CONFIG.name);
    setMetaTag('property', 'og:locale', 'en_IN');
    setMetaTag('property', 'og:locale:alternate', 'ta_IN');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    if (description) {
      setMetaTag('name', 'twitter:description', description);
    }
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // 6. Structured Data (Schema.org JSON-LD)
    if (schema) {
      setJsonLd(schema, 'ssvm-page-schema');
    } else {
      setJsonLd(null, 'ssvm-page-schema');
    }
  }, [title, description, keywords, canonical, image, type, noindex, schema]);

  return null;
};

export default SEOHead;
