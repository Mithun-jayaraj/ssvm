/**
 * SEO Configuration & Schema.org JSON-LD Builders
 * Sri Shakthi Vinayaga Metals — Tiruppur, Tamil Nadu, India
 */

export const SITE_CONFIG = {
  name: 'Sri Shakthi Vinayaga Metals',
  tamilName: 'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ்',
  tagline: 'திருக்கோயில்களின் திருப்பணிக்கு தரமும் பாரம்பரியமும் | Quality and Tradition for Sacred Temple Projects',
  siteUrl: (typeof window !== 'undefined' && window.location?.origin && !window.location.origin.includes('localhost'))
    ? window.location.origin
    : (import.meta.env?.VITE_SITE_URL || 'https://srishakthivinayagametals.com'),
  defaultImage: '/images/prabavalayam_featured.jpg',
  logo: '/favicon.svg',
  telephone: '+91 98422 12345',
  alternativePhone: '+91 98765 43210',
  whatsappNumber: '+919842212345',
  email: 'enquiry@srishakthivinayagametals.com',
  address: {
    street: 'Near Mariamman Kovil Street, Industrial Metal Estate',
    city: 'Tirupur',
    state: 'Tamil Nadu',
    pincode: '641604',
    country: 'IN',
    countryName: 'India',
  },
  geo: {
    latitude: 11.1085,
    longitude: 77.3411,
  },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:30',
  },
};

/**
 * Common SEO Metadata for Main Pages
 */
export const PAGE_SEO = {
  home: {
    title: 'Sri Shakthi Vinayaga Metals | Temple Metal Products Manufacturer',
    description:
      'Explore traditional temple metal products from Sri Shakthi Vinayaga Metals, Tiruppur, Tamil Nadu. View Prabavalayam, Kalasam, Kodimaram and Kovil Mani. Request a custom manufacturing quotation.',
    keywords:
      'Temple metal products manufacturer, Sri Shakthi Vinayaga Metals, Prabavalayam manufacturer Tirupur, Temple Kalasam manufacturer Tamil Nadu, Kodimaram flag pole brass cladding, Kovil Mani temple bells, Brass pooja products, South Indian temple metalware',
    canonical: '/',
  },
  products: {
    title: 'Temple Metal Products Catalogue | Prabavalayam, Kalasam, Bells | Sri Shakthi Vinayaga Metals',
    description:
      'Explore handcrafted temple metalware catalogue from Sri Shakthi Vinayaga Metals, Tiruppur. Browse deity Prabavalayam arches, Gopuram Kalasams, Kodimaram cladding, Kovil Mani temple bells, and sacred deity idols.',
    keywords:
      'Temple products catalogue, brass Prabavalayam arch, temple Gopuram Kalasam, Kodimaram brass plates, temple bell Ghanta, deity vigrahams, brass pooja articles, Tirupur metal foundry',
    canonical: '/products',
  },
  categories: {
    title: 'Temple Metalware Categories | Sacred Foundry Specializations | Sri Shakthi Vinayaga Metals',
    description:
      'Browse sacred temple metalware categories from Sri Shakthi Vinayaga Metals, Tiruppur. Specializing in Prabavalayam deity aureoles, Kalasam pinnacles, Kodimaram masts, temple bells, and consecrated kavacham.',
    keywords:
      'Temple product categories, Prabavalayam deity arches, Gopuram Kalasams, Kodimaram cladding, Kovil Mani bells, deity Kavacham armor, bronze deity statues',
    canonical: '/categories',
  },
  customManufacturing: {
    title: 'Custom Temple Metal Fabrication & Sthapati Projects | Sri Shakthi Vinayaga Metals',
    description:
      'Specialized custom temple metal fabrication in Tiruppur, Tamil Nadu. Custom sized Prabavalayam, heavy Kalasam pinnacles, Kodimaram brass cladding, and bells crafted according to Agama and Shilpa Shastra guidelines.',
    keywords:
      'Custom temple metal fabrication, sthapati metal projects, custom Prabavalayam manufacturing, heavy brass Kalasam, Kodimaram copper cladding, temple renovation thiruppani Tamil Nadu',
    canonical: '/custom-manufacturing',
  },
  about: {
    title: 'About Sri Shakthi Vinayaga Metals | Traditional Temple Foundry in Tiruppur',
    description:
      'Learn about Sri Shakthi Vinayaga Metals, premier South Indian temple metalware foundry based in Tiruppur, Tamil Nadu. Traditional craftsmanship, authentic sheet gauge, and sacred metalwork for temples across India.',
    keywords:
      'About Sri Shakthi Vinayaga Metals, Tiruppur temple foundry, South Indian temple artisans, Shilpa Shastra metalcraft, direct manufacturer temple products',
    canonical: '/about',
  },
  contact: {
    title: 'Contact Sri Shakthi Vinayaga Metals | Tiruppur Foundry & Quotation Enquiries',
    description:
      'Get in touch with Sri Shakthi Vinayaga Metals in Tiruppur, Tamil Nadu. Direct manufacturer phone, WhatsApp enquiries, workshop location, and quick quotation response for temple projects.',
    keywords:
      'Contact Sri Shakthi Vinayaga Metals, temple metal manufacturer phone, Tiruppur foundry address, temple product quotation Tamil Nadu, WhatsApp temple enquiry',
    canonical: '/contact',
  },
  requestQuote: {
    title: 'Request Quotation | Temple Metal Products & Bulk Orders | Sri Shakthi Vinayaga Metals',
    description:
      'Request a manufacturer quotation for custom temple metal products from Sri Shakthi Vinayaga Metals, Tiruppur. Direct pricing for temple committees, sthapatis, pooja stores, and contractors.',
    keywords:
      'Temple quotation request, Prabavalayam price quote, Kalasam quotation, bulk temple brass order, direct manufacturer quote Tirupur',
    canonical: '/request-quote',
  },
  notFound: {
    title: 'Page Not Found (404) | Sri Shakthi Vinayaga Metals',
    description: 'The requested temple metal products page could not be found. Explore our authentic catalogue or contact our Tiruppur foundry for assistance.',
    canonical: '/404',
    noindex: true,
  },
};

