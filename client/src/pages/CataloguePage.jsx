import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { getProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

const MATERIALS = ['All', 'Brass', 'Copper', 'Bronze', 'Panchaloha', 'Silver'];

const CataloguePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filter states initialized from URL params
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentMaterial = searchParams.get('material') || 'All';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Load categories list for filter pills
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.data) setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch products from backend based on filters
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 12,
          sort: currentSort,
        };

        if (currentCategory && currentCategory !== 'all') {
          params.category = currentCategory;
        }

        if (currentMaterial && currentMaterial !== 'All') {
          params.material = currentMaterial;
        }

        if (currentSearch && currentSearch.trim()) {
          params.search = currentSearch.trim();
        }

        const res = await getProducts(params);
        if (res.data) {
          setProducts(res.data);
          setTotalProducts(res.total || 0);
          setTotalPages(res.totalPages || 1);
        }
      } catch (err) {
        console.error('Failed to load products from API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [currentCategory, currentSearch, currentMaterial, currentSort, currentPage]);

  // Update URL search params helper
  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '' || val === 'all' || val === 'All') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    // Reset to page 1 on filter changes unless changing page
    if (!('page' in updates)) {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    currentCategory !== 'all' ||
    Boolean(currentSearch) ||
    currentMaterial !== 'All' ||
    currentSort !== 'newest';

  return (
    <div className="relative bg-[#FAF6ED] min-h-screen py-10 overflow-hidden">
      {/* Faded Temple Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/temple_categories_bg.jpg"
          alt="South Indian Temple Gopuram Background"
          className="w-full h-full object-cover object-[center_25%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/80 via-[#FAF6ED]/30 to-[#FAF6ED]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Sri Shakthi Vinayaga Metals • Tirupur
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
            Temple Products Catalogue
          </h1>
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-3"></div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Browse our authentic temple metalware models. Select items to request an official manufacturer quotation.
          </p>
        </div>

        {/* Search & Main Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-gold-600/30 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by product name, code (e.g. SSVM-PB-001), or keyword..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg pl-10 pr-24 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              />
              <Search className="w-4 h-4 text-gold-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs rounded transition-colors"
              >
                Search
              </button>
            </form>

            {/* Material & Sort Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Material Dropdown */}
              <div className="flex-1 md:flex-initial">
                <select
                  value={currentMaterial}
                  onChange={(e) => updateParams({ material: e.target.value })}
                  className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                >
                  <option value="All">All Materials</option>
                  {MATERIALS.filter((m) => m !== 'All').map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex-1 md:flex-initial">
                <select
                  value={currentSort}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              type="button"
              onClick={() => updateParams({ category: 'all' })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                currentCategory === 'all'
                  ? 'bg-maroon-800 text-gold-300 font-semibold shadow-xs'
                  : 'bg-[#FAF6ED] text-charcoal hover:bg-beige border border-gold-600/30'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => updateParams({ category: cat.slug })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                  currentCategory === cat.slug
                    ? 'bg-maroon-800 text-gold-300 font-semibold shadow-xs'
                    : 'bg-[#FAF6ED] text-charcoal hover:bg-beige border border-gold-600/30'
                }`}
              >
                {cat.isPrimary && <Sparkles className="w-3 h-3 text-gold-600" />}
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className="text-[10px] opacity-75">({cat.productCount})</span>
                )}
              </button>
            ))}
          </div>

          {/* Active Filter summary & clear button */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-beige text-xs text-charcoal-muted">
              <span>
                Showing results for active filters • {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} found
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-maroon-800 hover:underline font-semibold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Grid / Loading / Empty State */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <EmptyState onReset={handleClearFilters} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateParams({ page: currentPage - 1 })}
                  disabled={currentPage <= 1}
                  className="p-2 rounded border border-gold-600/40 bg-white text-charcoal hover:bg-beige disabled:opacity-40 transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => updateParams({ page: pNum })}
                      className={`w-9 h-9 rounded text-xs font-semibold transition-colors ${
                        currentPage === pNum
                          ? 'bg-maroon-800 text-gold-300'
                          : 'bg-white border border-gold-600/40 text-charcoal hover:bg-beige'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => updateParams({ page: currentPage + 1 })}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded border border-gold-600/40 bg-white text-charcoal hover:bg-beige disabled:opacity-40 transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CataloguePage;
