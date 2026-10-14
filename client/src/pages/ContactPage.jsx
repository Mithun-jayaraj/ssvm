import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';
import { useSettings } from '../context/SettingsContext';

const ContactPage = () => {
  const { settings, getWhatsAppLink } = useSettings();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      setError('Please fill in your name, contact phone number, and message.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await submitEnquiry({
        customerName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim() || settings.city || 'Tirupur',
        state: settings.state || 'Tamil Nadu',
        customerType: 'Other',
        message: `[Subject: ${subject}] ${message}`,
        items: [
          {
            productName: `Contact Message: ${subject}`,
            quantity: 1,
            requirements: message,
          },
        ],
        preferredContactMethod: 'WhatsApp',
        sourcePage: '/contact',
      });

      if (res.success) {
        setSuccess(
          `Thank you! Your message has been received with reference: ${res.enquiryRef}. Our Tirupur team will contact you shortly.`
        );
        setName('');
        setPhone('');
        setEmail('');
        setCity('');
        setMessage('');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit message. Please try again or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6ED] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Works & Office
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#262321] mt-2">
            Contact Sri Shakthi Vinayaga Metals
          </h1>
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-4"></div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Reach out directly to our foundry in Tirupur, Tamil Nadu for custom order consultations, quotation reviews, and delivery schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gold-600/30 p-8 shadow-card-elevated space-y-6">
              <h2 className="font-serif font-bold text-xl text-maroon-950 pb-3 border-b border-gold-600/20">
                Factory & Office Details
              </h2>

              <ul className="space-y-5 text-sm text-charcoal">
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-maroon-950 block">Works Location</span>
                    <span className="text-charcoal-muted text-xs leading-relaxed block mt-0.5">
                      {settings.doorAddress ? `${settings.doorAddress}, ` : ''}
                      {settings.city}, {settings.state} - {settings.pincode}, India
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-maroon-950 block">Phone Numbers</span>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-charcoal hover:text-maroon-800 text-xs font-semibold block mt-0.5"
                    >
                      {settings.phone}
                    </a>
                    {settings.alternativePhone && (
                      <a
                        href={`tel:${settings.alternativePhone}`}
                        className="text-charcoal hover:text-maroon-800 text-xs block mt-0.5"
                      >
                        {settings.alternativePhone}
                      </a>
                    )}
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-maroon-950 block">Instant WhatsApp</span>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline text-xs font-semibold block mt-0.5"
                    >
                      {settings.whatsappNumber} (Chat with manufacturer)
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-maroon-950 block">Email Address</span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-charcoal-muted hover:text-maroon-800 text-xs block mt-0.5"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-maroon-950 block">Business Working Hours</span>
                    <span className="text-charcoal-muted text-xs block mt-0.5">
                      {settings.businessHours}
                    </span>
                  </div>
                </li>
              </ul>

              {/* Instant WhatsApp Direct Card */}
              <div className="pt-4 border-t border-gold-600/20">
                <a
                  href={getWhatsAppLink('Hello Sri Shakthi Vinayaga Metals, I would like to get in touch regarding temple metal products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Direct WhatsApp Message</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gold-600/30 p-8 shadow-card-elevated">
              <h2 className="font-serif font-bold text-xl text-maroon-950 pb-3 border-b border-gold-600/20 mb-6">
                Send Manufacturer an Enquiry
              </h2>

              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg text-xs flex items-center gap-2 mb-6">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Your Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. S. Ramanathan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98422 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      Email Address <span className="text-charcoal-muted font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramanathan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tirupur, Erode, Chennai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Enquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  >
                    <option value="General Enquiry">General Product Enquiry</option>
                    <option value="Prabavalayam Quotation">Prabavalayam Sizing & Quotation</option>
                    <option value="Temple Kalasam Quotation">Temple Kalasam Order</option>
                    <option value="Deity Vigraham Casting">Deity Vigraham Casting</option>
                    <option value="Wholesale / Dealer Enquiry">Wholesale / Pooja Store Dealer</option>
                    <option value="Temple Consecration (Kumbhabhishekam)">Temple Consecration (Kumbhabhishekam)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Your Message / Requirements <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your requirement, temple dimensions, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded-lg shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Manufacturer</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