/**
 * Category-specific metadata helper
 */
export const getCategorySEO = (slug, categoryName, categoryTamilName) => {
  const catTitles = {
    prabavalayam: {
      title: 'Prabavalayam Manufacturer Tiruppur | Brass Temple Deity Arches | Sri Shakthi Vinayaga Metals',
      description:
        'Traditional handcrafted brass Prabavalayam, Makara Torana deity arches, and sacred aureoles from Sri Shakthi Vinayaga Metals, Tiruppur. Custom fabrication for temple sanctums.',
      keywords: 'Prabavalayam manufacturer, brass Prabavalayam, Makara Torana arch, temple deity arch, Tiruppur Prabavalayam, sanctum aureole',
    },
    kalasam: {
      title: 'Temple Kalasam Manufacturer Tiruppur | Gopuram Brass & Copper Pinnacles | Sri Shakthi Vinayaga Metals',
      description:
        'Heavy gauge brass and 99.9% pure copper temple Gopuram Kalasams, Stupi pinnacles, and sanctum Kumbhabhishekam vessels manufactured in Tiruppur, Tamil Nadu.',
      keywords: 'Temple Kalasam manufacturer, brass Gopuram Kalasam, copper Stupi Kalasam, Kumbhabhishekam Kalasam, Tirupur Kalasam foundry',
    },
    'temple-flag-pole': {
      title: 'Temple Kodimaram Brass Cladding & Bali Peedam Plates | Sri Shakthi Vinayaga Metals',
      description:
        'Heavy-gauge brass and copper Kodimaram mast cladding cylinders, stepped pedestals, and Bali Peedam protective coverings by Sri Shakthi Vinayaga Metals, Tiruppur.',
      keywords: 'Temple Kodimaram cladding, Kodimaram brass plates, temple flag pole copper covering, Bali Peedam brass plates, Tiruppur metalwork',
    },
    'temple-bell': {
      title: 'Kovil Mani (Temple Bells) Manufacturer | Cast Bell Metal & Brass | Sri Shakthi Vinayaga Metals',
      description:
        'Acoustic resonant cast bell metal and brass temple bells (Kovil Mani), hanging bells with Nandi finials, and pooja hand bells manufactured in Tiruppur, Tamil Nadu.',
      keywords: 'Kovil Mani manufacturer, temple bell brass, cast bronze bell, hanging temple bell, Ghanta with Nandi, Tirupur temple bell',
    },
    kavacham: {
      title: 'Deity Kavacham (Sacred Armor) Manufacturer | Brass & Copper Cladding | Sri Shakthi Vinayaga Metals',
      description:
        'Custom embossed deity armor, Thirumugam face coverings, Padam feet coverings, and sacred gold-finish protective kavacham crafted in Tiruppur, Tamil Nadu.',
      keywords: 'Deity Kavacham manufacturer, temple idol armor, Thirumugam kavacham, Padam kavacham, brass copper deity cladding',
    },
    'deity-idols': {
      title: 'Traditional Temple Deity Idols (Vigrahams) | Brass & Bronze Statues | Sri Shakthi Vinayaga Metals',
      description:
        'Authentic Agama-compliant cast brass and bronze deity vigrahams of Lord Ganesha, Murugan, Nataraja, and Amman crafted by master metal sculptors in Tiruppur.',
      keywords: 'Temple deity idols, brass vigrahams, Lord Ganesha statue, Nataraja bronze idol, Amman idol Tiruppur, Shilpa Shastra vigrahams',
    },
  };

  if (catTitles[slug]) {
    return {
      ...catTitles[slug],
      canonical: `/categories/${slug}`,
    };
  }

  const displayName = categoryTamilName ? `${categoryTamilName} | ${categoryName}` : categoryName;
  return {
    title: `${displayName} | Temple Metal Products | Sri Shakthi Vinayaga Metals`,
    description: `Explore authentic ${categoryName} manufactured for temples and sacred sanctums by Sri Shakthi Vinayaga Metals, Tiruppur, Tamil Nadu. Direct manufacturer enquiries and quotations.`,
    keywords: `${categoryName}, temple metalware, Tiruppur manufacturer, Sri Shakthi Vinayaga Metals`,
    canonical: `/categories/${slug}`,
  };
};

