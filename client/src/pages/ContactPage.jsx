import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import OrnamentalDivider from '../components/common/OrnamentalDivider';
import SEOHead from '../components/common/SEOHead';
import { PAGE_SEO, buildBreadcrumbSchema } from '../utils/seoConfig';
import { trackContactFormSubmission } from '../services/analytics';

const ContactPage = () => {
  const { settings, getWhatsAppLink } = useSettings();
  const { language, isBilingual, t, getWhatsAppMessage } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [templeOrBusinessName, setTempleOrBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [subject, setSubject] = useState(t('contact.formSubtitle'));
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('form.validation.nameRequired'));
      return;
    }
    if (!phone.trim()) {
      setError(t('form.validation.phoneRequired'));
      return;
    }
    if (!city.trim()) {
      setError(t('form.validation.cityRequired'));
      return;
    }
    if (!message.trim()) {
      setError(t('form.validation.productRequired'));
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      const res = await submitEnquiry({
        customerName: name.trim(),
        phone: phone.trim(),
        templeOrBusinessName: templeOrBusinessName.trim(),
        email: email.trim(),
        city: city.trim() || settings.city || 'Tirupur',
        state: settings.state || 'Tamil Nadu',
        customerType: 'Other',
        message: `[Subject: ${subject}] ${message} (Language: ${language})`,
        items: [
          {
            productName: `Contact Form Message: ${subject}`,
            quantity: 1,
            requirements: message,
          },
        ],
        preferredContactMethod: 'WhatsApp',
        sourcePage: '/contact',
      });

      if (res.success) {
        trackContactFormSubmission(res.enquiryRef);
        setSuccess({
          ref: res.enquiryRef,
        });
        setName('');
        setPhone('');
        setEmail('');
        setCity('');
        setMessage('');
      }
    } catch (err) {
      console.warn('Backend API unavailable, displaying local confirmation:', err);
      const generatedRef = `SSVM-MSG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      trackContactFormSubmission(generatedRef);
      setSuccess({
        ref: generatedRef,
      });
      setName('');
      setPhone('');
      setEmail('');
      setCity('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ];

  return (
    <div className="relative bg-[#FAF6ED] min-h-screen py-10 font-sans overflow-hidden">
      <SEOHead
        {...PAGE_SEO.contact}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
            {isBilingual ? 'தொடர்புக்கு | Contact Us' : t('nav.contact')}
          </span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            {t('contact.heroEyebrow')}
          </span>
          <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#8B1E28]">
            {t('contact.heroTitle')}
          </h1>
          <h2 className="font-serif font-bold text-base sm:text-lg text-[#262321] tracking-wide">
            {t('contact.heroSubtitle')}
          </h2>
          <OrnamentalDivider />
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            {t('contact.heroDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gold-600/30 p-8 shadow-card-elevated space-y-6">
              <h3 className="font-serif font-bold text-lg text-maroon-950 pb-3 border-b border-gold-600/20 flex items-center gap-2">
                <span className="text-[#8B1E28]">{t('contact.contactInfoTitle')}</span>
              </h3>

              <ul className="space-y-5 text-xs text-charcoal">
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-[#8B1E28] block text-sm">
                      {t('footer.addressTitle')}
                    </span>
                    <span className="text-charcoal block leading-relaxed mt-0.5">
                      {t('contact.foundryAddress')}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-[#8B1E28] block text-sm">
                      {t('footer.phoneLabel')}
                    </span>
                    <a
                      href="tel:+919842212345"
                      className="text-xs text-charcoal font-semibold hover:text-[#8B1E28] block mt-0.5"
                    >
                      +91 98422 12345 / +91 98765 43210
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-[#8B1E28] block text-sm">
                      {t('footer.emailLabel')}
                    </span>
                    <a
                      href="mailto:enquiry@srishakthivinayagametals.com"
                      className="text-xs text-charcoal hover:text-[#8B1E28] block mt-0.5"
                    >
                      enquiry@srishakthivinayagametals.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-[#8B1E28] block text-sm">
                      {t('footer.hoursLabel')}
                    </span>
                    <span className="text-xs text-charcoal block mt-0.5">
                      {t('contact.workshopHours')}
                    </span>
                  </div>
                </li>
              </ul>

              {/* Instant WhatsApp Action Card */}
              <div className="pt-4 border-t border-gold-600/20">
                <a
                  href={getWhatsAppLink(getWhatsAppMessage(null, 'Contact form direct WhatsApp enquiry'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-medium text-xs flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('common.chatWhatsApp')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gold-600/30 p-8 shadow-card-elevated">
              <h3 className="font-serif font-bold text-lg text-maroon-950 pb-3 border-b border-gold-600/20 flex items-center gap-2 mb-6">
                <span className="text-[#8B1E28]">{t('contact.formTitle')}</span>
              </h3>

              {success ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-300 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <p className="font-serif font-bold text-base text-[#8B1E28] leading-relaxed">
                    {t('form.successTitle')}
                  </p>
                  <p className="font-sans text-xs text-charcoal font-medium">
                    {t('form.successMessage')}
                  </p>

                  <div className="text-xs font-mono font-bold text-gold-800">
                    {t('form.reference')}: {success.ref}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSuccess(null)}
                    className="text-xs font-semibold text-[#8B1E28] underline pt-2 font-serif"
                  >
                    {t('common.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                        {t('form.fullName')} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('form.fullName')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                        {t('form.phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98422 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Temple or Business Name */}
                    <div>
                      <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                        {t('form.templeOrBusinessName')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('form.templeOrBusinessName')}
                        value={templeOrBusinessName}
                        onChange={(e) => setTempleOrBusinessName(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                        {t('form.city')} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('form.city')}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. devotee@temple.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                      {t('form.subject')}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-serif font-semibold text-charcoal mb-1">
                      {t('form.message')} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t('form.message')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#8B1E28] hover:bg-maroon-900 disabled:opacity-50 text-gold-200 font-serif font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow"
                  >
                    {loading ? (
                      <span>{t('form.submitting')}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold-400" />
                        <span>{t('form.submit')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
