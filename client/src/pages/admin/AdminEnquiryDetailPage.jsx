import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Save,
  Image as ImageIcon,
  DollarSign,
  User,
  Building,
} from 'lucide-react';
import { getAdminEnquiryById, updateAdminEnquiry } from '../../services/enquiryService';

const STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Quotation Prepared',
  'Quotation Sent',
  'Negotiation',
  'Converted',
  'Closed',
];

const AdminEnquiryDetailPage = () => {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Editable workflow state
  const [status, setStatus] = useState('New');
  const [quotationAmount, setQuotationAmount] = useState('');
  const [quotationNotes, setQuotationNotes] = useState('');
  const [newNote, setNewNote] = useState('');

  const loadEnquiry = async () => {
    setLoading(true);
    try {
      const res = await getAdminEnquiryById(id);
      if (res.data) {
        setEnquiry(res.data);
        setStatus(res.data.status || 'New');
        setQuotationAmount(res.data.quotationAmount || '');
        setQuotationNotes(res.data.quotationNotes || '');
      }
    } catch (err) {
      setError(err.message || 'Failed to load enquiry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiry();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const res = await updateAdminEnquiry(id, {
        status,
        quotationAmount,
        quotationNotes,
        newNote: newNote.trim() ? newNote.trim() : undefined,
      });

      if (res.data) {
        setEnquiry(res.data);
        setNewNote('');
        setSuccess('Enquiry and quotation details updated successfully.');
        setTimeout(() => setSuccess(''), 3500);
      }
    } catch (err) {
      setError(err.message || 'Failed to update enquiry.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-charcoal-muted">Loading enquiry details...</p>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-charcoal">Enquiry record not found.</p>
        <Link to="/admin/enquiries" className="text-xs text-maroon-800 underline mt-2 inline-block">
          Return to Enquiries List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/enquiries"
            className="p-2 bg-white rounded-lg border border-gold-600/30 text-charcoal hover:bg-beige"
            title="Back to list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-xl text-maroon-950">
                Enquiry {enquiry.enquiryRef}
              </h1>
              <span className="text-xs bg-beige px-2 py-0.5 rounded font-mono font-semibold text-gold-900 border border-gold-600/30">
                {enquiry.customerType}
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Received on{' '}
              {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Quick Customer WhatsApp Shortcut */}
        <a
          href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            `Hello ${enquiry.customerName}, this is Sri Shakthi Vinayaga Metals, Tirupur regarding your quotation enquiry ref: ${enquiry.enquiryRef}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Customer</span>
        </a>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Info & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Details Card */}
          <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
              <User className="w-4 h-4 text-gold-600" />
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-charcoal-muted block text-[11px]">Customer Name</span>
                <span className="font-semibold text-charcoal text-sm">{enquiry.customerName}</span>
              </div>
              <div>
                <span className="text-charcoal-muted block text-[11px]">Organization / Temple</span>
                <span className="font-semibold text-charcoal">
                  {enquiry.organizationName || 'Individual Customer'}
                </span>
              </div>
              <div>
                <span className="text-charcoal-muted block text-[11px]">Phone Number</span>
                <a href={`tel:${enquiry.phone}`} className="font-semibold text-maroon-800 hover:underline">
                  {enquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-charcoal-muted block text-[11px]">Email</span>
                <span className="text-charcoal">
                  {enquiry.email ? (
                    <a href={`mailto:${enquiry.email}`} className="text-maroon-800 hover:underline">
                      {enquiry.email}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </span>
              </div>
              <div>
                <span className="text-charcoal-muted block text-[11px]">Destination Location</span>
                <span className="text-charcoal">
                  {enquiry.city}, {enquiry.state}
                </span>
              </div>
              <div>
                <span className="text-charcoal-muted block text-[11px]">Preferred Contact</span>
                <span className="font-semibold text-emerald-700">
                  Via {enquiry.preferredContactMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Requested Items Table */}
          <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-600" />
              <span>Requested Products ({enquiry.items?.length || 0})</span>
            </h2>

            <div className="border border-gold-600/20 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#FAF6ED] text-charcoal-muted font-semibold uppercase text-[10px] border-b border-gold-600/20">
                  <tr>
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3">Specific Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-600/10">
                  {enquiry.items && enquiry.items.length > 0 ? (
                    enquiry.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-semibold text-charcoal">
                          {item.productName}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-maroon-900 font-bold">
                          {item.productCode || '—'}
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-charcoal-muted">
                          {item.requirements || 'Standard specification'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-charcoal-muted">
                        No product items attached.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technical Requirements & Customization */}
          <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs space-y-3 text-xs">
            <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
              Customer Preferences & Message
            </h2>

            {enquiry.materialPreference && (
              <div>
                <span className="font-semibold text-charcoal block">Material Preference:</span>
                <span className="text-charcoal-muted">{enquiry.materialPreference}</span>
              </div>
            )}

            {enquiry.sizeRequirements && (
              <div>
                <span className="font-semibold text-charcoal block">Dimensions / Sizing:</span>
                <span className="text-charcoal-muted">{enquiry.sizeRequirements}</span>
              </div>
            )}

            {enquiry.customizationDetails && (
              <div>
                <span className="font-semibold text-charcoal block">Customization Notes:</span>
                <span className="text-charcoal-muted">{enquiry.customizationDetails}</span>
              </div>
            )}

            {enquiry.message && (
              <div>
                <span className="font-semibold text-charcoal block">Customer Message:</span>
                <div className="p-3 bg-[#FAF6ED] rounded border border-gold-600/20 text-charcoal italic mt-1">
                  "{enquiry.message}"
                </div>
              </div>
            )}

            {/* Reference Images */}
            {enquiry.referenceImages && enquiry.referenceImages.length > 0 && (
              <div className="pt-2">
                <span className="font-semibold text-charcoal block mb-2">
                  Uploaded Reference Images:
                </span>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {enquiry.referenceImages.map((img, i) => (
                    <a
                      key={i}
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-20 h-20 rounded border border-gold-600 overflow-hidden shrink-0 group relative block"
                    >
                      <img src={img.url} alt="Reference" className="w-full h-full object-cover" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Workflow Manager & Internal Notes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quotation Workflow Manager */}
          <form
            onSubmit={handleUpdate}
            className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs space-y-4"
          >
            <h2 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gold-600" />
              <span>Quotation Workflow & Status</span>
            </h2>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Enquiry Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none font-semibold"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Quotation Amount */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Quotation Amount (INR)
              </label>
              <input
                type="number"
                placeholder="e.g. 185000"
                value={quotationAmount}
                onChange={(e) => setQuotationAmount(e.target.value)}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs font-semibold text-charcoal focus:outline-none"
              />
              <span className="text-[10px] text-charcoal-muted mt-0.5 block">
                Record confirmed metal & labor cost quotation
              </span>
            </div>

            {/* Quotation Notes */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Quotation Scope & Delivery Notes
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Includes wooden crating, 18% GST, transit insurance, and delivery in 25 working days..."
                value={quotationNotes}
                onChange={(e) => setQuotationNotes(e.target.value)}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none"
              ></textarea>
            </div>

            {/* Append New Admin Internal Note */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Add Private Internal Admin Note
              </label>
              <input
                type="text"
                placeholder="e.g. Spoke to temple trustee on phone; waiting on sanction."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs rounded-lg shadow flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{updating ? 'Updating...' : 'Save & Update Status'}</span>
            </button>
          </form>

          {/* Internal Notes History Timeline */}
          <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-sm text-maroon-950 pb-2 border-b border-gold-600/20">
              Internal Admin Notes Log
            </h3>

            {enquiry.adminNotes && enquiry.adminNotes.length > 0 ? (
              <div className="space-y-3">
                {enquiry.adminNotes.map((noteItem, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF6ED] rounded-lg border border-gold-600/20 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-charcoal-muted">
                      <span className="font-semibold text-maroon-900">{noteItem.addedBy}</span>
                      <span>
                        {new Date(noteItem.addedAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-charcoal leading-relaxed">{noteItem.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-charcoal-muted text-center py-4">
                No internal notes added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiryDetailPage;
