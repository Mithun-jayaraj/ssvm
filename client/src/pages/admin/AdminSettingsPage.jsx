import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Building,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { getAdminSettings, updateAdminSettings } from '../../services/settingsService';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    businessName: '',
    tagline: '',
    doorAddress: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    alternativePhone: '',
    whatsappNumber: '',
    email: '',
    businessHours: '',
    announcementText: '',
    aboutStory: '',
    manufacturingHighlights: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await getAdminSettings();
      if (res.data) {
        setSettings({
          ...res.data,
          manufacturingHighlights: Array.isArray(res.data.manufacturingHighlights)
            ? res.data.manufacturingHighlights
            : [],
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load business settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHighlight = () => {
    setSettings((prev) => ({
      ...prev,
      manufacturingHighlights: [...prev.manufacturingHighlights, ''],
    }));
  };

  const handleHighlightChange = (index, value) => {
    setSettings((prev) => {
      const updated = [...prev.manufacturingHighlights];
      updated[index] = value;
      return { ...prev, manufacturingHighlights: updated };
    });
  };

  const handleRemoveHighlight = (index) => {
    setSettings((prev) => ({
      ...prev,
      manufacturingHighlights: prev.manufacturingHighlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const cleaned = {
        ...settings,
        manufacturingHighlights: settings.manufacturingHighlights.filter((h) => h.trim()),
      };
      const res = await updateAdminSettings(cleaned);
      if (res.data) {
        setSettings(res.data);
        setSuccess('Business profile and contact details updated successfully.');
        setTimeout(() => setSuccess(''), 3500);
      }
    } catch (err) {
      setError(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-charcoal-muted">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif font-bold text-2xl text-maroon-950">
          Business Profile & Settings
        </h1>
        <p className="text-xs text-charcoal-muted mt-1">
          Configure Tirupur factory contact numbers, WhatsApp enquiry channels, announcement banners, and brand info.
        </p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Branding & Announcement */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
            <Building className="w-4 h-4 text-gold-600" />
            <span>1. Identity & Announcement Bar</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={settings.businessName}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Top Announcement Bar Notice
              </label>
              <input
                type="text"
                name="announcementText"
                value={settings.announcementText}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Contact Numbers & WhatsApp */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold-600" />
            <span>2. Contact Numbers & Direct WhatsApp</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Alternative Phone
              </label>
              <input
                type="text"
                name="alternativePhone"
                value={settings.alternativePhone}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                name="whatsappNumber"
                placeholder="+919842212345"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs font-semibold text-emerald-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Business Working Hours
              </label>
              <input
                type="text"
                name="businessHours"
                value={settings.businessHours}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Physical Address in Tirupur */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
            3. Factory & Works Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Street / Industrial Estate Address
              </label>
              <input
                type="text"
                name="doorAddress"
                value={settings.doorAddress}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">City</label>
              <input
                type="text"
                name="city"
                value={settings.city}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">State</label>
              <input
                type="text"
                name="state"
                value={settings.state}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Postal Pincode</label>
              <input
                type="text"
                name="pincode"
                value={settings.pincode}
                onChange={handleChange}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 4: About Story & Manufacturing Highlights */}
        <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
            4. About Us Story & Capabilities
          </h2>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Foundry Narrative Story (Shown on About Page)
            </label>
            <textarea
              name="aboutStory"
              rows={4}
              value={settings.aboutStory}
              onChange={handleChange}
              className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-2 text-xs text-charcoal focus:outline-none"
            ></textarea>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-charcoal">
                Manufacturing Highlights List
              </label>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="text-xs font-semibold text-maroon-800 hover:text-gold-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>

            <div className="space-y-2">
              {settings.manufacturingHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={hl}
                    onChange={(e) => handleHighlightChange(idx, e.target.value)}
                    className="flex-1 bg-[#FAF6ED] border border-gold-600/40 rounded px-3 py-1.5 text-xs text-charcoal focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs rounded-lg shadow flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
