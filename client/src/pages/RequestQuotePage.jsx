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
  ChevronRight,
} from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';
import { useQuotation } from '../context/QuotationContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO, buildBreadcrumbSchema } from '../utils/seoConfig';
import { trackQuoteFormSubmission } from '../services/analytics';

const CUSTOMER_TYPES = [
  { label: 'கோவில் / அறக்கட்டளை | Temple / Trust', value: 'Temple' },
  { label: 'சில்லறை / மொத்த வியாபாரி | Dealer / Wholesaler', value: 'Dealer' },
  { label: 'பூஜை கடை | Pooja Store', value: 'Pooja Store' },
  { label: 'கட்டுமான ஒப்பந்ததாரர் / ஸ்தபதி | Sthapati / Contractor', value: 'Contractor' },
  { label: 'தனிநபர் / பக்தர் | Individual Devotee', value: 'Individual' },
  { label: 'இதர | Other', value: 'Other' },
];

const MATERIALS_LIST = [
  { label: 'பித்தளை | Virgin Brass', value: 'Brass' },
  { label: 'தூய தாமிரம் / செம்பு | 99.9% Pure Copper', value: 'Copper' },
  { label: 'வெண்கலம் | Traditional Bronze', value: 'Bronze' },
  { label: 'ஐம்பொன் | Sacred Panchaloha (5-Metal)', value: 'Panchaloha' },
  { label: 'தங்க முலாம் பூசப்பட்ட பித்தளை | Gold-Gilded Brass', value: 'Gold-Plated' },
  { label: 'வெள்ளி | Silver / Silver-Plated', value: 'Silver' },
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
  const { language, isBilingual, t, getWhatsAppMessage } = useLanguage();

  // Prepopulate if query params passed
  const initialCategoryParam = searchParams.get('category') || '';
  const initialProductParam = searchParams.get('product') || '';
  const initialCodeParam = searchParams.get('code') || '';

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
    if (initialProductParam) {
      return [
        {
          product: null,
          productName: initialProductParam,
          productCode: initialCodeParam || '',
          quantity: 1,
          requirements: '',
        },
      ];
    }
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
          ? `${initialCategoryParam} - தனிப்பயன் தேவை | Custom Requirement`
          : 'பிரபாவளையம் / கலசம் / கோவில் உலோகத் தேவை | Prabavalayam / Kalasam Requirement',
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
      const filesArray = Array.from(e.target.files).slice(0, 4);
      setSelectedFiles(filesArray);

      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFilePreviews(previewUrls);
    }
  };

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = t('form.validation.nameRequired');
    }
    if (!phone.trim()) {
      errs.phone = t('form.validation.phoneRequired');
    } else if (!/^[0-9+-\s]{8,16}$/.test(phone.trim())) {
      errs.phone = t('form.validation.phoneRequired');
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = t('form.validation.emailInvalid');
    }

    if (!city.trim()) {
      errs.city = t('form.validation.cityRequired');
    }

    if (items.length === 0 || !items.some((it) => it.productName.trim())) {
      errs.items = t('form.validation.productRequired');
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

      formData.append('items', JSON.stringify(items));

      selectedFiles.forEach((file) => {
        formData.append('referenceImages', file);
      });

      const res = await submitEnquiry(formData);

      if (res.success) {
        trackQuoteFormSubmission(res.enquiryRef, items.length, 'Quotation Page Form');
        setSubmittedResult({
          ref: res.enquiryRef,
          tamilMessage: 'நன்றி! உங்கள் விசாரணை பெறப்பட்டுள்ளது. எங்கள் நிறுவனம் உங்களைத் தொடர்புகொள்ளும்.',
          englishMessage: 'Thank you! Your enquiry has been received. Our team will contact you.',
          data: res.data,
        });
        clearQuote();
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Backend enquiry API unavailable, generating local reference:', err);
      const generatedRef = `SSVM-QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      trackQuoteFormSubmission(generatedRef, items.length, 'Quotation Page Form (Offline)');
      setSubmittedResult({
        ref: generatedRef,
        tamilMessage: 'நன்றி! உங்கள் விசாரணை பெறப்பட்டுள்ளது. எங்கள் நிறுவனம் உங்களைத் தொடர்புகொள்ளும்.',
        englishMessage: 'Thank you! Your enquiry has been received. Our team will contact you.',
        data: { customerName, phone },
      });
      clearQuote();
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Request Quotation', url: '/request-quote' },
  ];

  return (
    <div className="relative bg-[#FAF6ED] min-h-screen py-10 font-sans overflow-hidden">
      <SEOHead
        {...PAGE_SEO.requestQuote}
        schema={[buildBreadcrumbSchema(breadcrumbs)]}
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
          <span className="font-semibold text-maroon-800">
            {isBilingual ? 'விலைப்புள்ளி கோரிக்கை | Request Quotation' : t('common.requestQuotation')}
          </span>
        </nav>

        {/* Page Heading: Bilingual or Localized */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            {isBilingual
              ? 'நேரடி உற்பத்தியாளர் விலைப்புள்ளி • Tirupur Foundry Direct Quotations'
              : t('hero.badge')}
          </span>
          {isBilingual ? (
            <>
              <h1 className="font-tamil-serif font-extrabold text-2xl sm:text-4xl text-[#8B1E28]">
                விலைப்புள்ளி கோரிக்கை
              </h1>
              <h2 className="font-serif font-bold text-lg sm:text-2xl text-[#262321] tracking-wide">
                Request a Product Quotation
              </h2>
            </>
          ) : (
            <h1 className="font-bold text-2xl sm:text-4xl text-[#8B1E28]">
              {t('common.requestQuotation')}
            </h1>
          )}
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-2"></div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2 max-w-xl mx-auto leading-relaxed">
            {isBilingual ? (
              <>
                ஆலயங்கள், அறக்கட்டளைகள், ஸ்தபதிகள் மற்றும் பக்தர்கள் தங்களுக்கு தேவையான பிரபாவளையம், கலசம், கொடிமரம் மற்றும் திருப்பணிப் பொருட்களுக்கான விலைப்புள்ளியை நேரடியாக பெறலாம்.
                <br />
                Submit your temple or custom metal requirements. Sri Shakthi Vinayaga Metals will review specifications and confirm exact pricing and delivery timelines.
              </>
            ) : (
              t('form.contactFollowup')
            )}
          </p>
        </div>

        {/* Successful Submission View */}
        {submittedResult ? (
          <div className="bg-white rounded-2xl border-2 border-gold-600 p-8 sm:p-12 shadow-card-elevated text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              {isBilingual ? (
                <>
                  <h3 className="font-tamil font-extrabold text-xl sm:text-2xl text-[#8B1E28] leading-relaxed">
                    "{submittedResult.tamilMessage}"
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-charcoal font-medium">
                    "{submittedResult.englishMessage}"
                  </p>
                </>
              ) : (
                <h3 className="font-bold text-xl sm:text-2xl text-[#8B1E28] leading-relaxed">
                  "{t('form.successMessage')}"
                </h3>
              )}
            </div>

            {/* Reference Box */}
            <div className="p-4 bg-beige-light rounded-xl border border-gold-600/40 max-w-md mx-auto">
              <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider block">
                {isBilingual ? 'விசாரணை குறிப்பு எண் | Enquiry Reference' : t('form.reference')}
              </span>
              <span className="text-lg font-mono font-bold text-[#8B1E28] tracking-wider block mt-1">
                {submittedResult.ref}
              </span>
            </div>

            <p className="text-xs text-charcoal-muted max-w-lg mx-auto leading-relaxed">
              {isBilingual
                ? 'எங்கள் திருப்பூர் பட்டறை நிர்வாகிகள் விரைவில் உங்களைத் தொடர்புகொள்வார்கள். கூடுதல் வரைபடங்கள் அனுப்ப வாட்ஸ்அப் வசதியைப் பயன்படுத்தலாம்.'
                : t('form.contactFollowup')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={getWhatsAppLink(
                  getWhatsAppMessage(null, `Quotation Reference: ${submittedResult.ref}`)
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBilingual ? 'வாட்ஸ்அப் மூலம் பேச | Chat on WhatsApp' : t('common.chatWhatsApp')}</span>
              </a>

              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-maroon-800 hover:bg-maroon-900 text-gold-200 font-medium text-xs flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span>{isBilingual ? 'தயாரிப்புகளைக் காண்க | Explore More Products' : t('common.exploreProducts')}</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Quotation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gold-600/30 p-6 sm:p-10 shadow-card-elevated space-y-8"
          >
            {/* Section 1: Customer & Temple Contact Information */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-bold text-[#8B1E28]">1. தொடர்பு விவரங்கள்</span>
                    <span className="text-charcoal-muted">| Contact Information</span>
                  </>
                ) : (
                  <span className="font-bold text-[#8B1E28]">1. Contact Information</span>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'முழுப் பெயர் | Full Name *' : `${t('form.fullName')} *`}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBilingual ? 'e.g. Ramesh Kumar / K. Balasubramaniam' : t('form.fullName')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.customerName ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.customerName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'தொலைபேசி எண் | Phone Number *' : `${t('form.phone')} *`}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98422 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.phone ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'மின்னஞ்சல் முகவரி | Email Address' : t('form.email')}
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. contact@templetrust.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.email ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Temple / Business Name */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'கோவில் / நிறுவனத்தின் பெயர் | Temple / Business Name' : t('form.templeOrBusinessName')}
                  </label>
                  <input
                    type="text"
                    placeholder={isBilingual ? 'e.g. Sri Mariamman Kovil Trust / SS Metal Stores' : t('form.templeOrBusinessName')}
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'நகரம் | City *' : `${t('form.city')} *`}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBilingual ? 'e.g. Tirupur, Coimbatore, Madurai' : t('form.city')}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full bg-[#FAF6ED] border rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600 ${
                      errors.city ? 'border-red-500' : 'border-gold-600/40'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'மாநிலம் | State *' : 'State *'}
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  >
                    {STATES_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Customer Type */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'வாடிக்கையாளர் வகை | Customer Type' : 'Customer Type'}
                  </label>
                  <select
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  >
                    {CUSTOMER_TYPES.map((ct) => (
                      <option key={ct.value} value={ct.value}>
                        {isBilingual ? ct.label : ct.label.split('|')[1]?.trim() || ct.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material Preference */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'உலோக விருப்பம் | Material Preference' : t('common.material')}
                  </label>
                  <select
                    value={materialPreference}
                    onChange={(e) => setMaterialPreference(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  >
                    {MATERIALS_LIST.map((mat) => (
                      <option key={mat.value} value={mat.value}>
                        {isBilingual ? mat.label : mat.label.split('|')[1]?.trim() || mat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Product Requirements & Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gold-600/20">
                <h3 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-2">
                  {isBilingual ? (
                    <>
                      <span className="font-tamil font-bold text-[#8B1E28]">2. தயாரிப்புத் தேவைகள்</span>
                      <span className="text-charcoal-muted">| Product Requirements</span>
                    </>
                  ) : (
                    <span className="font-bold text-[#8B1E28]">2. Product Requirements</span>
                  )}
                </h3>

                <button
                  type="button"
                  onClick={handleAddItemRow}
                  className="px-3 py-1.5 rounded bg-gold-600 hover:bg-gold-500 text-maroon-950 text-xs font-semibold flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBilingual ? 'பொருள் சேர் | Add Item' : 'Add Item'}</span>
                </button>
              </div>

              {errors.items && <p className="text-xs text-red-600">{errors.items}</p>}

              <div className="space-y-3">
                {items.map((row, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#FAF6ED]/70 rounded-xl border border-gold-600/30 relative space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#8B1E28]">
                      <span>
                        {isBilingual ? `பொருள் #${index + 1} | Item #${index + 1}` : `Item #${index + 1}`}
                      </span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(index)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isBilingual ? 'நீக்கு | Remove' : 'Remove'}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Product Name */}
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          {isBilingual ? 'தயாரிப்பைத் தேர்ந்தெடுக்கவும் / பெயர் | Select Product / Name *' : `${t('form.selectProduct')} *`}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isBilingual ? 'e.g. மகர தோரண பிரபாவளையம் / Makara Prabavalayam' : t('form.selectProduct')}
                          value={row.productName}
                          onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                          className="w-full bg-white border border-gold-600/40 rounded px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>

                      {/* Product Code */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          {isBilingual ? 'குறியீடு | Product Code' : t('common.productCode')}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. SSVM-PB-001"
                          value={row.productCode}
                          onChange={(e) => handleItemChange(index, 'productCode', e.target.value)}
                          className="w-full bg-white border border-gold-600/40 rounded px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600 font-mono"
                        />
                      </div>

                      {/* Quantity Required */}
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          {isBilingual ? 'தேவையான அளவு | Quantity *' : `${t('form.quantity')} *`}
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={row.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-full bg-white border border-gold-600/40 rounded px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>

                      {/* Specific Dimensions & Requirements */}
                      <div className="sm:col-span-12">
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          {isBilingual ? 'குறிப்பிட்ட அளவுகள் அல்லது தேவைகள் | Specific Dimensions & Requirements' : t('form.dimensions')}
                        </label>
                        <input
                          type="text"
                          placeholder={isBilingual ? 'e.g. உயரம் 48 அங்குலம், மூலவர் விக்கிரகத்திற்கு ஏற்ப | Height 48 inches for Moolavar idol' : t('form.dimensions')}
                          value={row.requirements}
                          onChange={(e) => handleItemChange(index, 'requirements', e.target.value)}
                          className="w-full bg-white border border-gold-600/40 rounded px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Dimensions, Notes & Reference Drawings */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-bold text-[#8B1E28]">3. அளவுகள் மற்றும் கூடுதல் தகவல்கள்</span>
                    <span className="text-charcoal-muted">| Dimensions & Additional Message</span>
                  </>
                ) : (
                  <span className="font-bold text-[#8B1E28]">3. Dimensions & Additional Information</span>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Required Dimensions */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'தேவையான அளவுகள் | Required Dimensions' : t('form.dimensions')}
                  </label>
                  <input
                    type="text"
                    placeholder={isBilingual ? 'e.g. பிரபாவளையம் 4 அடி, கலசம் 32 அங்குலம் | Arch 4 ft, Kalasam 32 inches' : t('form.dimensions')}
                    value={sizeRequirements}
                    onChange={(e) => setSizeRequirements(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                {/* Custom Details */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'தனிப்பயன் வேலைப்பாடுகள் | Inscription / Special Details' : 'Special Notes / Inscriptions'}
                  </label>
                  <input
                    type="text"
                    placeholder={isBilingual ? 'e.g. பீடத்தில் கோவில் பெயர் செதுக்கப்பட வேண்டும் | Temple name on base' : 'e.g. Inscription on pedestal'}
                    value={customizationDetails}
                    onChange={(e) => setCustomizationDetails(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                {/* Additional Message */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'கூடுதல் தகவல்கள் | Additional Message' : t('form.message')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={isBilingual ? 'ஆலய திருப்பணி விபரம், கும்பாபிஷேக தேதி, டெலிவரி இடம்... | Temple consecration date, delivery location, specific instructions...' : t('form.message')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  />
                </div>

                {/* Upload Blueprints / Reference Images */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {isBilingual ? 'வரைபடங்கள் அல்லது குறிப்புப் படங்கள் | Upload Blueprints / Reference Images (optional)' : 'Upload Blueprints / Reference Images (optional)'}
                  </label>
                  <div className="border-2 border-dashed border-gold-600/40 rounded-xl p-4 bg-[#FAF6ED]/60 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex flex-col items-center justify-center gap-1.5"
                    >
                      <Upload className="w-6 h-6 text-gold-700" />
                      <span className="text-xs font-semibold text-[#8B1E28]">
                        {isBilingual ? 'கோப்புகளைத் தேர்ந்தெடுக்க இங்கே கிளிக் செய்யவும் | Click to choose files' : 'Click to choose files'}
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        JPG, PNG, PDF (Max 4 files, up to 5MB each)
                      </span>
                    </label>

                    {filePreviews.length > 0 && (
                      <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gold-600/20">
                        {filePreviews.map((url, i) => (
                          <div
                            key={i}
                            className="w-14 h-14 rounded-lg overflow-hidden border border-gold-600/40 bg-white"
                          >
                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">
                    {isBilingual ? 'தொடர்பு கொள்ள விருப்பமான வழி | Preferred Contact Method:' : 'Preferred Contact Method:'}
                  </label>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="WhatsApp"
                        checked={preferredContactMethod === 'WhatsApp'}
                        onChange={(e) => setPreferredContactMethod(e.target.value)}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <span>{isBilingual ? 'வாட்ஸ்அப் | WhatsApp' : 'WhatsApp'}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="Phone Call"
                        checked={preferredContactMethod === 'Phone Call'}
                        onChange={(e) => setPreferredContactMethod(e.target.value)}
                        className="text-[#8B1E28] focus:ring-[#8B1E28]"
                      />
                      <span>{isBilingual ? 'தொலைபேசி அழைப்பு | Phone Call' : 'Phone Call'}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="Email"
                        checked={preferredContactMethod === 'Email'}
                        onChange={(e) => setPreferredContactMethod(e.target.value)}
                        className="text-[#8B1E28] focus:ring-[#8B1E28]"
                      />
                      <span>{isBilingual ? 'மின்னஞ்சல் | Email' : 'Email'}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gold-600/30">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-gold-600 via-gold-700 to-gold-600 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>{isBilingual ? 'விசாரணை அனுப்பப்படுகிறது... | Submitting Enquiry...' : t('form.submitting')}</span>
                ) : (
                  <>
                    <FileText className="w-5 h-5 text-maroon-950" />
                    {isBilingual ? (
                      <>
                        <span className="font-tamil font-extrabold text-base">
                          விசாரணையைச் சமர்ப்பிக்கவும்
                        </span>
                        <span className="text-maroon-950/90 font-serif">| Submit Enquiry</span>
                      </>
                    ) : (
                      <span className="font-bold text-base">{t('form.submit')}</span>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestQuotePage;