/**
 * Product-specific metadata helper
 */
export const getProductSEO = (product) => {
  if (!product) return PAGE_SEO.products;

  const prodCode = product.productCode ? `(${product.productCode})` : '';
  const engName = product.name || 'Temple Metal Product';
  const taName = product.tamilName || '';
  const title = taName
    ? `${engName} ${prodCode} | Sri Shakthi Vinayaga Metals`
    : `${engName} ${prodCode} | Temple Metal Products | Sri Shakthi Vinayaga Metals`;

  const rawDesc =
    product.shortDescription ||
    product.tamilShortDescription ||
    product.fullDescription ||
    '';
  const cleanDesc = rawDesc.replace(/\s+/g, ' ').trim().slice(0, 160);
  const description = cleanDesc
    ? `${cleanDesc} Manufactured by Sri Shakthi Vinayaga Metals, Tiruppur, Tamil Nadu.`
    : `Explore ${engName} manufactured with traditional temple craftsmanship by Sri Shakthi Vinayaga Metals, Tiruppur, Tamil Nadu. Request custom size quotation.`;

  const keywords = [
    product.name,
    product.tamilName,
    product.productCode,
    product.material,
    product.category?.name,
    'Sri Shakthi Vinayaga Metals',
    'Tiruppur temple metal manufacturer',
    'Tamil Nadu temple metalware',
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    canonical: `/products/${product.slug}`,
    image: product.primaryImage || SITE_CONFIG.defaultImage,
    product,
  };
};

