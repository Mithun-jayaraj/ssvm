import React, { useState, useEffect } from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { getCategories } from '../services/categoryService';
import CategoryCard from '../components/common/CategoryCard';
import { CategoryGridSkeleton } from '../components/common/LoadingSkeleton';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.data) setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF6ED] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Sacred Collections
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
            Product Categories
          </h1>
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-3"></div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Explore our specialized categories of handcrafted temple metalware, architectural pinnacles, and sanctum accessories.
          </p>
        </div>

        {loading ? (
          <CategoryGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
