import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Crown,
  FileText,
} from 'lucide-react';
import { getCategories } from '../services/categoryService';
import { getProducts } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import OrnamentalDivider from '../components/common/OrnamentalDivider';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO, getCategorySEO, buildBreadcrumbSchema } from '../utils/seoConfig';

const FALLBACK_CATEGORIES = [
  {
    _id: 'cat-1',
    name: 'Prabavalayam',
    tamilName: 'பிரபாவளையம்',
    slug: 'prabavalayam',
    isPrimary: true,
    description: 'Traditional handcrafted deity arches, makara torana prabhavali, and sacred temple aureoles.',
    tamilDescription: 'கோவில் தெய்வங்களுக்காக வடிவமைக்கப்படும் பாரம்பரிய அலங்கார வளைவு மற்றும் மகர தோரண பிரபாவளையம்.',
    image: '/images/cat_prabavalayam.jpg',
    productCount: 4,
  },
  {
    _id: 'cat-2',
    name: 'Kalasam',
    tamilName: 'கலசம்',
    slug: 'kalasam',
    isPrimary: true,
    description: 'Sacred temple gopuram kalasams, stupi pinnacles, and sanctum kumbhabhishekam vessels.',
    tamilDescription: 'கோவில் கோபுர கலசம், ஸ்தூபி கலசங்கள் மற்றும் கும்பாபிஷேக புனித பாத்திரங்கள்.',
    image: '/images/cat_kalasam.jpg',
    productCount: 4,
  },
  {
    _id: 'cat-3',
    name: 'Temple Flag Pole',
    tamilName: 'கோவில் கொடிமரம்',
    slug: 'temple-flag-pole',
    isPrimary: true,
    description: 'Heavy gauge brass and copper Kodimaram mast cladding, stepped pedestals, and Bali Peedam coverings.',
    tamilDescription: 'கனரக பித்தளை மற்றும் செப்பு கொடிமர உறைகள், பீடங்கள் மற்றும் பலிபீட கவசங்கள்.',
    image: '/images/cat_kodimaram.jpg',
    productCount: 3,
  },
  {
    _id: 'cat-4',
    name: 'Temple Bell',
    tamilName: 'கோவில் மணி',
    slug: 'temple-bell',
    isPrimary: true,
    description: 'Cast bell metal temple bells, hanging bells (Ghanta), hand bells, and acoustic sacred chimes.',
    tamilDescription: 'பாரம்பரிய வெண்கல மற்றும் பித்தளை கோவில் மணிகள், தொங்கு மணிகள் மற்றும் பூஜை கைமணிகள்.',
    image: '/images/cat_temple_bell.jpg',
    productCount: 4,
  },
  {
    _id: 'cat-5',
    name: 'Kavacham',
    tamilName: 'கவசம்',
    slug: 'kavacham',
    isPrimary: false,
    description: 'Sacred deity armor, thirumugam, padam, and gold-finish consecrated temple protective coverings.',
    tamilDescription: 'சுவாமி திருமேனி கவசங்கள், பாத கவசம், திருக்கர கவசம் மற்றும் தங்க முலாம் பூசப்பட்ட ஆலய கவசங்கள்.',
    image: '/images/real_kavacham.jpg',
    productCount: 4,
  },
  {
    _id: 'cat-6',
    name: 'Deity Idols',
    tamilName: 'சுவாமி சிலைகள்',
    slug: 'deity-idols',
    isPrimary: false,
    description: 'Cast brass, bronze, and panchaloha vigrahams of Lord Ganesha, Murugan, Shiva Nataraja, and Amman.',
    tamilDescription: 'ஆகம சிற்ப விதிப்படி வார்க்கப்பட்ட விநாயகர், முருகன், நடராஜர் மற்றும் அம்மன் பித்தளை மற்றும் ஐம்பொன் சிலைகள்.',
    image: '/images/deityidols.jpg',
    productCount: 4,
  },
];

