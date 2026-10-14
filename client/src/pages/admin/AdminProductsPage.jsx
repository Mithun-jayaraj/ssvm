import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { getAdminProducts, deleteProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      if (res.data) setCategories(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page,
        limit: 15,
      };
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await getAdminProducts(params);
      if (res.data) {
        setProducts(res.data);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [categoryFilter, statusFilter, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadProducts();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        setActionMessage(`Product "${name}" deleted.`);
        loadProducts();
        setTimeout(() => setActionMessage(''), 3000);
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-maroon-950">
            Product Management
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Create, edit, upload images, and manage public catalogue status for temple metalware.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-4 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gold-600/30 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by product name, code (e.g. SSVM-PB-001), or material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg pl-9 pr-20 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
          />
          <Search className="w-4 h-4 text-gold-700 absolute left-3 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-maroon-800 text-gold-300 font-semibold text-xs rounded"
          >
            Filter
          </button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gold-600/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6ED] text-charcoal-muted font-semibold uppercase tracking-wider text-[11px] border-b border-gold-600/20">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Dimensions</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-600/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-charcoal-muted">
                    Loading products catalogue...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-charcoal-muted">
                    No products found matching the criteria.
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const thumb =
                    p.primaryImage ||
                    p.imageGallery?.[0]?.url ||
                    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=150&q=80';

                  return (
                    <tr key={p._id} className="hover:bg-beige-light/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={thumb}
                            alt={p.name}
                            className="w-12 h-12 rounded object-cover border border-gold-600/20 shrink-0"
                          />
                          <div>
                            <span className="font-serif font-bold text-charcoal block line-clamp-1">
                              {p.name}
                            </span>
                            {p.isFeatured && (
                              <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300 font-semibold inline-flex items-center gap-1 mt-0.5">
                                <Sparkles className="w-3 h-3" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-maroon-900">
                        {p.productCode}
                      </td>
                      <td className="py-3 px-4 text-charcoal">
                        {p.category?.name || 'Unassigned'}
                      </td>
                      <td className="py-3 px-4 text-charcoal-muted">{p.material}</td>
                      <td className="py-3 px-4 text-charcoal-muted truncate max-w-xs">
                        {p.dimensions || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            p.status === 'published'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : p.status === 'draft'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {p.status === 'published' && (
                            <Link
                              to={`/products/${p.slug}`}
                              target="_blank"
                              className="p-1 text-charcoal-muted hover:text-maroon-800"
                              title="View on public site"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            to={`/admin/products/edit/${p._id}`}
                            className="p-1 text-gold-700 hover:text-gold-900"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(p._id, p.name)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gold-600/20 flex items-center justify-between text-xs text-charcoal-muted">
            <span>
              Showing Page {page} of {totalPages} ({total} Total Products)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1 bg-[#FAF6ED] border border-gold-600/30 rounded disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1 bg-[#FAF6ED] border border-gold-600/30 rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
