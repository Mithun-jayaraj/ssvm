import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  Inbox,
  Clock,
  CheckCircle,
  FileText,
  Plus,
  ArrowRight,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { getDashboardMetrics } from '../../services/settingsService';
import { exportEnquiriesCSV } from '../../services/enquiryService';

const STATUS_COLORS = {
  New: 'bg-blue-100 text-blue-800 border-blue-300',
  Contacted: 'bg-purple-100 text-purple-800 border-purple-300',
  'Quotation Prepared': 'bg-amber-100 text-amber-800 border-amber-300',
  'Quotation Sent': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  Negotiation: 'bg-orange-100 text-orange-800 border-orange-300',
  Converted: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Closed: 'bg-gray-100 text-gray-700 border-gray-300',
};

const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await getDashboardMetrics();
      if (res.data) setMetrics(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleExportCSV = async () => {
    try {
      await exportEnquiriesCSV();
    } catch (err) {
      alert('Failed to export CSV: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-charcoal-muted">Loading administrative dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-maroon-950">
            Overview Dashboard
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Real-time status of temple metalware products, categories, and customer quotation requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white border border-gold-600/40 text-charcoal hover:bg-beige text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gold-700" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-gold-300 text-xs font-semibold rounded-lg flex items-center gap-2 shadow transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Published Products */}
        <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-muted font-medium block">
              Published Products
            </span>
            <span className="font-serif font-bold text-2xl text-charcoal mt-1 block">
              {metrics?.publishedProductsCount || 0}
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">
              Active in public catalogue
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Draft Products */}
        <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-muted font-medium block">Draft Products</span>
            <span className="font-serif font-bold text-2xl text-charcoal mt-1 block">
              {metrics?.draftProductsCount || 0}
            </span>
            <span className="text-[11px] text-charcoal-muted mt-0.5 block">
              Unpublished / In preparation
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* New Enquiries */}
        <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-muted font-medium block">New Enquiries</span>
            <span className="font-serif font-bold text-2xl text-blue-800 mt-1 block">
              {metrics?.newEnquiriesCount || 0}
            </span>
            <span className="text-[11px] text-blue-600 mt-0.5 block">Awaiting first contact</span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Quotations */}
        <div className="bg-white p-5 rounded-xl border border-gold-600/30 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-muted font-medium block">
              Quotation Pipeline
            </span>
            <span className="font-serif font-bold text-2xl text-maroon-900 mt-1 block">
              {metrics?.pendingQuotationCount || 0}
            </span>
            <span className="text-[11px] text-maroon-700 mt-0.5 block">
              Enquiries under calculation
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-maroon-50 text-maroon-800 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-xl border border-gold-600/30 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gold-600/20 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-maroon-950">
              Recent Quotation Enquiries
            </h2>
            <p className="text-xs text-charcoal-muted">
              Latest incoming product enquiries from temples and patrons across India.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-serif font-semibold text-maroon-800 hover:text-gold-700 flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6ED] text-charcoal-muted font-semibold uppercase tracking-wider text-[11px] border-b border-gold-600/20">
              <tr>
                <th className="py-3 px-4">Ref Code</th>
                <th className="py-3 px-4">Customer / Temple</th>
                <th className="py-3 px-4">City / State</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-600/10">
              {metrics?.recentEnquiries && metrics.recentEnquiries.length > 0 ? (
                metrics.recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-beige-light/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-maroon-900">
                      {enq.enquiryRef}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-charcoal block">{enq.customerName}</span>
                      {enq.organizationName && (
                        <span className="text-[11px] text-charcoal-muted block truncate max-w-xs">
                          {enq.organizationName}
                        </span>
                      )}
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
                        {enq.items?.length || 0} Product(s)
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          STATUS_COLORS[enq.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/enquiries/${enq._id}`}
                        className="text-xs font-semibold text-maroon-800 hover:text-gold-700 underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-charcoal-muted">
                    No enquiries recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