const EXCLUDED_CATEGORY_SLUGS = ['brass-lamps', 'pooja-vessels', 'temple-accessories'];

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeParams = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const { isBilingual, getLocalizedCategory, t } = useLanguage();

  const MATERIALS = [
    { label: t('catalogue.allMaterials'), value: 'All' },
    { label: 'Brass', value: 'Brass' },
    { label: 'Copper', value: 'Copper' },
    { label: 'Bronze', value: 'Bronze' },
    { label: 'Panchaloha', value: 'Panchaloha' },
    { label: 'Silver', value: 'Silver' },
  ];

  // Active category can come from route params or query string
  const currentCategorySlug =
    routeParams.categorySlug || routeParams.slug || searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentMaterial = searchParams.get('material') || 'All';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Redirect if an excluded category slug is accessed
  useEffect(() => {
    if (EXCLUDED_CATEGORY_SLUGS.includes(currentCategorySlug)) {
      navigate('/categories', { replace: true });
    }
  }, [currentCategorySlug, navigate]);

  // 1. Fetch categories from backend
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.data && res.data.length > 0) {
          const filtered = res.data.filter((c) => !EXCLUDED_CATEGORY_SLUGS.includes(c.slug));
          setCategories(filtered);
        }
      } catch (err) {
        console.warn('API categories unavailable, using fallback categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCats();
  }, []);

  // 2. Fetch products according to category and filters
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoadingProducts(true);
      try {
        const params = {
          page: currentPage,
          limit: 12,
        };
        if (currentCategorySlug && currentCategorySlug !== 'all') {
          params.category = currentCategorySlug;
        }
        if (currentSearch) {
          params.search = currentSearch;
        }
        if (currentMaterial && currentMaterial !== 'All') {
          params.material = currentMaterial;
        }
        if (currentSort) {
          params.sort = currentSort;
        }

        const res = await getProducts(params);
        if (res.data) {
          setProducts(res.data);
          setTotalProducts(res.total || res.data.length);
          setTotalPages(res.totalPages || 1);
        }
      } catch (err) {
        console.warn('Backend API unavailable, using local filtered state:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchCategoryProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCategorySlug, currentSearch, currentMaterial, currentSort, currentPage]);

  // Helper to update query params
  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '' || val === 'all' || val === 'All') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    if (!('page' in updates)) {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const handleSelectCategory = (slug) => {
    updateParams({ category: slug, page: 1 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const selectedCategoryObj = categories.find((c) => c.slug === currentCategorySlug);
  const activeCatLoc = selectedCategoryObj ? getLocalizedCategory(selectedCategoryObj) : null;

  // Determine SEO Metadata & Breadcrumbs dynamically
  const isCategoryView = currentCategorySlug && currentCategorySlug !== 'all';
  const pageSeo = isCategoryView && selectedCategoryObj
    ? getCategorySEO(currentCategorySlug, selectedCategoryObj.name, selectedCategoryObj.tamilName)
    : PAGE_SEO.products;

  const breadcrumbItems = isCategoryView && selectedCategoryObj
    ? [
        { name: 'Home', url: '/' },
        { name: 'Categories', url: '/categories' },
        { name: activeCatLoc?.primaryName || selectedCategoryObj.name, url: `/categories/${selectedCategoryObj.slug}` },
      ]
    : [
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/products' },
      ];

  const hasActiveFilters =
    (currentCategorySlug && currentCategorySlug !== 'all') ||
    Boolean(currentSearch) ||
    currentMaterial !== 'All' ||
    currentSort !== 'newest';

  return (
    <div className="relative bg-[#FAF6ED] min-h-screen py-10 font-sans overflow-hidden">
      <SEOHead
        title={pageSeo.title}
        description={pageSeo.description}
        keywords={pageSeo.keywords}
        canonical={pageSeo.canonical}
        schema={[buildBreadcrumbSchema(breadcrumbItems)]}
      />

      {/* Faded Temple Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/temple_categories_bg.jpg"
          alt="South Indian Temple Gopuram Background - Sri Shakthi Vinayaga Metals"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-[center_25%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/80 via-[#FAF6ED]/30 to-[#FAF6ED]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-charcoal-muted">
          <Link to="/" className="hover:text-maroon-800">
            {isBilingual ? (
              <>
                <span className="font-tamil">முகப்பு</span> | Home
              </>
            ) : (
              <span>{t('nav.home')}</span>
            )}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
          <Link to="/products" className="hover:text-maroon-800">
            {isBilingual ? (
              <>
                <span className="font-tamil">தயாரிப்புகள்</span> | Products
              </>
            ) : (
              <span>{t('nav.products')}</span>
            )}
          </Link>
          {isCategoryView && selectedCategoryObj && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
              <span className="font-semibold text-maroon-800 truncate">
                {isBilingual
                  ? (selectedCategoryObj.tamilName ? `${selectedCategoryObj.tamilName} | ${selectedCategoryObj.name}` : selectedCategoryObj.name)
                  : (activeCatLoc?.primaryName || selectedCategoryObj.name)}
              </span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            {t('hero.badge')}
          </span>
          <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#8B1E28] tracking-tight">
            {isCategoryView && selectedCategoryObj
              ? (isBilingual
                  ? (selectedCategoryObj.tamilName ? `${selectedCategoryObj.tamilName} | ${selectedCategoryObj.name}` : selectedCategoryObj.name)
                  : (activeCatLoc?.primaryName || selectedCategoryObj.name))
              : (isBilingual
                  ? 'கோவில் உலோகத் தயாரிப்புகள் பட்டியல் | Temple Metal Products Catalogue'
                  : t('categories.title'))}
          </h1>
          <h2 className="font-serif font-bold text-base sm:text-xl text-[#262321] tracking-wide">
            {isCategoryView && selectedCategoryObj
              ? (isBilingual ? (selectedCategoryObj.tamilDescription || selectedCategoryObj.description) : (activeCatLoc?.description || selectedCategoryObj.description))
              : t('categories.subtitle')}
          </h2>
          <OrnamentalDivider />
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            {isCategoryView && selectedCategoryObj
              ? selectedCategoryObj.description
              : t('categories.tagline')}
          </p>
        </div>

        {/* Category Tabs / Switcher Pill Bar */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-gold-600/30 shadow-xs space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-serif font-bold text-[#8B1E28] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{t('categories.selectCategory')}</span>
            </span>
            {currentCategorySlug !== 'all' && (
              <button
                type="button"
                onClick={() => handleSelectCategory('all')}
                className="text-xs text-gold-800 hover:text-maroon-800 font-semibold underline font-serif"
              >
                {t('categories.showAll')}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {/* All Categories Button */}
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs shrink-0 text-center font-serif ${currentCategorySlug === 'all'
                ? 'bg-[#8B1E28] text-gold-200 border border-[#8B1E28]'
                : 'bg-[#FAF6ED] text-charcoal hover:bg-gold-100 border border-gold-600/30'
                }`}
            >
              <span className="font-bold block leading-tight">
                {t('common.allCategories')}
              </span>
            </button>

            {/* Individual Category Buttons */}
            {categories.map((cat) => {
              const isActive = currentCategorySlug === cat.slug;
              const catLoc = getLocalizedCategory(cat);
              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs shrink-0 flex items-center gap-1.5 text-center font-serif ${isActive
                    ? 'bg-[#8B1E28] text-gold-200 border border-[#8B1E28]'
                    : 'bg-[#FAF6ED] text-charcoal hover:bg-gold-100 border border-gold-600/30'
                    }`}
                >
                  {cat.isPrimary && <Crown className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
                  <div>
                    <span className="font-bold block leading-tight">
                      {catLoc.primaryName}
                    </span>
                    {isBilingual && catLoc.secondaryName && (
                      <span className="text-[10px] block opacity-85">{catLoc.secondaryName}</span>
                    )}
                  </div>
                  {cat.productCount !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ml-1 ${isActive ? 'bg-gold-400/20 text-gold-200' : 'bg-gray-200 text-charcoal-muted'
                        }`}
                    >
                      {cat.productCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Banner */}
        {selectedCategoryObj && (
          <div className="bg-gradient-to-r from-[#2B0711] via-[#4A1424] to-[#2B0711] text-white p-6 sm:p-8 rounded-2xl border-2 border-gold-600/40 shadow-card-elevated flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-serif font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('categories.selectedCategory')}</span>
              </div>
              <div>
                <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-gold-300 tracking-wide">
                  {getLocalizedCategory(selectedCategoryObj).primaryName}
                </h2>
                {isBilingual && (
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#FAF6ED] mt-0.5">
                    {selectedCategoryObj.name}
                  </h3>
                )}
              </div>
              {getLocalizedCategory(selectedCategoryObj).description && (
                <p className="text-xs sm:text-sm text-[#FAF6ED]/85 max-w-xl leading-relaxed">
                  {getLocalizedCategory(selectedCategoryObj).description}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to={`/request-quote?category=${encodeURIComponent(selectedCategoryObj.name)}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-xs rounded shadow flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t('common.requestQuotation')}</span>
              </Link>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-gold-600/30 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#FAF6ED] text-xs px-3.5 py-2.5 rounded-lg border border-gold-600/40 focus:outline-none focus:border-gold-600 pl-9"
            />
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  updateParams({ search: '' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-maroon-800"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Material Filters Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-serif font-semibold text-charcoal shrink-0">
              {t('common.material')}:
            </label>
            <select
              value={currentMaterial}
              onChange={(e) => updateParams({ material: e.target.value, page: 1 })}
              className="bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
            >
              {MATERIALS.map((mat) => (
                <option key={mat.value} value={mat.value}>
                  {mat.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-maroon-800 hover:text-maroon-950 font-semibold underline shrink-0 font-serif"
              >
                {t('categories.clearFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div>
          {loadingProducts ? (
            <ProductGridSkeleton count={8} />
          ) : products.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => updateParams({ page: currentPage - 1 })}
                    className="p-2 rounded border border-gold-600/40 bg-white hover:bg-gold-50 disabled:opacity-40"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold px-4 text-charcoal">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => updateParams({ page: currentPage + 1 })}
                    className="p-2 rounded border border-gold-600/40 bg-white hover:bg-gold-50 disabled:opacity-40"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
