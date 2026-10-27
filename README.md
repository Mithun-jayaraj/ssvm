# Sri Shakthi Vinayaga Metals
## Premium Temple Products Catalogue & Manufacturer Enquiry Platform (MERN Stack)

**Sri Shakthi Vinayaga Metals** is a manufacturer catalogue and quotation platform for traditional temple metalware based in **Tirupur, Tamil Nadu, India**.

This platform is specifically designed as a **manufacturer catalogue and enquiry platform** (NOT an e-commerce checkout store). It enables temple trust boards, sthapatis, pooja stores, contractors, wholesalers, architects, and patrons across India to discover temple products, explore authentic specifications, and directly connect with the manufacturer for custom sizing, bulk enquiries, and official quotations.

---

## 🏛️ Key Features

### 1. Traditional South Indian Temple Craftsmanship Aesthetic
- **Color Palette**: Deep Maroon (`#4A1424`), Antique Gold (`#C5A15B`), Warm Ivory (`#FAF6ED`), Charcoal (`#262321`), and Soft Beige (`#EDE4D5`).
- **Typography**: Classical serif headings (`Cinzel` & `Cormorant Garamond`) paired with modern sans-serif (`Plus Jakarta Sans`).
- **Core Focus**: Dedicated highlights for **Prabavalayam** (temple deity arches) and **Kalasam** (temple gopuram pinnacles) as primary product lines.

### 2. Public Catalogue & Detail Discovery
- Dynamic product catalogue powered by MongoDB with real-time searching by name and product code (e.g., `SSVM-PB-001`).
- Filtering by category (Prabavalayam, Kalasam, Goddess Statues, Deity Statues, Temple Accessories, Brass Pooja Products, Copper Products, Silver Products, Custom Metalwork).
- Material filtering (Brass, Copper, Bronze, Panchaloha, Silver).
- Product detail pages with image galleries, zoom preview, technical specifications table, and customization flags.
- **WhatsApp Integration**: One-click WhatsApp enquiry buttons pre-filling product name, product code, and URL.

### 3. Multi-Product Quotation Request System
- Quotation builder allowing customers to request quotes for single or multiple items simultaneously.
- Customer details collection: Name, Organization / Temple Trust, Phone, Email, City, State, Customer Type (Temple, Dealer, Contractor, Individual, etc.).
- Material & sizing preferences, custom inscriptions, and blueprint / reference image uploads.
- Unique enquiry reference code generation (e.g., `SSVM-2026-XXXX`).
- Anti-spam rate limiting and validation.

### 4. Comprehensive Administrator Management Portal
- Protected Admin routes with JWT authentication and secure session cookies.
- **Dashboard Overview**: Metrics on published vs. draft products, categories, new enquiries, and pending quotations.
- **Product Management**: Full CRUD operations, image upload support (Cloudinary with local storage fallback), primary image selection, and specifications builder.
- **Category Management**: Create, edit, reorder, and activate/deactivate categories.
- **Quotation Workflow**: Search and filter customer enquiries, update status (`New`, `Contacted`, `Quotation Prepared`, `Quotation Sent`, `Negotiation`, `Converted`, `Closed`), record quotation amount (INR) and validity, and maintain internal private notes.
- **CSV Export**: Instant export of enquiry records for spreadsheet reporting.
- **Settings**: Update Tirupur address, phone numbers, WhatsApp contact, announcement notices, and company profile.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), React Router DOM, Tailwind CSS, Lucide React, Axios, Framer Motion.
- **Backend**: Node.js, Express.js (MVC architecture), Mongoose, JWT, bcryptjs, Multer, Helmet, CORS, Express-Rate-Limit.
- **Database**: MongoDB (Local or MongoDB Atlas).
- **Image Storage**: Cloudinary (with automatic fallback to local disk storage when Cloudinary credentials are not set).

---

## 📁 Project Structure

