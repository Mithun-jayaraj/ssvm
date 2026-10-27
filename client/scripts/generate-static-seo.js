/**
 * Static SEO Prerender Generator for Sri Shakthi Vinayaga Metals
 * Runs after `vite build` to generate static HTML with rich metadata,
 * OpenGraph, Twitter cards, Schema.org JSON-LD, and semantic HTML for all canonical routes.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(CLIENT_ROOT, 'dist');
const SITE_URL = 'https://srishakthivinayagametals.com';

const TEMPLE_PRODUCTS = [
  {
    slug: 'grand-makara-torana-brass-prabavalayam',
    name: 'Grand Makara Torana Brass Prabavalayam (Temple Arch)',
    tamilName: 'மகர தோரண பித்தளை பிரபாவளையம்',
    productCode: 'SSVM-PB-001',
    category: 'Prabavalayam',
    categorySlug: 'prabavalayam',
    material: 'தூய பித்தளை | High-Purity Virgin Brass',
    dimensions: 'உயரம்: 48 அங்குலம், அகலம்: 36 அங்குலம் | Height: 48 inches, Width: 36 inches',
    weight: 'சுமார் 26 கிலோ | Approx. 26 kg',
    shortDescription:
      'Majestic traditional South Indian temple Prabavalayam featuring twin Makara motifs, radiating flames (Jwala), and crowning Kirtimukha crest.',
    image: '/images/cat_prabavalayam.jpg',
  },
  {
    slug: 'royal-peacock-mayil-brass-prabavalayam',
    name: 'Royal Peacock (Mayil) Motif Brass Temple Prabavalayam',
    tamilName: 'மயில் தோரண பித்தளை பிரபாவளையம்',
    productCode: 'SSVM-PB-002',
    category: 'Prabavalayam',
    categorySlug: 'prabavalayam',
    material: 'தூய பித்தளை | High-Purity Virgin Brass',
    dimensions: 'உயரம்: 42 அங்குலம், அகலம்: 32 அங்குலம் | Height: 42 inches, Width: 32 inches',
    weight: 'சுமார் 22 கிலோ | Approx. 22 kg',
    shortDescription:
      'Sacred deity arch featuring crowning Kirtimukha, twin dancing peacocks (Mayil), and traditional floral scrollwork.',
    image: '/images/cat_prabavalayam.jpg',
  },
  {
    slug: 'gopuram-brass-temple-kalasam',
    name: 'Traditional Gopuram Brass Temple Kalasam (Stupi Pinnacle)',
    tamilName: 'கோவில் ராஜகோபுர பித்தளை கலசம்',
    productCode: 'SSVM-KL-001',
    category: 'Kalasam',
    categorySlug: 'kalasam',
    material: 'தூய பித்தளை & தாமிர தகடு | Heavy Consecrated Brass & Copper',
    dimensions: 'உயரம்: 36 அங்குலம், விட்டம்: 18 அங்குலம் | Height: 36 inches, Base Diameter: 18 inches',
    weight: 'சுமார் 22 கிலோ | Approx. 22 kg',
    shortDescription:
      'Sacred multi-tiered Gopuram brass Kalasam designed for temple consecration (Kumbhabhishekam) and vimana pinnacles.',
    image: '/images/cat_kalasam.jpg',
  },
  {
    slug: 'consecration-heavy-copper-garbhagriha-kalasam',
    name: 'Consecration Heavy Copper Garbhagriha Vimana Kalasam',
    tamilName: 'கர்ப்பகிரக விமான செப்பு கலசம்',
    productCode: 'SSVM-KL-002',
    category: 'Kalasam',
    categorySlug: 'kalasam',
    material: '99.9% தூய தாமிரம் | 99.9% Pure Consecrated Electrolytic Copper',
    dimensions: 'உயரம்: 30 அங்குலம், விட்டம்: 15 அங்குலம் | Height: 30 inches, Diameter: 15 inches',
    weight: 'சுமார் 18 கிலோ | Approx. 18 kg',
    shortDescription:
      'Handcrafted heavy electrolytic copper Kalasam designed for temple sanctum vimana towers and holy water consecration ceremonies.',
    image: '/images/cat_kalasam.jpg',
  },
  {
    slug: 'sacred-temple-kodimaram-brass-cladding-cylinders',
    name: 'Sacred Temple Kodimaram Brass Cladding Cylinders & Base Rings',
    tamilName: 'கோவில் கொடிமர பித்தளை கவச உருளைகள்',
    productCode: 'SSVM-KM-001',
    category: 'Temple Flag Pole',
    categorySlug: 'temple-flag-pole',
    material: 'கனரக பித்தளை தகடு | Heavy-Gauge 14/16 Gauge Temple Brass',
    dimensions: 'துல்லியமான மரத் தண்டு விட்டத்திற்கு ஏற்ப | Custom-measured to teak flag mast diameter',
    weight: 'கொடிமர உயரத்திற்கு ஏற்ப | According to mast height',
    shortDescription:
      'Seamless interlocking cylindrical brass sections and cast ring mouldings for temple Kodimaram mast encapsulation.',
    image: '/images/cat_kodimaram.jpg',
  },
  {
    slug: 'ashtalakshmi-temple-bali-peedam-brass-cladding-plates',
    name: 'Ashtalakshmi Temple Bali Peedam Brass Cladding Plates',
    tamilName: 'அஷ்டலட்சுமி பலிபீட பித்தளை கவச தகடுகள்',
    productCode: 'SSVM-KM-002',
    category: 'Temple Flag Pole',
    categorySlug: 'temple-flag-pole',
    material: 'தூய பித்தளை | Pure Mirror Gold Finished Brass',
    dimensions: 'பலிபீட அளவிற்கு ஏற்ப | Custom-fabricated to granite Bali Peedam dimensions',
    weight: 'சுமார் 18 - 40 கிலோ | Approx. 18 - 40 kg',
    shortDescription:
      'Deep embossed brass panels depicting the Eight Manifestations of Goddess Lakshmi (Ashtalakshmi) for altar cladding.',
    image: '/images/cat_kodimaram.jpg',
  },
  {
    slug: 'heavy-hand-cast-temple-brass-bell-nandi-finial',
    name: 'Heavy Hand-Cast Temple Brass Bell with Sacred Nandi Finial (Ghanta)',
    tamilName: 'நந்தி கிரீடம் பொருந்திய கனரக வெண்கல கோவில் மணி',
    productCode: 'SSVM-BL-001',
    category: 'Temple Bell',
    categorySlug: 'temple-bell',
    material: 'வெண்கலம் மற்றும் பித்தளை | High-Acoustic Bell Metal & Brass',
    dimensions: 'உயரம்: 24 அங்குலம், விட்டம்: 18 அங்குலம் | Height: 24 inches, Diameter: 18 inches',
    weight: 'சுமார் 45 கிலோ | Approx. 45 kg',
    shortDescription:
      'Resonant temple bell hand-cast in acoustic bell metal, topped with a consecrated seated Nandi finial and cast suspension ring.',
    image: '/images/cat_temple_bell.jpg',
  },
  {
    slug: 'monumental-temple-hanging-bell-heavy-chain',
    name: 'Monumental Temple Hanging Bell with Cast Brass Heavy Suspension Chain',
    tamilName: 'பாரம்பரிய தொங்கு கோவில் மணி மற்றும் கனரக சங்கிலி',
    productCode: 'SSVM-BL-002',
    category: 'Temple Bell',
    categorySlug: 'temple-bell',
    material: 'வெண்கலம் மற்றும் பித்தளை | Bell Bronze & Cast Brass Links',
    dimensions: 'மணி விட்டம்: 21 அங்குலம், சங்கிலி: 6 அடி | Bell Dia: 21 inches, Chain: 6 ft',
    weight: 'சுமார் 65 கிலோ | Approx. 65 kg',
    shortDescription:
      'High-resonance ceremonial hanging temple bell paired with masterfully interlocking cast brass ornamental chain.',
    image: '/images/cat_temple_bell.jpg',
  },
  {
    slug: 'traditional-south-indian-annam-kuthu-vilakku-pair',
    name: 'Traditional South Indian Brass Annam Kuthu Vilakku (Temple Lamp Pair)',
    tamilName: 'பாரம்பரிய அன்னம் குத்து விளக்கு ஜோடி',
    productCode: 'SSVM-LP-001',
    category: 'Brass Pooja Products',
    categorySlug: 'categories',
    material: 'தூய பித்தளை | High-Grade Cast Temple Brass',
    dimensions: 'உயரம்: 48 அங்குலம் | Height: 48 inches (4 feet)',
    weight: 'சுமார் 32 கிலோ ஜோடி | Approx. 32 kg per pair',
    shortDescription:
      'Majestic handcrafted ceremonial standing lamp pair crowned with sacred celestial swan (Annam) finial and five-wick oil reservoir.',
    image: '/images/cat_brass_lamps.jpg',
  },
  {
    slug: 'sacred-temple-abhisheka-kumbham-pooja-vessel-set',
    name: 'Sacred Temple Abhisheka Kumbham & Pooja Vessel Set',
    tamilName: 'ஆலய அபிஷேக தீர்த்த கும்பம் மற்றும் பூஜை பாத்திரங்கள்',
    productCode: 'SSVM-PV-001',
    category: 'Brass Pooja Products',
    categorySlug: 'categories',
    material: 'தூய செம்பு மற்றும் பித்தளை | Virgin Heavy Copper & Brass',
    dimensions: 'கும்ப விட்டம்: 12 அங்குலம், கொள்ளளவு: 8 லிட்டர் | Dia: 12 inches, Vol: 8 Litres',
    weight: 'சுமார் 14 கிலோ | Approx. 14 kg total set',
    shortDescription:
      'Traditional sanctum holy water consecration vessels, engraved Gomukhi snana pathiram, and ceremonial thambalam trays.',
    image: '/images/cat_pooja_vessels.jpg',
  },
  {
    slug: 'shri-shakthi-vinayagar-seated-brass-temple-idol',
    name: 'Shri Shakthi Vinayagar Seated Brass Temple Idol (Vigraham)',
    tamilName: 'ஸ்ரீ சக்தி விநாயகர் அமர்ந்த திருக்கோல பித்தளை சிலை',
    productCode: 'SSVM-ID-001',
    category: 'Deity Idols',
    categorySlug: 'deity-idols',
    material: 'தூய பித்தளை | Virgin Casting Brass',
    dimensions: 'உயரம்: 24 அங்குலம் | Height: 24 inches',
    weight: 'சுமார் 28 கிலோ | Approx. 28 kg',
    shortDescription:
      'Masterfully hand-chiseled seated Ganesha vigraham on lotus pedestal with Pasha, Ankusha, Modaka, and Abhaya mudra.',
    image: '/images/cat_god_idols.jpg',
  },
  {
    slug: 'sacred-embossed-deity-kavacham-armor',
    name: 'Sacred Consecrated Deity Kavacham & Crown Armor',
    tamilName: 'சுவாமி திருமேனி கவசமும் கிரீடமும்',
    productCode: 'SSVM-KV-001',
    category: 'Kavacham',
    categorySlug: 'kavacham',
    material: 'தூய செம்பு & பித்தளை, தங்க முலாம் | Pure Copper & Brass with Mirror Gold Finish',
    dimensions: 'கருவறை மூலவர் அளவிற்கு ஏற்ப | Custom-measured to consecrated deity vigraham',
    weight: 'சுமார் 12 - 45 கிலோ | Tailored to deity dimension (approx. 12 - 45 kg)',
    shortDescription:
      'Handcrafted temple deity armor encompassing Thirumugam, Hastham, Padam, and chest kavacham tailored to sanctum deities.',
    image: '/images/real_kavacham.jpg',
  },
  {
    slug: 'traditional-temple-hanuman-vahana-brass-sculpture',
    name: 'Traditional Temple Hanuman Vahana Brass Sculpture',
    tamilName: 'கோவில் அனுமந்த வாகனம் பித்தளை திருமேனி',
    productCode: 'SSVM-HV-001',
    category: 'Deity Idols',
    categorySlug: 'deity-idols',
    material: 'தூய பித்தளை | Virgin Brass',
    dimensions: 'உயரம்: 36 அங்குலம் | Height: 36 inches',
    weight: 'சுமார் 35 கிலோ | Approx. 35 kg',
    shortDescription:
      'Sacred temple Hanuman Vahana sculpture hand-chiseled for Brahmotsavam and deity processions.',
    image: '/images/hanuman_vahana.png',
  },
  {
    slug: 'traditional-temple-entrance-kovil-vaasal-thiruppani',
    name: 'Traditional Temple Entrance (Kovil Vaasal) Metal Thiruppani',
    tamilName: 'பாரம்பரிய கோவில் வாசல் உலோகத் திருப்பணி',
    productCode: 'SSVM-KV-001',
    category: 'Prabavalayam',
    categorySlug: 'prabavalayam',
    material: 'கனரக பித்தளை & தாமிர தகடு | Heavy Temple Brass & Copper Cladding',
    dimensions: 'கருவறை நுழைவு வாயில் அளவிற்கு ஏற்ப | Custom sanctum door dimensions',
    weight: 'அளவிற்கு ஏற்ப | Tailored to entrance scale',
    shortDescription:
      'Architectural temple entrance cladding with Makara motifs, Dvarapalaka reliefs, and auspicious floral borders.',
    image: '/images/temple_entrance_vaasal.jpg',
  },
  {
    slug: 'ornate-brass-simhasanam-lion-vahana-throne',
    name: 'Ornate Brass Simhasanam Lion Vahana Temple Throne',
    tamilName: 'சிம்ம ஆசனம் பித்தளை கோவில் அரியணை',
    productCode: 'SSVM-VH-001',
    category: 'Deity Idols',
    categorySlug: 'deity-idols',
    material: 'தூய பித்தளை | Virgin Brass with Golden Polish',
    dimensions: 'உயரம்: 30 அங்குலம், அகலம்: 24 அங்குலம் | Height: 30 inches, Width: 24 inches',
    weight: 'சுமார் 30 கிலோ | Approx. 30 kg',
    shortDescription:
      'Imperial lion throne (Simhasanam) crafted for sanctum deity vigrahams and utsava murti installations.',
    image: '/images/simhasanam_vahana.jpg',
  },
];

const CATEGORIES = [
  {
    slug: 'prabavalayam',
    name: 'Prabavalayam',
    tamilName: 'பிரபாவளையம்',
    title: 'Prabavalayam Manufacturer Tiruppur | Brass Temple Deity Arches | Sri Shakthi Vinayaga Metals',
    description:
      'Traditional handcrafted brass Prabavalayam, Makara Torana deity arches, and sacred aureoles from Sri Shakthi Vinayaga Metals, Tiruppur. Custom fabrication for temple sanctums.',
  },
  {
    slug: 'kalasam',
    name: 'Kalasam',
    tamilName: 'கலசம்',
    title: 'Temple Kalasam Manufacturer Tiruppur | Gopuram Brass & Copper Pinnacles | Sri Shakthi Vinayaga Metals',
    description:
      'Heavy gauge brass and 99.9% pure copper temple Gopuram Kalasams, Stupi pinnacles, and sanctum Kumbhabhishekam vessels manufactured in Tiruppur, Tamil Nadu.',
  },
  {
    slug: 'temple-flag-pole',
    name: 'Temple Flag Pole',
    tamilName: 'கோவில் கொடிமரம்',
    title: 'Temple Kodimaram Brass Cladding & Bali Peedam Plates | Sri Shakthi Vinayaga Metals',
    description:
      'Heavy-gauge brass and copper Kodimaram mast cladding cylinders, stepped pedestals, and Bali Peedam protective coverings by Sri Shakthi Vinayaga Metals, Tiruppur.',
  },
  {
    slug: 'temple-bell',
    name: 'Temple Bell',
    tamilName: 'கோவில் மணி',
    title: 'Kovil Mani (Temple Bells) Manufacturer | Cast Bell Metal & Brass | Sri Shakthi Vinayaga Metals',
    description:
      'Acoustic resonant cast bell metal and brass temple bells (Kovil Mani), hanging bells with Nandi finials, and pooja hand bells manufactured in Tiruppur, Tamil Nadu.',
  },
  {
    slug: 'kavacham',
    name: 'Kavacham',
    tamilName: 'கவசம்',
    title: 'Deity Kavacham (Sacred Armor) Manufacturer | Brass & Copper Cladding | Sri Shakthi Vinayaga Metals',
    description:
      'Custom embossed deity armor, Thirumugam face coverings, Padam feet coverings, and sacred gold-finish protective kavacham crafted in Tiruppur, Tamil Nadu.',
  },
  {
    slug: 'deity-idols',
    name: 'Deity Idols',
    tamilName: 'சுவாமி சிலைகள்',
    title: 'Traditional Temple Deity Idols (Vigrahams) | Brass & Bronze Statues | Sri Shakthi Vinayaga Metals',
    description:
      'Authentic Agama-compliant cast brass and bronze deity vigrahams of Lord Ganesha, Murugan, Nataraja, and Amman crafted by master metal sculptors in Tiruppur.',
  },
];

const STATIC_PAGES = [
  {
    route: '/',
    title: 'Sri Shakthi Vinayaga Metals | Temple Metal Products Manufacturer',
    description:
      'Explore traditional temple metal products from Sri Shakthi Vinayaga Metals, Tiruppur, Tamil Nadu. View Prabavalayam, Kalasam, Kodimaram and Kovil Mani. Request a custom manufacturing quotation.',
    heading: 'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் — திருக்கோவில் பாரம்பரிய உலோகத் தயாரிப்புகள்',
    subheading: 'Sri Shakthi Vinayaga Metals | Temple Metal Products Manufacturer, Tiruppur',
    breadcrumbs: [{ name: 'Home', url: '/' }],
  },
  {
    route: '/products',
    title: 'Temple Metal Products Catalogue | Prabavalayam, Kalasam, Bells | Sri Shakthi Vinayaga Metals',
    description:
      'Explore handcrafted temple metalware catalogue from Sri Shakthi Vinayaga Metals, Tiruppur. Browse deity Prabavalayam arches, Gopuram Kalasams, Kodimaram cladding, Kovil Mani temple bells, and sacred deity idols.',
    heading: 'கோவில் உலோகத் தயாரிப்புகள் பட்டியல் | Temple Metal Products Catalogue',
    subheading: 'Sacred Temple Metalware & Direct Foundry Specializations',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Products', url: '/products' }],
  },
  {
    route: '/categories',
    title: 'Temple Metalware Categories | Sacred Foundry Specializations | Sri Shakthi Vinayaga Metals',
    description:
      'Browse sacred temple metalware categories from Sri Shakthi Vinayaga Metals, Tiruppur. Specializing in Prabavalayam deity aureoles, Kalasam pinnacles, Kodimaram masts, temple bells, and consecrated kavacham.',
    heading: 'புனித கோவில் தயாரிப்பு வகைகள் | Temple Metalware Categories',
    subheading: 'Core Specializations: Prabavalayam, Kalasam, Kodimaram, Temple Bells',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Categories', url: '/categories' }],
  },
  {
    route: '/custom-manufacturing',
    title: 'Custom Temple Metal Fabrication & Sthapati Projects | Sri Shakthi Vinayaga Metals',
    description:
      'Specialized custom temple metal fabrication in Tiruppur, Tamil Nadu. Custom sized Prabavalayam, heavy Kalasam pinnacles, Kodimaram brass cladding, and bells crafted according to Agama and Shilpa Shastra guidelines.',
    heading: 'தனிப்பயன் கோவில் உலோகத் திருப்பணி | Custom Temple Metal Fabrication',
    subheading: 'Agama & Shilpa Shastra Sthapati Metalwork Tailored to Sanctum Dimensions',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Custom Manufacturing', url: '/custom-manufacturing' }],
  },
  {
    route: '/about',
    title: 'About Sri Shakthi Vinayaga Metals | Traditional Temple Foundry in Tiruppur',
    description:
      'Learn about Sri Shakthi Vinayaga Metals, premier South Indian temple metalware foundry based in Tiruppur, Tamil Nadu. Traditional craftsmanship, authentic sheet gauge, and sacred metalwork for temples across India.',
    heading: 'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் பற்றி | About Sri Shakthi Vinayaga Metals',
    subheading: 'Traditional South Indian Temple Metal Foundry — Tiruppur, Tamil Nadu',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }],
  },
  {
    route: '/contact',
    title: 'Contact Sri Shakthi Vinayaga Metals | Tiruppur Foundry & Quotation Enquiries',
    description:
      'Get in touch with Sri Shakthi Vinayaga Metals in Tiruppur, Tamil Nadu. Direct manufacturer phone, WhatsApp enquiries, workshop location, and quick quotation response for temple projects.',
    heading: 'தொடர்புக்கு | Contact Sri Shakthi Vinayaga Metals',
    subheading: 'Foundry Workshop & Direct Manufacturer Enquiries — Tiruppur, Tamil Nadu',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Contact Us', url: '/contact' }],
  },
  {
    route: '/request-quote',
    title: 'Request Quotation | Temple Metal Products & Bulk Orders | Sri Shakthi Vinayaga Metals',
    description:
      'Request a manufacturer quotation for custom temple metal products from Sri Shakthi Vinayaga Metals, Tiruppur. Direct pricing for temple committees, sthapatis, pooja stores, and contractors.',
    heading: 'விலைப்புள்ளி கோரிக்கை | Request a Product Quotation',
    subheading: 'Direct Manufacturer Pricing for Temples, Sthapatis, Wholesalers & Devotees',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Request Quotation', url: '/request-quote' }],
  },
];

// Product Aliases
const PRODUCT_ALIASES = [
  { alias: 'prabavalayam', target: 'grand-makara-torana-brass-prabavalayam' },
  { alias: 'kalasam', target: 'gopuram-brass-temple-kalasam' },
  { alias: 'kodimaram', target: 'sacred-temple-kodimaram-brass-cladding-cylinders' },
  { alias: 'kovil-mani', target: 'heavy-hand-cast-temple-brass-bell-nandi-finial' },
];

function generateHtml({
  template,
  title,
  description,
  canonicalUrl,
  imageUrl,
  schemaJson,
  preRenderedBodyHtml,
  noindex = false,
}) {
  let html = template;

  // 1. Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // 2. Replace or inject meta title & description
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${title}" />`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );

  // 3. Robots
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  html = html.replace(/<meta name="robots" content=".*?" \/>/i, `<meta name="robots" content="${robots}" />`);

  // 4. Canonical
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 5. OpenGraph
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  if (imageUrl) {
    html = html.replace(
      /<meta property="og:image" content=".*?" \/>/i,
      `<meta property="og:image" content="${imageUrl}" />`
    );
  }

  // 6. Twitter Card
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${description}" />`
  );
  if (imageUrl) {
    html = html.replace(
      /<meta name="twitter:image" content=".*?" \/>/i,
      `<meta name="twitter:image" content="${imageUrl}" />`
    );
  }

  // 7. Inject Route Schema.org
  if (schemaJson) {
    const schemaTag = `\n    <!-- Route Structured Data -->\n    <script type="application/ld+json" id="ssvm-route-schema">\n${JSON.stringify(
      schemaJson,
      null,
      2
    )}\n    </script>\n  </head>`;
    html = html.replace('</head>', schemaTag);
  }

  // 8. Inject Semantic Pre-rendered HTML inside <div id="root"></div>
  if (preRenderedBodyHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${preRenderedBodyHtml}</div>`
    );
  }

  return html;
}

function writeStaticFile(routePath, htmlContent) {
  let targetDir = DIST_DIR;
  let targetFile = path.join(DIST_DIR, 'index.html');

  if (routePath !== '/') {
    const cleanRoute = routePath.replace(/^\//, '').replace(/\/$/, '');
    targetDir = path.join(DIST_DIR, cleanRoute);
    fs.mkdirSync(targetDir, { recursive: true });
    targetFile = path.join(targetDir, 'index.html');
  }

  fs.writeFileSync(targetFile, htmlContent, 'utf8');
  console.log(`[Static Prerender] Generated: ${routePath} -> ${path.relative(CLIENT_ROOT, targetFile)}`);
}

async function runStaticPrerender() {
  console.log('===========================================================');
  console.log('   SSVM PRODUCTION SEO & PRERENDER BUILD STEP              ');
  console.log('===========================================================');

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('[Error] dist/index.html not found! Run `vite build` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  // 1. Generate Static Pages
  STATIC_PAGES.forEach((page) => {
    const canonicalUrl = `${SITE_URL}${page.route === '/' ? '' : page.route}`;
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: `${SITE_URL}${b.url}`,
      })),
    };

    const preRenderedHtml = `
      <div class="ssvm-prerendered-content" style="min-height: 100vh; background-color: #FAF6ED; color: #262321; font-family: sans-serif;">
        <header style="background-color: #4A1424; color: #FAF6ED; padding: 1rem 1.5rem; border-bottom: 2px solid #C5A15B;">
          <div style="max-w: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <a href="/" style="color: #FAF6ED; text-decoration: none; font-weight: bold; font-size: 1.25rem;">
              ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் | Sri Shakthi Vinayaga Metals
            </a>
            <nav style="display: flex; gap: 1rem; font-size: 0.875rem;">
              <a href="/" style="color: #FAF6ED; text-decoration: none;">Home</a>
              <a href="/products" style="color: #FAF6ED; text-decoration: none;">Products</a>
              <a href="/categories" style="color: #FAF6ED; text-decoration: none;">Categories</a>
              <a href="/custom-manufacturing" style="color: #FAF6ED; text-decoration: none;">Custom Manufacturing</a>
              <a href="/about" style="color: #FAF6ED; text-decoration: none;">About Us</a>
              <a href="/contact" style="color: #FAF6ED; text-decoration: none;">Contact</a>
            </nav>
          </div>
        </header>
        <main style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
          <nav aria-label="Breadcrumb" style="font-size: 0.85rem; margin-bottom: 1.5rem; color: #736B66;">
            ${page.breadcrumbs.map((b) => `<a href="${b.url}" style="color: #4A1424; text-decoration: none;">${b.name}</a>`).join(' &gt; ')}
          </nav>
          <h1 style="color: #8B1E28; font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2;">
            ${page.heading}
          </h1>
          <h2 style="color: #262321; font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">
            ${page.subheading}
          </h2>
          <p style="color: #51463E; font-size: 1rem; line-height: 1.6; max-width: 800px; margin-bottom: 2rem;">
            ${page.description}
          </p>
          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <a href="/products" style="background-color: #8B1E28; color: #FAF6ED; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px; font-weight: 600;">View Products Catalogue</a>
            <a href="/request-quote" style="background-color: #C5A15B; color: #262321; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px; font-weight: 600;">Request Quotation</a>
          </div>
        </main>
        <footer style="background-color: #380E1B; color: #EDE4D5; padding: 2rem 1.5rem; margin-top: 4rem; border-top: 2px solid #C5A15B;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center; font-size: 0.875rem;">
            <p><strong>Sri Shakthi Vinayaga Metals</strong> — Near Mariamman Kovil Street, Industrial Metal Estate, Tirupur, Tamil Nadu 641604, India</p>
            <p style="margin-top: 0.5rem;">Direct Manufacturer Phone: +91 98422 12345 • WhatsApp: +91 98422 12345</p>
          </div>
        </footer>
      </div>
    `;

    const html = generateHtml({
      template,
      title: page.title,
      description: page.description,
      canonicalUrl,
      imageUrl: `${SITE_URL}/images/prabavalayam_featured.jpg`,
      schemaJson: breadcrumbSchema,
      preRenderedBodyHtml: preRenderedHtml,
    });

    writeStaticFile(page.route, html);
  });

  // 2. Generate Category Pages
  CATEGORIES.forEach((cat) => {
    const route = `/categories/${cat.slug}`;
    const canonicalUrl = `${SITE_URL}${route}`;
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SITE_URL}/categories` },
        { '@type': 'ListItem', position: 3, name: `${cat.tamilName} | ${cat.name}`, item: canonicalUrl },
      ],
    };

    const preRenderedHtml = `
      <div class="ssvm-prerendered-content" style="min-height: 100vh; background-color: #FAF6ED; color: #262321; font-family: sans-serif;">
        <header style="background-color: #4A1424; color: #FAF6ED; padding: 1rem 1.5rem; border-bottom: 2px solid #C5A15B;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <a href="/" style="color: #FAF6ED; text-decoration: none; font-weight: bold; font-size: 1.25rem;">
              ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் | Sri Shakthi Vinayaga Metals
            </a>
          </div>
        </header>
        <main style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
          <nav aria-label="Breadcrumb" style="font-size: 0.85rem; margin-bottom: 1.5rem; color: #736B66;">
            <a href="/" style="color: #4A1424; text-decoration: none;">Home</a> &gt; 
            <a href="/categories" style="color: #4A1424; text-decoration: none;">Categories</a> &gt; 
            <span>${cat.tamilName} | ${cat.name}</span>
          </nav>
          <h1 style="color: #8B1E28; font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">
            ${cat.tamilName} | ${cat.name}
          </h1>
          <h2 style="color: #262321; font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem;">
            Sacred Temple Metalware — Sri Shakthi Vinayaga Metals Tiruppur
          </h2>
          <p style="color: #51463E; font-size: 1rem; line-height: 1.6; max-width: 800px; margin-bottom: 2rem;">
            ${cat.description}
          </p>
          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <a href="/request-quote?category=${cat.slug}" style="background-color: #8B1E28; color: #FAF6ED; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px; font-weight: 600;">Request Custom Quotation</a>
          </div>
        </main>
      </div>
    `;

    const html = generateHtml({
      template,
      title: cat.title,
      description: cat.description,
      canonicalUrl,
      imageUrl: `${SITE_URL}/images/cat_${cat.slug}.jpg`,
      schemaJson: breadcrumbSchema,
      preRenderedBodyHtml: preRenderedHtml,
    });

    writeStaticFile(route, html);
  });

  // 3. Generate Individual Product Detail Pages
  TEMPLE_PRODUCTS.forEach((prod) => {
    const route = `/products/${prod.slug}`;
    const canonicalUrl = `${SITE_URL}${route}`;
    const title = `${prod.tamilName ? `${prod.name} (${prod.productCode}) | Sri Shakthi Vinayaga Metals` : `${prod.name} | Sri Shakthi Vinayaga Metals`}`;
    const description = `${prod.tamilShortDescription || prod.shortDescription} Handcrafted by Sri Shakthi Vinayaga Metals, Tiruppur, Tamil Nadu. Direct manufacturer quotation.`;
    const imageUrl = `${SITE_URL}${prod.image}`;

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: `${prod.tamilName} | ${prod.name}`,
      alternateName: prod.tamilName,
      description: prod.shortDescription,
      sku: prod.productCode,
      mpn: prod.productCode,
      image: imageUrl,
      brand: {
        '@type': 'Brand',
        name: 'Sri Shakthi Vinayaga Metals',
      },
      category: prod.category,
      material: prod.material,
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
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
          name: 'Sri Shakthi Vinayaga Metals',
        },
      },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
        { '@type': 'ListItem', position: 3, name: prod.category, item: `${SITE_URL}/categories/${prod.categorySlug}` },
        { '@type': 'ListItem', position: 4, name: prod.name, item: canonicalUrl },
      ],
    };

    const preRenderedHtml = `
      <div class="ssvm-prerendered-content" style="min-height: 100vh; background-color: #FAF6ED; color: #262321; font-family: sans-serif;">
        <header style="background-color: #4A1424; color: #FAF6ED; padding: 1rem 1.5rem; border-bottom: 2px solid #C5A15B;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <a href="/" style="color: #FAF6ED; text-decoration: none; font-weight: bold; font-size: 1.25rem;">
              ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் | Sri Shakthi Vinayaga Metals
            </a>
          </div>
        </header>
        <main style="max-width: 1200px; margin: 2rem auto; padding: 0 1rem;">
          <nav aria-label="Breadcrumb" style="font-size: 0.85rem; margin-bottom: 1.5rem; color: #736B66;">
            <a href="/" style="color: #4A1424; text-decoration: none;">Home</a> &gt; 
            <a href="/products" style="color: #4A1424; text-decoration: none;">Products</a> &gt; 
            <a href="/categories/${prod.categorySlug}" style="color: #4A1424; text-decoration: none;">${prod.category}</a> &gt; 
            <span>${prod.tamilName} | ${prod.name}</span>
          </nav>
          <article>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div>
                <img src="${prod.image}" alt="${prod.name} (${prod.productCode}) - Sri Shakthi Vinayaga Metals" style="width: 100%; max-width: 500px; border-radius: 8px; border: 1px solid #C5A15B;" />
              </div>
              <div>
                <span style="display: inline-block; background-color: #380E1B; color: #FAF6ED; font-family: monospace; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem;">${prod.productCode}</span>
                <h1 style="color: #8B1E28; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2;">
                  ${prod.tamilName}
                </h1>
                <h2 style="color: #262321; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
                  ${prod.name}
                </h2>
                <p style="color: #51463E; font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
                  ${prod.shortDescription}
                </p>
                <div style="background-color: #FAF3E0; padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; font-size: 0.875rem;">
                  <p><strong>Material:</strong> ${prod.material}</p>
                  <p style="margin-top: 0.25rem;"><strong>Dimensions:</strong> ${prod.dimensions}</p>
                  <p style="margin-top: 0.25rem;"><strong>Weight:</strong> ${prod.weight}</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                  <a href="/request-quote?product=${encodeURIComponent(prod.name)}&code=${encodeURIComponent(prod.productCode)}" style="background-color: #8B1E28; color: #FAF6ED; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px; font-weight: 600;">Request Quotation</a>
                  <a href="https://wa.me/919842212345?text=${encodeURIComponent(`Enquiry for ${prod.name} (${prod.productCode})`)}" style="background-color: #10B981; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px; font-weight: 600;">Enquire on WhatsApp</a>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    `;

    const html = generateHtml({
      template,
      title,
      description,
      canonicalUrl,
      imageUrl,
      schemaJson: [productSchema, breadcrumbSchema],
      preRenderedBodyHtml: preRenderedHtml,
    });

    writeStaticFile(route, html);
  });

  // 4. Generate Product Aliases
  PRODUCT_ALIASES.forEach(({ alias, target }) => {
    const targetProduct = TEMPLE_PRODUCTS.find((p) => p.slug === target);
    if (!targetProduct) return;

    const route = `/products/${alias}`;
    const canonicalUrl = `${SITE_URL}/products/${target}`;
    const title = `${targetProduct.name} | Sri Shakthi Vinayaga Metals`;
    const description = targetProduct.shortDescription;

    const html = generateHtml({
      template,
      title,
      description,
      canonicalUrl,
      imageUrl: `${SITE_URL}${targetProduct.image}`,
    });

    writeStaticFile(route, html);
  });

  // 5. Generate 404 page
  const notFoundHtml = generateHtml({
    template,
    title: 'Page Not Found (404) | Sri Shakthi Vinayaga Metals',
    description: 'The requested temple metal product page was not found.',
    canonicalUrl: `${SITE_URL}/404`,
    noindex: true,
  });
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf8');
  console.log('[Static Prerender] Generated: /404.html');

  console.log('✅ Static SEO prerendering completed successfully!');
}

runStaticPrerender();
