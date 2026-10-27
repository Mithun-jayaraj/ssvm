import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Search,
  Download,
  AlertCircle,
  Eye,
  Filter,
  FileText,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { getAdminEnquiries, exportEnquiriesCSV } from '../../services/enquiryService';

const STATUS_OPTIONS = [
  'all',
  'New',
  'Contacted',
  'Quotation Prepared',
  'Quotation Sent',
  'Negotiation',
  'Converted',
  'Closed',
];

const STATUS_PILLS = {
  New: 'bg-blue-100 text-blue-800 border-blue-300',
  Contacted: 'bg-purple-100 text-purple-800 border-purple-300',
  'Quotation Prepared': 'bg-amber-100 text-amber-800 border-amber-300',
  'Quotation Sent': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  Negotiation: 'bg-orange-100 text-orange-800 border-orange-300',
  Converted: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Closed: 'bg-gray-100 text-gray-700 border-gray-300',
};

const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page,
        limit: 15,
      };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await getAdminEnquiries(params);
      if (res.data) {
        setEnquiries(res.data);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      setError(err.message || 'Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadEnquiries();
  };

  const handleExport = async () => {
    try {
      await exportEnquiriesCSV();
    } catch (err) {
      alert('Failed to export CSV: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-maroon-950">
            Quotation & Product Enquiries
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Review incoming specifications, update enquiry pipeline statuses, and record official quotations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="px-4 py-2.5 bg-white border border-gold-600/40 text-charcoal hover:bg-beige text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Download className="w-4 h-4 text-gold-700" />
          <span>Export All Enquiries to CSV</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gold-600/30 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by Enquiry Reference (e.g. SSVM-2026-1001), Customer, City, or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg pl-9 pr-20 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
          />
          <Search className="w-4 h-4 text-gold-700 absolute left-3 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-maroon-800 text-gold-300 font-semibold text-xs rounded"
          >
            Search
          </button>
        </form>

        {/* Status Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st === 'all' ? 'All Enquiry Statuses' : st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-xl border border-gold-600/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6ED] text-charcoal-muted font-semibold uppercase tracking-wider text-[11px] border-b border-gold-600/20">
              <tr>
                <th className="py-3 px-4">குறிப்பு எண் | Ref</th>
                <th className="py-3 px-4">தேதி | Date</th>
                <th className="py-3 px-4">வாடிக்கையாளர் | Customer</th>
                <th className="py-3 px-4">வகை | Type</th>
                <th className="py-3 px-4">ஊர் | Location</th>
                <th className="py-3 px-4">தொடர்பு | Contact</th>
                <th className="py-3 px-4">பொருட்கள் | Products</th>
                <th className="py-3 px-4">நிலை | Status</th>
                <th className="py-3 px-4 text-right">செயல்கள் | Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-600/10">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-charcoal-muted">
                    Loading customer enquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-charcoal-muted">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-beige-light/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-maroon-900">
                      {enq.enquiryRef}
                    </td>
                    <td className="py-3 px-4 text-charcoal-muted whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-charcoal block">{enq.customerName}</span>
                      {enq.organizationName && (
                        <span className="text-[11px] text-charcoal-muted block truncate max-w-xs">
                          {enq.organizationName}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-beige-light px-2 py-0.5 rounded text-[11px] font-medium border border-gold-600/20">
                        {enq.customerType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-charcoal">
                      {enq.city}, {enq.state}
                    </td>
                    <td className="py-3 px-4">
                      <span className="block">{enq.phone}</span>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        Via {enq.preferredContactMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium bg-beige-light px-2 py-0.5 rounded border border-gold-600/20">
                        {enq.items?.length || 0} Item(s)
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          STATUS_PILLS[enq.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/enquiries/${enq._id}`}
                        className="px-2.5 py-1 bg-maroon-800 text-gold-300 font-semibold text-xs rounded hover:bg-maroon-900 transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gold-600/20 flex items-center justify-between text-xs text-charcoal-muted">
            <span>
              Showing Page {page} of {totalPages} ({total} Total Records)
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

export default AdminEnquiriesPage;
