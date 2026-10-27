/**
 * Analytics & Conversion Event Tracker
 * Sri Shakthi Vinayaga Metals
 * Supports Google Analytics 4 (GA4) with zero crashes if unconfigured.
 */

const GA_MEASUREMENT_ID =
  typeof window !== 'undefined'
    ? import.meta.env?.VITE_GA_MEASUREMENT_ID
    : null;

// Initialize Google Analytics 4 script tag if measurement ID is provided
if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && !window.__ga4_initialized) {
  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Managed manually on route change
    });
    window.__ga4_initialized = true;
  } catch (err) {
    console.warn('[Analytics] Failed to initialize GA4:', err);
  }
}

/**
 * Dispatch an analytics event safely
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  // Log in development for auditability
  if (import.meta.env?.DEV) {
    console.debug(`[Analytics Event] ${eventName}:`, params);
  }

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch (e) {
      console.warn('[Analytics] Error tracking event:', e);
    }
  }
};

/**
 * Track Page Views
 */
export const trackPageView = (path, pageTitle) => {
  trackEvent('page_view', {
    page_path: path || window.location.pathname,
    page_title: pageTitle || document.title,
    page_location: window.location.href,
  });
};

/**
 * Track Product View (GA4 view_item event)
 */
export const trackProductView = (product) => {
  if (!product) return;
  trackEvent('view_item', {
    currency: 'INR',
    items: [
      {
        item_id: product.productCode || product.slug,
        item_name: product.name,
        item_category: product.category?.name || 'Temple Metal Products',
        item_variant: product.material || 'Brass',
      },
    ],
  });
};

/**
 * Track Request Quotation Button Clicks
 */
export const trackQuotationClick = (productName, productCode, source = 'product_page') => {
  trackEvent('begin_quotation', {
    product_name: productName || 'General Temple Metalware',
    product_code: productCode || 'N/A',
    source_location: source,
  });
};

/**
 * Track WhatsApp Enquiry Clicks
 */
export const trackWhatsAppEnquiry = (productName, productCode, source = 'floating_button') => {
  trackEvent('whatsapp_enquiry_click', {
    product_name: productName || 'General Inquiry',
    product_code: productCode || 'N/A',
    source_location: source,
  });
};

/**
 * Track Contact Channel Click (Phone call, email)
 */
export const trackContactClick = (channel = 'phone') => {
  trackEvent('contact_channel_click', {
    channel,
  });
};

/**
 * Track Successful Quotation Form Submission (Lead Generation)
 * Note: Never tracks customer private details (PII) to comply with privacy regulations.
 */
export const trackQuoteFormSubmission = (referenceNumber, itemsCount = 1, preferredContact = 'WhatsApp') => {
  trackEvent('generate_lead', {
    event_category: 'Quotation',
    event_label: referenceNumber || 'Direct Quote',
    items_count: itemsCount,
    contact_method: preferredContact,
  });
};

/**
 * Track Contact Form Submission
 */
export const trackContactFormSubmission = (referenceNumber) => {
  trackEvent('contact_form_submit', {
    event_category: 'Contact',
    reference_id: referenceNumber || 'SSVM-MSG',
  });
};
