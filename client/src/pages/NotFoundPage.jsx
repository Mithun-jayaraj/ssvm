import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-[#FAF6ED] min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gold-600/30 p-8 text-center shadow-card-elevated space-y-5">
        <div className="w-16 h-16 bg-maroon-50 text-maroon-800 rounded-full flex items-center justify-center mx-auto border border-gold-600/30 font-serif font-bold text-2xl">
          404
        </div>
        <h1 className="font-serif font-bold text-2xl text-charcoal">Page Not Found</h1>
        <p className="text-xs text-charcoal-muted leading-relaxed">
          The requested page or temple product catalogue item could not be found. It may have been moved or updated.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-semibold text-xs rounded flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/products"
            className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-maroon-950 font-semibold text-xs rounded flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