```text
sri-shakthi-vinayaga-metals/
├── client/
│   ├── public/
│   │   └── favicon.svg              # Temple Kalasam emblem favicon
│   ├── src/
│   │   ├── components/common/       # Navbar, Footer, ProductCard, CategoryCard, Drawer, etc.
│   │   ├── context/                 # AuthContext, SettingsContext, QuotationContext
│   │   ├── pages/                   # Home, Catalogue, Detail, RequestQuote, Custom, About, Contact
│   │   ├── pages/admin/             # Login, Layout, Dashboard, Products, Categories, Enquiries, Settings
│   │   ├── services/                # Axios API service clients
│   │   ├── App.jsx                  # Main application routes
│   │   ├── main.jsx                 # Vite React root
│   │   └── index.css                # Tailwind CSS and temple theme tokens
│   ├── index.html                   # SEO tags, OpenGraph, Google Fonts
│   ├── tailwind.config.js           # Brand color tokens & typography
│   ├── vite.config.js               # Proxy configuration
│   └── package.json
│
├── server/
│   ├── config/                      # db.js (MongoDB), cloudinary.js
│   ├── controllers/                 # product, category, enquiry, adminAuth, settings
│   ├── middleware/                  # auth.js, upload.js, errorHandler.js
│   ├── models/                      # Admin, Category, Product, Enquiry, BusinessSettings
│   ├── routes/                      # API endpoint routes
│   ├── scripts/                     # seed.js (Admin user, categories, products, sample enquiry)
│   ├── uploads/                     # Local image uploads directory (fallback)
│   ├── app.js                       # Express app configuration
│   ├── server.js                    # Server entry point
│   ├── .env.example
│   └── package.json
│
├── package.json                     # Root orchestrator scripts
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** v18+ (tested on v22)
- **MongoDB** (Local instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)

### 2. Configure Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/sri_shakthi_vinayaga_metals
JWT_SECRET=ssvm_temple_secret_key_2026_production_grade
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# Optional: Cloudinary credentials (if unset, local storage fallback is used)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Seed Admin Credentials
ADMIN_DEFAULT_EMAIL=admin@ssvmmetals.com
ADMIN_DEFAULT_PASSWORD=Admin@SSVM2026!
ADMIN_DEFAULT_NAME=Sri Shakthi Vinayaga Metals Admin
```

**Frontend (`client/.env` - optional in development due to Vite proxy):**
```env
VITE_API_BASE_URL=/api
```

### 3. Install Dependencies & Seed Database

```bash
# In server directory:
cd server
npm install
npm run seed     # Populates admin user, categories, and authentic temple products
npm run dev      # Starts Express backend on port 5000

# In client directory:
cd ../client
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🔐 Administrator Portal Access

- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@ssvmmetals.com`
- **Password**: `Admin@SSVM2026!`

*(You can update your credentials or create additional administrators via the seed script or directly in MongoDB).*

---

## 🌐 Production Deployment Guide

### A. Database (MongoDB Atlas)
1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com/).
2. Create a database user and whitelist network access (`0.0.0.0/0` or your backend host IP).
3. Copy the connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/ssvm_production?retryWrites=true&w=majority`.
4. Set this as `MONGODB_URI` in your backend environment variables.

### B. Image Storage (Cloudinary)
1. Sign up at [cloudinary.com](https://cloudinary.com/).
2. Obtain your **Cloud Name**, **API Key**, and **API Secret** from the Cloudinary dashboard.
3. Add them to your server environment variables (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

### C. Backend Deployment (Render / Railway / DigitalOcean)
1. Deploy the `server` folder as a Node.js web service.
2. Build command: `npm install`
3. Start command: `node server.js`
4. Configure environment variables (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, Cloudinary variables).
5. Run the seed script once if initializing a fresh database: `node scripts/seed.js`.

### D. Frontend Deployment (Vercel)
1. Import the `client` folder into [Vercel](https://vercel.com/).
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable: `VITE_API_BASE_URL=https://your-backend-domain.onrender.com/api`

---

## 📋 Production Smoke-Test Checklist

- [x] Homepage loads with brand identity, announcement bar, and hero section.
- [x] Prabavalayam and Kalasam specializations prominently featured.
- [x] Product catalogue queries published items from MongoDB.
- [x] Filtering by category, material, and search queries work correctly.
- [x] Product detail pages display technical specifications, image gallery, and zoom.
- [x] Multi-product quotation tray allows adding, quantity adjustments, and submission.
- [x] Quotation requests are saved in MongoDB and generate unique reference numbers (`SSVM-2026-XXXX`).
- [x] WhatsApp links format customer and product details with URI encoding.
- [x] Admin login authenticates securely using bcrypt and JWT.
- [x] Admin dashboard displays accurate pipeline metrics.
- [x] Admin can update quotation statuses, enter quotation amounts, and append internal notes.
- [x] CSV export generates an Excel-compatible report of all enquiries.
- [x] No online payment checkout or unverified claims present.

