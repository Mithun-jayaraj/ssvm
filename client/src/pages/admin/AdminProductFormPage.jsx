import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import {
  createProduct,
  updateProduct,
  getAdminProductById,
  uploadProductImages,
} from '../../services/productService';
import { getCategories } from '../../services/categoryService';

const AdminProductFormPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    productCode: '',
    category: '',
    material: 'Brass',
    dimensions: '',
    weight: '',
    finish: 'Traditional Antique Brass Polish',
    shortDescription: '',
    fullDescription: '',
    customizationAvailable: true,
    isFeatured: false,
    status: 'published',
    seoTitle: '',
    seoDescription: '',
  });

  const [specifications, setSpecifications] = useState([
    { label: 'Crafting Technique', value: 'Traditional Lost-Wax Casting & Chasing' },
    { label: 'Deity Suitability', value: 'Sanctum Sanctorum & Utsavar' },
  ]);

  const [imageGallery, setImageGallery] = useState([]);
  const [primaryImage, setPrimaryImage] = useState('');

  // Fetch categories and product data if editing
  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await getCategories();
        if (catRes.data) {
          setCategories(catRes.data);
          if (!isEditing && catRes.data.length > 0) {
            setFormData((prev) => ({ ...prev, category: catRes.data[0]._id }));
          }
        }

        if (isEditing) {
          setLoading(true);
          const prodRes = await getAdminProductById(id);
          if (prodRes.data) {
            const p = prodRes.data;
            setFormData({
              name: p.name || '',
              productCode: p.productCode || '',
              category: p.category?._id || p.category || '',
              material: p.material || 'Brass',
              dimensions: p.dimensions || '',
              weight: p.weight || '',
              finish: p.finish || 'Traditional Antique Brass Polish',
              shortDescription: p.shortDescription || '',
              fullDescription: p.fullDescription || '',
              customizationAvailable: p.customizationAvailable !== false,
              isFeatured: Boolean(p.isFeatured),
              status: p.status || 'published',
              seoTitle: p.seoTitle || '',
              seoDescription: p.seoDescription || '',
            });

            if (Array.isArray(p.specifications)) {
              setSpecifications(p.specifications);
            }
            if (Array.isArray(p.imageGallery)) {
              setImageGallery(p.imageGallery);
            }
            setPrimaryImage(p.primaryImage || '');
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to initialize form.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Specification helpers
  const handleAddSpec = () => {
    setSpecifications((prev) => [...prev, { label: '', value: '' }]);
  };

  const handleSpecChange = (index, field, value) => {
    setSpecifications((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveSpec = (index) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  // Image Upload handler
  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadForm = new FormData();
      Array.from(e.target.files).forEach((file) => {
        uploadForm.append('images', file);
      });

      const res = await uploadProductImages(uploadForm);
      if (res.data) {
        setImageGallery((prev) => {
          const combined = [...prev, ...res.data];
          if (!primaryImage && combined.length > 0) {
            setPrimaryImage(combined[0].url);
          }
          return combined;
        });
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSetPrimaryImage = (url) => {
    setPrimaryImage(url);
    setImageGallery((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.url === url,
      }))
    );
  };

  const handleRemoveImage = (index) => {
    setImageGallery((prev) => {
      const removed = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      if (removed.url === primaryImage && remaining.length > 0) {
        setPrimaryImage(remaining[0].url);
      }
      return remaining;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.productCode || !formData.category) {
      setError('Product Name, Product Code, and Category are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        specifications: specifications.filter((s) => s.label.trim() && s.value.trim()),
        imageGallery,
        primaryImage: primaryImage || (imageGallery[0] ? imageGallery[0].url : ''),
      };

      if (isEditing) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/products"
          className="text-xs font-semibold text-maroon-800 hover:text-gold-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <h1 className="font-serif font-bold text-xl text-maroon-950">
          {isEditing ? 'Edit Temple Product' : 'Create New Temple Product'}
        </h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Core Details */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Grand Makara Torana Brass Prabavalayam"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Product Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="productCode"
                placeholder="e.g. SSVM-PB-005"
                value={formData.productCode}
                onChange={handleChange}
                required
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs font-mono font-bold text-maroon-900 focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Material</label>
              <input
                type="text"
                name="material"
                placeholder="e.g. High-Purity Virgin Brass, Copper"
                value={formData.material}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Finish</label>
              <input
                type="text"
                name="finish"
                placeholder="e.g. Traditional Antique Polish, Gloss Lacquer"
                value={formData.finish}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Dimensions</label>
              <input
                type="text"
                name="dimensions"
                placeholder="e.g. Height: 48 inches, Width: 36 inches"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Weight</label>
              <input
                type="text"
                name="weight"
                placeholder="e.g. Approx. 24 kg"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Descriptions */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
            2. Descriptions & Text
          </h2>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Short Description (Card summary)
            </label>
            <input
              type="text"
              name="shortDescription"
              placeholder="Brief 1-2 sentence overview for catalogue cards"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Full Product Description
            </label>
            <textarea
              name="fullDescription"
              rows={4}
              placeholder="Comprehensive details on iconographic carving, Agama compliance, materials, and temple installation..."
              value={formData.fullDescription}
              onChange={handleChange}
              className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
            ></textarea>
          </div>
        </div>

        {/* Card 3: Image Gallery & Uploads */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
            3. Product Images (Cloudinary / Storage)
          </h2>

          {/* Upload Drop Zone */}
          <div className="border-2 border-dashed border-gold-600/40 rounded-xl p-6 text-center bg-[#FAF6ED] space-y-2">
            <Upload className="w-8 h-8 text-gold-700 mx-auto" />
            <p className="text-xs font-semibold text-charcoal">
              Upload High-Resolution Product Images
            </p>
            <p className="text-[11px] text-charcoal-muted">
              Select multiple JPEG, PNG, or WEBP photos. Images will be processed and optimized.
            </p>
            <label className="inline-block mt-2 px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs rounded cursor-pointer transition-colors">
              <span>{uploadingImages ? 'Uploading...' : 'Select Photos'}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="hidden"
              />
            </label>
          </div>

          {/* Gallery Thumbnails List */}
          {imageGallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {imageGallery.map((img, index) => {
                const isPrimary = img.url === primaryImage;
                return (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden border-2 aspect-square group ${
                      isPrimary ? 'border-gold-600 ring-2 ring-gold-400' : 'border-beige'
                    }`}
                  >
                    <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />

                    {isPrimary && (
                      <div className="absolute top-2 left-2 bg-gold-600 text-maroon-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                        Primary
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimaryImage(img.url)}
                          className="p-1.5 bg-gold-600 text-maroon-950 rounded-full text-xs"
                          title="Set as primary"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-1.5 bg-red-600 text-white rounded-full text-xs"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Card 4: Technical Specifications */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gold-600/20">
            <h2 className="font-serif font-bold text-sm text-maroon-950">
              4. Technical & Iconographic Specifications
            </h2>
            <button
              type="button"
              onClick={handleAddSpec}
              className="text-xs font-semibold text-maroon-800 hover:text-gold-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Specification</span>
            </button>
          </div>

          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Label (e.g. Sheet Gauge, Deity Compatibility)"
                  value={spec.label}
                  onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                  className="w-1/3 bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                />
                <input
                  type="text"
                  placeholder="Specification Value"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                  className="flex-1 bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(index)}
                  className="p-1.5 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Publication Status & Badges */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
            5. Publication & Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Catalogue Publication Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none"
              >
                <option value="published">Published (Visible to Customers)</option>
                <option value="draft">Draft (Hidden from Public)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 accent-gold-600 cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-xs font-semibold text-charcoal cursor-pointer">
                Mark as Featured Product on Homepage
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="customizationAvailable"
                name="customizationAvailable"
                checked={formData.customizationAvailable}
                onChange={handleChange}
                className="w-4 h-4 accent-gold-600 cursor-pointer"
              />
              <label htmlFor="customizationAvailable" className="text-xs font-semibold text-charcoal cursor-pointer">
                Custom Sizing Available for this item
              </label>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/admin/products"
            className="px-5 py-2.5 bg-white border border-charcoal-muted/30 text-charcoal hover:bg-beige text-xs font-semibold rounded-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs rounded-lg shadow flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Product...' : isEditing ? 'Update Product' : 'Save & Publish Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductFormPage;
