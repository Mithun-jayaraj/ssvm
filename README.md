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