---

## 🔍 Search Engine Optimization (SEO) & Web Visibility Architecture

Sri Shakthi Vinayaga Metals is built with an enterprise-grade Technical and Local SEO foundation designed to dominate organic Google search results for traditional temple metalware, custom castings, and consecration items across Tamil Nadu and India.

### 1. Technical SEO Specifications
- **Dynamic Head Management**: [`SEOHead.jsx`](file:///c:/Users/Mithun/Desktop/sri%20shakthi%20vinayaga%20metals/client/src/components/common/SEOHead.jsx) actively manages page `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`, OpenGraph, Twitter Cards, robots directives, and JSON-LD structured data.
- **Static Prerendering Engine**: [`client/scripts/generate-static-seo.js`](file:///c:/Users/Mithun/Desktop/sri%20shakthi%20vinayaga%20metals/client/scripts/generate-static-seo.js) runs automatically during `npm run build`. It generates static HTML files in `client/dist/` for every public page, category, and individual product URL. This guarantees search engine crawlers (Googlebot, Bingbot) and social media scrapers (WhatsApp, Facebook) receive 100% crawlable semantic HTML and JSON-LD even without executing JavaScript.
- **Crawler Directives**: [`client/public/robots.txt`](file:///c:/Users/Mithun/Desktop/sri%20shakthi%20vinayaga%20metals/client/public/robots.txt) enables full search engine indexing across all public products and categories while blocking administrative endpoints (`/admin`, `/api/admin`).
- **XML Sitemap**: [`client/public/sitemap.xml`](file:///c:/Users/Mithun/Desktop/sri%20shakthi%20vinayaga%20metals/client/public/sitemap.xml) contains 28 canonical URLs with exact `lastmod`, `changefreq`, and `priority` weightings.
- **Short URL Aliases**: Clean, canonical aliases for primary products:
  - `/products/prabavalayam` → Canonical to Grand Makara Torana Brass Prabavalayam
  - `/products/kalasam` → Canonical to Traditional Gopuram Brass Temple Kalasam
  - `/products/kodimaram` → Canonical to Sacred Temple Kodimaram Brass Cladding
  - `/products/kovil-mani` → Canonical to Consecrated Cast Bronze Temple Bell
- **Schema.org Structured Data (JSON-LD)**:
  - `Organization` & `LocalBusiness`: Exact foundry address in Tiruppur, contact points, geo-coordinates (`11.1085, 77.3411`), and opening hours.
  - `WebSite`: Sitelinks Searchbox specification.
  - `BreadcrumbList`: Accurate hierarchical breadcrumbs on all subpages.
  - `Product`: Conforms to quotation-based manufacturing (no fake e-commerce prices, no fabricated reviews; includes genuine material, dimension, weight specifications, and `priceCurrency: "INR"` with custom dimensional quotation notice).

### 2. Frontend Environment Variables
Set the following variables in `client/.env.production` or your hosting provider (e.g. Vercel):

```env
# Canonical production site domain (no trailing slash)
VITE_SITE_URL=https://srishakthivinayagametals.com

# Backend API endpoint URL
VITE_API_BASE_URL=https://api.srishakthivinayagametals.com/api

# Google Analytics 4 Measurement ID (Optional, e.g. G-XXXXXXXXXX)
VITE_GA_MEASUREMENT_ID=
```

---

## 📈 Google Search Console (GSC) Setup Guide

Follow these exact steps once the website is deployed to your production domain:

### Step 1: Verify Domain Ownership
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain** property (recommended) or **URL prefix** property:
   - **Domain Property (Recommended)**: Enter `srishakthivinayagametals.com`. Google will generate a DNS TXT record (e.g., `google-site-verification=XXXXXXXXXXXXXXXXXXXX`). Add this TXT record to your DNS provider (Cloudflare, GoDaddy, Namecheap). Click **Verify**.
   - **URL Prefix (Alternative)**: Enter `https://srishakthivinayagametals.com`. Download the HTML verification file provided by Google (e.g., `google1234567890abcdef.html`) and place it inside `client/public/`, then redeploy. Alternatively, copy the meta tag provided and add it to `client/index.html`.

### Step 2: Submit the XML Sitemap
1. In the left navigation of Google Search Console, click **Sitemaps** under *Indexing*.
2. In the "Add a new sitemap" input, enter:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. Confirm that the status changes to **Success**. GSC will discover all 28 canonical URLs.

### Step 3: Inspect & Request Indexing for Core Pages
1. Use the **URL Inspection** bar at the top of Google Search Console.
2. Test the primary URLs first:
   - `https://srishakthivinayagametals.com/`
   - `https://srishakthivinayagametals.com/products`
   - `https://srishakthivinayagametals.com/products/prabavalayam`
   - `https://srishakthivinayagametals.com/products/kalasam`
   - `https://srishakthivinayagametals.com/custom-manufacturing`
   - `https://srishakthivinayagametals.com/contact`
3. Click **Test Live URL** to confirm that Googlebot can fetch the HTML, see the Schema.org JSON-LD, and render the page.
4. Click **Request Indexing**. *(Note: Google typically crawls and indexes requested pages within 24 to 72 hours. Avoid repeatedly requesting indexing).*

### Step 4: Monitor Indexing & Search Performance
- **Pages Report**: Check weekly for any `404 Not Found`, redirect errors, or canonical mismatches.
- **Performance Report**: Monitor queries related to:
  - *Temple metal products manufacturer in Tamil Nadu*
  - *Prabavalayam manufacturer*
  - *Brass Kalasam manufacturer*
  - *Temple Kodimaram supplier*
  - *Kovil Mani manufacturer*
- **Rich Results Test**: Validate live URLs using [Google Rich Results Test](https://search.google.com/test/rich-results) to verify `Product`, `BreadcrumbList`, and `Organization` schemas.

---

## 📍 Google Business Profile (GBP) Local SEO Guide for Tiruppur

To maximize local enquiries from temple committees, pooja stores, and sthapatis across Tamil Nadu, set up a Google Business Profile:

1. **Sign in to Google Business Profile**: Navigate to [google.com/business](https://www.google.com/business/).
2. **Business Name**: Enter the exact registered name:
   `Sri Shakthi Vinayaga Metals`
3. **Primary Category**:
   - Primary: `Metal fabricator` or `Manufacturer`
   - Additional Categories: `Religious goods store`, `Brassware store`, `Foundry`
4. **Physical Address**:
   - Location: 124, Foundry Road, Near Sivan Temple, Velampalayam, Tiruppur, Tamil Nadu 641652, India.
   - Pin location accurately on the map to match coordinates (`11.1085° N, 77.3411° E`).
5. **Service Area**:
   - Primary: Tiruppur, Coimbatore, Madurai, Thanjavur, Chennai, Salem, Erode.
   - Secondary: All districts of Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana, and Pan-India.
6. **Contact Number**: `+91 98422 12345` (matching the website footer and contact page).
7. **Website Link**: `https://srishakthivinayagametals.com`
8. **Products Section in GBP**:
   - Add catalog items with high-resolution foundry photographs:
     - *Grand Makara Torana Brass Prabavalayam*
     - *Traditional Gopuram Brass Temple Kalasam*
     - *Sacred Temple Kodimaram Brass Cladding*
     - *Consecrated Cast Bronze Kovil Mani*
   - Link each product to its respective website URL (`/products/prabavalayam`, etc.) with a "Get Quote" button.
9. **Verification**: Complete verification via Google's required method (video recording of foundry workshop or postcard verification). Do not claim verification without direct business owner authorization.

---

## 📊 Analytics & Enquiry Tracking

The application includes privacy-safe Google Analytics 4 (GA4) event tracking via [`client/src/services/analytics.js`](file:///c:/Users/Mithun/Desktop/sri%20shakthi%20vinayaga%20metals/client/src/services/analytics.js):

| Event Name | Trigger | Tracked Parameters |
| :--- | :--- | :--- |
| `page_view` | Route navigation | `page_path`, `page_title` |
| `view_item` | Product detail page loaded | `item_id`, `item_name`, `item_category` |
| `begin_quotation` | Clicking "Request Quotation" | `item_id`, `item_name` |
| `whatsapp_enquiry_click` | Clicking "WhatsApp Enquiry" | `item_name`, `product_code`, `source` |
| `generate_lead` | Successful quote or contact form submit | `form_type`, `lead_id`, `items_count` |

*Note: No personal identification data (phone, email, customer name) is sent to analytics to ensure full privacy compliance.*
