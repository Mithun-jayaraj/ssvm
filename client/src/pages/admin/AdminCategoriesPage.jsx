import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/categoryService';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [catForm, setCatForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    displayOrder: 0,
    isPrimary: false,
    isActive: true,
  });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getAdminCategories();
      if (res.data) setCategories(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setCatForm({
      name: '',
      tamilName: '',
      slug: '',
      description: '',
      tamilDescription: '',
      image: '',
      displayOrder: categories.length + 1,
      isPrimary: false,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat._id);
    setCatForm({
      name: cat.name || '',
      tamilName: cat.tamilName || '',
      slug: cat.slug || '',
      description: cat.description || '',
      tamilDescription: cat.tamilDescription || '',
      image: cat.image || '',
      displayOrder: cat.displayOrder || 0,
      isPrimary: Boolean(cat.isPrimary),
      isActive: Boolean(cat.isActive),
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, catForm);
        setSuccess('Category updated successfully.');
      } else {
        await createCategory(catForm);
        setSuccess('New category created successfully.');
      }
      setModalOpen(false);
      loadCategories();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id, name, productCount) => {
    if (productCount > 0) {
      alert(
        `Cannot delete "${name}" because it currently has ${productCount} assigned products. Please reassign or delete them first.`
      );
      return;
    }

    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await deleteCategory(id);
        setSuccess(`Category "${name}" deleted.`);
        loadCategories();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        alert('Failed to delete category: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-maroon-950">
            Category Management
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Organize temple metalware categories, display hierarchy, and core specializations.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gold-600/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6ED] text-charcoal-muted font-semibold uppercase tracking-wider text-[11px] border-b border-gold-600/20">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">URL Slug</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Specialization</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-600/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-charcoal-muted">
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-charcoal-muted">
                    No categories defined yet.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-beige-light/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-charcoal-muted">
                      #{cat.displayOrder}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-10 h-10 rounded object-cover border border-gold-600/20 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-beige border border-gold-600/20 flex items-center justify-center shrink-0 text-gold-700">
                            <Layers className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="font-tamil font-bold text-sm text-[#8B1E28] block">
                            {cat.tamilName || cat.name}
                          </span>
                          <span className="font-serif font-bold text-xs text-charcoal block">
                            {cat.name}
                          </span>
                          {(cat.tamilDescription || cat.description) && (
                            <span className="text-[11px] text-charcoal-muted line-clamp-1 max-w-xs block">
                              {cat.tamilDescription || cat.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-charcoal-muted">
                      /products?category={cat.slug}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-beige px-2 py-0.5 rounded font-semibold text-charcoal">
                        {cat.productCount || 0} Models
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {cat.isPrimary ? (
                        <span className="text-[10px] bg-gold-100 text-maroon-900 border border-gold-400 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-gold-600" />
                          <span>Core Specialization</span>
                        </span>
                      ) : (
                        <span className="text-charcoal-muted text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          cat.isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="p-1 text-gold-700 hover:text-gold-900"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat._id, cat.name, cat.productCount || 0)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gold-600 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gold-600/30">
              <h3 className="font-serif font-bold text-base text-maroon-950">
                {editingId ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">
                    Category Name (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prabavalayam"
                    value={catForm.name}
                    onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    required
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">
                    பிரிவு பெயர் (Tamil Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. பிரபாவளையம்"
                    value={catForm.tamilName}
                    onChange={(e) => setCatForm({ ...catForm, tamilName: e.target.value })}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600 font-tamil"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">
                  Custom Slug (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Leave blank to auto-generate from name"
                  value={catForm.slug}
                  onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                  className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description for category cards"
                    value={catForm.description}
                    onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">
                    சுருக்க விளக்கம் (Tamil Description)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="அட்டைப் பார்வைக்கான சுருக்கமான விளக்கம்"
                    value={catForm.tamilDescription}
                    onChange={(e) => setCatForm({ ...catForm, tamilDescription: e.target.value })}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600 font-tamil"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">
                  Banner Image URL (Unsplash or Cloudinary)
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Display Order</label>
                  <input
                    type="number"
                    value={catForm.displayOrder}
                    onChange={(e) =>
                      setCatForm({ ...catForm, displayOrder: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPrimaryCat"
                      checked={catForm.isPrimary}
                      onChange={(e) => setCatForm({ ...catForm, isPrimary: e.target.checked })}
                      className="accent-gold-600"
                    />
                    <label htmlFor="isPrimaryCat" className="font-semibold text-charcoal">
                      Core Specialization
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActiveCat"
                      checked={catForm.isActive}
                      onChange={(e) => setCatForm({ ...catForm, isActive: e.target.checked })}
                      className="accent-gold-600"
                    />
                    <label htmlFor="isActiveCat" className="font-semibold text-charcoal">
                      Active on Website
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gold-600/30 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded text-charcoal hover:bg-beige"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold rounded"
                >
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