/**
 * Build Schema.org Organization + LocalBusiness JSON-LD
 */
export const buildOrganizationSchema = (siteUrl = SITE_CONFIG.siteUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.tamilName,
    description:
      'Premier manufacturer and supplier of traditional temple metal products in Tiruppur, Tamil Nadu, India. Handcrafted Prabavalayam deity arches, Gopuram Kalasams, Kodimaram flag pole cladding, and temple bells.',
    url: siteUrl,
    logo: `${siteUrl}${SITE_CONFIG.logo}`,
    image: `${siteUrl}${SITE_CONFIG.defaultImage}`,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.pincode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SITE_CONFIG.openingHours.days,
        opens: SITE_CONFIG.openingHours.opens,
        closes: SITE_CONFIG.openingHours.closes,
      },
    ],
    priceRange: '$$',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Temple Metal Products Catalogue',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Prabavalayam (Deity Arches)',
          url: `${siteUrl}/categories/prabavalayam`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Kalasam (Gopuram Pinnacles)',
          url: `${siteUrl}/categories/kalasam`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Kodimaram (Temple Flag Pole Cladding)',
          url: `${siteUrl}/categories/temple-flag-pole`,
        },
        {
          '@type': 'OfferCatalog',
          name: 'Temple Bells (Kovil Mani)',
          url: `${siteUrl}/categories/temple-bell`,
        },
      ],
    },
  };
};

/**
 * Build Schema.org WebSite JSON-LD
 */
export const buildWebSiteSchema = (siteUrl = SITE_CONFIG.siteUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.tamilName,
    url: siteUrl,
    inLanguage: ['ta', 'en', 'ml', 'te', 'kn', 'hi'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Build Schema.org BreadcrumbList JSON-LD
 */
export const buildBreadcrumbSchema = (items = [], siteUrl = SITE_CONFIG.siteUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
};

/**
 * Build Schema.org Product JSON-LD (Strictly authentic, quotation-compliant)
 */
export const buildProductSchema = (product, siteUrl = SITE_CONFIG.siteUrl) => {
  if (!product) return null;

  const productUrl = `${siteUrl}/products/${product.slug}`;
  const imageUrl = product.primaryImage
    ? (product.primaryImage.startsWith('http') ? product.primaryImage : `${siteUrl}${product.primaryImage}`)
    : `${siteUrl}${SITE_CONFIG.defaultImage}`;

  const cleanDescription = (
    product.shortDescription ||
    product.tamilShortDescription ||
    product.fullDescription ||
    `${product.name} handcrafted by Sri Shakthi Vinayaga Metals in Tiruppur, Tamil Nadu.`
  )
    .replace(/\s+/g, ' ')
    .trim();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.tamilName ? `${product.tamilName} | ${product.name}` : product.name,
    alternateName: product.tamilName || product.name,
    description: cleanDescription,
    image: imageUrl,
    sku: product.productCode || `SSVM-${product.slug?.slice(0, 8).toUpperCase()}`,
    mpn: product.productCode || `SSVM-${product.slug?.slice(0, 8).toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: siteUrl,
    },
    category: product.category?.name || 'Temple Metal Products',
    material: product.material || 'Virgin High-Purity Brass / Copper',
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: '0',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceType: 'https://schema.org/InvoicePrice',
        priceCurrency: 'INR',
      },
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      description: 'Manufactured to order. Custom size and sheet gauge quotations provided upon enquiry.',
    },
  };

  // Additional technical attributes if verified
  if (product.dimensions) {
    schema.additionalProperty = [
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: product.dimensions,
      },
    ];
  }

  return schema;
};
