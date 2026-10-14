import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  MessageCircle,
  Phone,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';
import { useQuotation } from '../context/QuotationContext';
import { useSettings } from '../context/SettingsContext';

const CUSTOMER_TYPES = [
  'Temple',
  'Dealer',
  'Wholesaler',
  'Pooja Store',
  'Contractor',
  'Individual',
  'Other',
];

const STATES_LIST = [
  'Tamil Nadu',
  'Kerala',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Maharashtra',
  'Gujarat',
  'Delhi',
  'Uttar Pradesh',
  'West Bengal',
  'Rajasthan',
  'Madhya Pradesh',
  'Odisha',
  'Other State',
];

const RequestQuotePage = () => {
  const [searchParams] = useSearchParams();
  const { quotationItems, clearQuote } = useQuotation();
  const { settings, getWhatsAppLink } = useSettings();

  // Prepopulate if single product query passed
  const initialCategoryParam = searchParams.get('category') || '';

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [city, setCity] = useState('');
  const [customerType, setCustomerType] = useState('Temple');
  const [materialPreference, setMaterialPreference] = useState('Brass');
  const [sizeRequirements, setSizeRequirements] = useState('');
  const [customizationDetails, setCustomizationDetails] = useState('');
  const [message, setMessage] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState('WhatsApp');

  // Multi-product items rows
  const [items, setItems] = useState(() => {
    if (quotationItems.length > 0) {
      return quotationItems.map((item) => ({
        product: item.product || null,
        productName: item.productName || '',
        productCode: item.productCode || '',
        quantity: item.quantity || 1,
        requirements: item.requirements || '',
      }));
    }
    return [
      {
        product: null,
        productName: initialCategoryParam
          ? `Custom ${initialCategoryParam.toUpperCase()} Requirement`
          : 'Custom Prabavalayam / Temple Metal Requirement',
        productCode: '',
        quantity: 1,
        requirements: '',
      },
    ];
  });

  // Reference images
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  // Submission States
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedResult, setSubmittedResult] = useState(null);

  const handleAddItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        product: null,
        productName: '',
        productCode: '',
        quantity: 1,
        requirements: '',
      },
    ]);
  };

  const handleRemoveItemRow = (index) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4); // Max 4 files
      setSelectedFiles(filesArray);

      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFilePreviews(previewUrls);
    }
  };

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.customerName = 'Customer full name is required.';
    if (!phone.trim()) {
      errs.phone = 'Contact phone number is required.';
    } else if (!/^[0-9+-\s]{8,16}$/.test(phone.trim())) {
      errs.phone = 'Please provide a valid contact phone number.';
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!city.trim()) errs.city = 'City or town name is required.';
    if (!state.trim()) errs.state = 'State is required.';

    if (items.length === 0 || !items.some((it) => it.productName.trim())) {
      errs.items = 'Please specify at least one product requirement.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('customerName', customerName.trim());
      formData.append('organizationName', organizationName.trim());
      formData.append('phone', phone.trim());
      formData.append('email', email.trim());
      formData.append('state', state);
      formData.append('city', city.trim());
      formData.append('customerType', customerType);
      formData.append('materialPreference', materialPreference);
      formData.append('sizeRequirements', sizeRequirements.trim());
      formData.append('customizationDetails', customizationDetails.trim());
      formData.append('message', message.trim());
      formData.append('preferredContactMethod', preferredContactMethod);
      formData.append('sourcePage', window.location.pathname);

      // Append items
      formData.append('items', JSON.stringify(items));

      // Append files
      selectedFiles.forEach((file) => {
        formData.append('referenceImages', file);
      });

      const res = await submitEnquiry(formData);

      if (res.success) {
        setSubmittedResult({
          ref: res.enquiryRef,
          message: res.message,
          data: res.data,
        });
        clearQuote(); // Clear tray upon successful submission
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    } catch (err) {
      setErrors({ server: err.message || 'Failed to submit quotation request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6ED] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Official Manufacturer Enquiries
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
            Request a Product Quotation
          </h1>
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-3"></div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2 max-w-xl mx-auto">
            Submit your temple, institution, or dealer requirements. Sri Shakthi Vinayaga Metals will review specifications and confirm exact pricing and delivery timelines.
          </p>
        </div>

        {/* Successful Submission View */}
        {submittedResult ? (
          <div className="bg-white rounded-2xl border-2 border-gold-600 p-8 sm:p-12 shadow-card-elevated text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif font-bold text-2xl text-maroon-950">
                Quotation Request Received
              </h2>
              <p className="text-xs font-mono font-bold tracking-wider text-gold-700 bg-beige-light px-4 py-1.5 rounded-full inline-block border border-gold-600/30">
                Enquiry Reference: {submittedResult.ref}
              </p>
            </div>

            <div className="bg-beige-light/50 p-6 rounded-xl border border-gold-600/20 text-left max-w-xl mx-auto space-y-3 text-xs sm:text-sm text-charcoal leading-relaxed">
              <p className="font-semibold text-maroon-900">
                {submittedResult.message}
              </p>
              <p className="text-charcoal-muted">
                Our master artisans and estimating team in Tirupur will calculate the raw metal weights, iconographic labor requirements, and packaging specifications. We will reach out to you directly via <strong>{preferredContactMethod}</strong>.
              </p>
              <div className="pt-2 border-t border-beige text-[11px] text-charcoal-muted">
                * Note: This is an enquiry for quotation formulation, not an automated order or payment transaction.
              </div>
            </div>

            {/* Direct WhatsApp Follow-up shortcut */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppLink(
                  `Hello Sri Shakthi Vinayaga Metals, I have submitted a quotation request with reference number: ${submittedResult.ref}. Kindly review my requirement.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm rounded shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Follow-up on WhatsApp</span>
              </a>

              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-3 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs sm:text-sm rounded transition-colors"
              >
                Continue Browsing Products
              </Link>
            </div>
          </div>
        ) : (
          /* Quotation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gold-600/30 shadow-card-elevated p-6 sm:p-10 space-y-8"
          >
            {/* Top Alert Note */}
            <div className="bg-beige-light/60 p-4 rounded-xl border border-gold-600/20 text-xs text-charcoal-muted flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-charcoal block">Direct Manufacturer Communication</span>
                <span>
                  No middleman markups. We confirm alloy purity, dimensions, and manufacturing timelines directly with temple authorities, sthapatis, and patrons across India.
                </span>
              </div>
            </div>

            {errors.server && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.server}</span>
              </div>
            )}

            {/* Section 1: Customer & Organization Information */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
                <Building className="w-4 h-4 text-gold-600" />
                <span>1. Contact & Location Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. K. Sundaramoorthy"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.customerName ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.customerName}</p>
                  )}
                </div>

                {/* Organization / Temple */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Temple / Organization / Store Name <span className="text-charcoal-muted font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sri Mariamman Temple Trust / Pooja Bhandar"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Phone / WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98422 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.phone ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Email Address <span className="text-charcoal-muted font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. trust@temple.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.email ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    City / Town <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Madurai, Coimbatore, Tirupur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.city ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    State <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  >
                    {STATES_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Customer Type */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    You are representing:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CUSTOMER_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCustomerType(type)}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors text-center ${
                          customerType === type
                            ? 'bg-maroon-800 text-gold-300 border-maroon-900 font-semibold shadow-xs'
                            : 'bg-[#FAF6ED] border-gold-600/30 text-charcoal hover:bg-beige'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Multi-Product Quotation Item Rows */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gold-600/20">
                <h3 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold-600" />
                  <span>2. Product(s) for Quotation</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddItemRow}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon-800 hover:text-gold-700 bg-beige px-3 py-1.5 rounded border border-gold-600/30 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Product</span>
                </button>
              </div>

              {errors.items && (
                <p className="text-xs text-red-600 font-medium">{errors.items}</p>
              )}

              <div className="space-y-3">
                {items.map((row, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#FAF6ED] rounded-xl border border-gold-600/30 relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-serif font-bold text-gold-800 uppercase tracking-wider">
                        Product Item #{index + 1}
                      </span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(index)}
                          className="text-red-700 hover:text-red-900 p-1 text-xs flex items-center gap-1"
                          title="Remove this product item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Product Name or Custom Description */}
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          Product Name or Category Description
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Makara Torana Prabavalayam or 42 inch Kalasam"
                          value={row.productName}
                          onChange={(e) =>
                            handleItemChange(index, 'productName', e.target.value)
                          }
                          className="w-full bg-white border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>

                      {/* Product Code if known */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          Product Code (if known)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. SSVM-PB-001"
                          value={row.productCode}
                          onChange={(e) =>
                            handleItemChange(index, 'productCode', e.target.value)
                          }
                          className="w-full bg-white border border-gold-600/40 rounded px-3 py-2 text-xs font-mono text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>

                      {/* Quantity */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          Quantity Required
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={row.quantity}
                          onChange={(e) =>
                            handleItemChange(index, 'quantity', Math.max(1, parseInt(e.target.value, 10) || 1))
                          }
                          className="w-full bg-white border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>

                      {/* Specific item sizing note */}
                      <div className="sm:col-span-12">
                        <input
                          type="text"
                          placeholder="Specific sizing notes for this item (e.g. 48 inch height, double peacock, 18-gauge sheet)..."
                          value={row.requirements}
                          onChange={(e) =>
                            handleItemChange(index, 'requirements', e.target.value)
                          }
                          className="w-full bg-white border border-gold-600/30 rounded px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Technical Specifications & Preferences */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>3. Material, Sizing & Customization Preferences</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Material Preference */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Preferred Metal / Alloy
                  </label>
                  <select
                    value={materialPreference}
                    onChange={(e) => setMaterialPreference(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  >
                    <option value="Brass">High-Purity Virgin Brass</option>
                    <option value="Pure Copper">99.9% Electrolytic Copper (Recommended for Sanctum Kalasam)</option>
                    <option value="Bronze">Traditional Bronze (Ven-Kalam)</option>
                    <option value="Panchaloha">Panchaloha (Traditional 5-Metal Consecration Alloy)</option>
                    <option value="Silver Plated">Silver Plated / Embossed</option>
                    <option value="To be advised by Manufacturer">Advise me based on requirement</option>
                  </select>
                </div>

                {/* Overall Dimensions */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Overall Sizing or Dimensions <span className="text-charcoal-muted font-normal">(if known)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sanctum opening 5 ft x 3 ft, or Deity height 36 inches"
                    value={sizeRequirements}
                    onChange={(e) => setSizeRequirements(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                {/* Customization Details */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Customization Details / Temple Inscriptions / Special Motifs
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Ashtalakshmi embossing required, temple name inscribed on base, specific date for Kumbhabhishekam..."
                    value={customizationDetails}
                    onChange={(e) => setCustomizationDetails(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  ></textarea>
                </div>

                {/* Additional Message */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Additional Instructions or Queries
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any additional context or delivery destination details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 4: Reference Image Upload & Contact Preference */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
                <Upload className="w-4 h-4 text-gold-600" />
                <span>4. Reference Photos & Contact Method</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {/* Upload Input */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Upload Reference Photos or Blueprints <span className="text-charcoal-muted font-normal">(Max 4 images)</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-charcoal-muted file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-maroon-800 file:text-gold-300 hover:file:bg-maroon-900 cursor-pointer"
                  />
                  {filePreviews.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {filePreviews.map((url, i) => (
                        <div key={i} className="w-12 h-12 rounded border border-gold-600 overflow-hidden">
                          <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Preferred Contact Method for Quotation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['WhatsApp', 'Phone', 'Email'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContactMethod(method)}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors ${
                          preferredContactMethod === method
                            ? 'bg-maroon-800 text-gold-300 border-maroon-900 font-semibold'
                            : 'bg-[#FAF6ED] border-gold-600/30 text-charcoal hover:bg-beige'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gold-600/30">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 disabled:opacity-50 text-maroon-950 font-serif font-bold text-base tracking-wide rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-maroon-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting to Sri Shakthi Vinayaga Metals...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-charcoal-muted text-center mt-2">
                By submitting, your requirements are delivered directly to the manufacturer in Tirupur. You will receive an official quotation reference number.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestQuotePage;
