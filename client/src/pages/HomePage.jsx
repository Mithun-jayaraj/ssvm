import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  PhoneCall,
  Hammer,
  Award,
  Crown,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { getFeaturedProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import ProductCard from '../components/common/ProductCard';
import CategoryCard from '../components/common/CategoryCard';
import { ProductGridSkeleton, CategoryGridSkeleton } from '../components/common/LoadingSkeleton';
import { useSettings } from '../context/SettingsContext';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { settings, getWhatsAppLink } = useSettings();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
        ]);
        if (prodRes.data) setFeaturedProducts(prodRes.data);
        if (catRes.data) setCategories(catRes.data);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoadingProducts(false);
        setLoadingCategories(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-[#FAF6ED]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] bg-gradient-to-br from-[#260811] via-[#380E1B] to-[#4A1424] text-white flex items-center overflow-hidden border-b-4 border-gold-600">
        {/* Subtle background sacred temple overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A15B_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-600/20 border border-gold-500/40 text-gold-400 text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Sacred Craftsmanship • Tirupur, Tamil Nadu</span>
            </div>

            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#FAF6ED] tracking-tight leading-tight">
              Timeless Craftsmanship for <span className="gold-gradient-text">Sacred Spaces</span>
            </h1>

            <p className="text-[#EDE4D5]/85 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-light">
              Explore traditional temple metalware, Prabavalayam, Kalasam, deity statues, and devotional products. Connect directly with the manufacturer for product details and quotations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/products"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-sm tracking-wide rounded shadow-lg hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/request-quote"
                className="w-full sm:w-auto px-7 py-3.5 border-2 border-gold-500 hover:bg-gold-500/10 text-gold-300 font-serif font-bold text-sm tracking-wide rounded transition-all flex items-center justify-center gap-2"
              >
                <span>Request a Quotation</span>
              </Link>
            </div>

            {/* Manufacturer Trust Badges */}
            <div className="pt-6 border-t border-gold-600/30 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block font-serif font-bold text-gold-400 text-lg sm:text-xl">
                  Prabavalayam
                </span>
                <span className="text-[11px] text-[#EDE4D5]/70">Custom Deity Arches</span>
              </div>
              <div className="border-x border-gold-600/30">
                <span className="block font-serif font-bold text-gold-400 text-lg sm:text-xl">
                  Kalasam
                </span>
                <span className="text-[11px] text-[#EDE4D5]/70">Gopuram Pinnacles</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-gold-400 text-lg sm:text-xl">
                  Pan-India
                </span>
                <span className="text-[11px] text-[#EDE4D5]/70">Direct Inquiries</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Featured Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-gold-600/60 shadow-2xl p-2 bg-[#380E1B]/50 backdrop-blur-xs">
              <img
                src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80"
                alt="Traditional Brass Prabavalayam and Temple Metalware"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#260811]/90 via-transparent to-transparent rounded-xl"></div>
              
              {/* Highlight Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#380E1B]/95 border border-gold-500/50 p-4 rounded-lg shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-serif font-semibold">
                  <Crown className="w-4 h-4 text-gold-500" />
                  <span>Primary Specialization</span>
                </div>
                <p className="text-white font-serif font-bold text-sm mt-1">
                  Handcrafted Temple Prabavalayam & Kalasam
                </p>
                <p className="text-[11px] text-[#EDE4D5]/75 mt-0.5">
                  Made to order according to temple sanctorum specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SPECIALIZATION SPOTLIGHT (Prabavalayam & Kalasam) */}
      <section className="py-16 bg-[#EDE4D5]/40 border-b border-gold-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
              Manufactured with Traditional Rigor
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#262321] mt-1">
              Primary Product Specializations
            </h2>
            <div className="w-20 h-1 bg-gold-600 mx-auto mt-3"></div>
            <p className="text-sm text-charcoal-muted mt-3">
              We specialize in the two most sacred and architecturally demanding elements of South Indian temple metalware: the deity Prabavalayam and the tower Kalasam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prabavalayam Feature Card */}
            <div className="bg-white rounded-xl p-8 border-2 border-gold-600/30 shadow-md flex flex-col justify-between hover:border-gold-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-5">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-maroon-950">
                  Temple Prabavalayam (Deity Arch)
                </h3>
                <p className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                  The Prabavalayam symbolizes the cosmic aura of the divine. Our Tirupur artisans handcraft brass, bronze, and copper Prabavalayams with traditional Makara torana, Kirtimukha crests, and floral relief work tailored to fit any deity idol.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-charcoal">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Custom measurements for Moolavar & Utsavar vigrahams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Available in Antique finish, High Polish Brass, or Panchaloha</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Detachable prabha rings and reinforced structural backing</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-beige flex items-center justify-between">
                <Link
                  to="/products?category=prabavalayam"
                  className="font-serif font-bold text-sm text-maroon-800 hover:text-gold-700 flex items-center gap-2"
                >
                  <span>Explore Prabavalayam Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/request-quote?category=prabavalayam"
                  className="text-xs px-3 py-1.5 bg-gold-600 text-maroon-950 font-bold rounded hover:bg-gold-500 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Kalasam Feature Card */}
            <div className="bg-white rounded-xl p-8 border-2 border-gold-600/30 shadow-md flex flex-col justify-between hover:border-gold-500 transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-5">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-maroon-950">
                  Temple Kalasam (Stupi Pinnacles)
                </h3>
                <p className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                  The crowning pinnacle of the temple Gopuram and Vimanam. We fabricate heavy-gauge pure copper and brass Kalasams engineered for Kumbhabhishekam rituals, hollow-chambered for Navadhanya sacred grains.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-charcoal">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>99.9% Electrolytic Copper or Heavy Brass construction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Engineered for severe weather resistance atop temple towers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Custom heights from 18 inches to 6 feet with lightning rod apertures</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-beige flex items-center justify-between">
                <Link
                  to="/products?category=kalasam"
                  className="font-serif font-bold text-sm text-maroon-800 hover:text-gold-700 flex items-center gap-2"
                >
                  <span>Explore Kalasam Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/request-quote?category=kalasam"
                  className="text-xs px-3 py-1.5 bg-gold-600 text-maroon-950 font-bold rounded hover:bg-gold-500 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCT CATEGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
              Complete Catalogue
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
              Temple Product Categories
            </h2>
            <div className="w-20 h-1 bg-gold-600 mt-3"></div>
          </div>
          <Link
            to="/categories"
            className="mt-4 md:mt-0 font-serif font-semibold text-sm text-maroon-800 hover:text-gold-700 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingCategories ? (
          <CategoryGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* 4. FEATURED PRODUCTS (Dynamic from MongoDB) */}
      <section className="py-20 bg-beige/30 border-y border-gold-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
                Crafted in Tirupur
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
                Featured Temple Metalware
              </h2>
              <div className="w-20 h-1 bg-gold-600 mt-3"></div>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 font-serif font-semibold text-sm text-maroon-800 hover:text-gold-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Browse Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProducts ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Heritage & Trust
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
            Why Temples Choose Us
          </h2>
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Traditional Craftsmanship
            </h3>
            <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
              Every Prabavalayam and Vigraham is crafted in accordance with Agama Shastra guidelines, preserving centuries-old South Indian metal sculpting heritage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center mb-4">
              <Hammer className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Customized Manufacturing
            </h3>
            <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
              No two temples are identical. We customize arch heights, pedestal mountings, kalasam diameters, and sacred motifs based on your sthapati’s blueprints.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Direct Manufacturer Pricing
            </h3>
            <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
              Communicate directly with our Tirupur facility without distributor commissions, ensuring maximum value for temple trusts, contractors, and donors.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CUSTOM MANUFACTURING SECTION */}
      <section className="py-16 bg-[#380E1B] text-white border-y-2 border-gold-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-serif font-bold tracking-widest uppercase text-gold-400">
              Bespoke Temple Architecture
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-gold-300">
              Looking for a Custom Temple Product?
            </h2>
            <p className="text-[#EDE4D5]/85 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Submit your specific deity dimensions, architectural blueprints, reference photos, material preferences (Brass, Bronze, Copper, or Panchaloha), and required completion dates. Our master craftsmen in Tirupur will evaluate your requirement and formulate a detailed quotation.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              to="/custom-manufacturing"
              className="px-6 py-3.5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-sm rounded shadow-lg text-center"
            >
              Discuss Your Requirements
            </Link>
            <a
              href={getWhatsAppLink('Hello Sri Shakthi Vinayaga Metals, I would like to discuss a custom temple product manufacturing requirement.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm rounded text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Requirement</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Simple & Transparent Process
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#262321] mt-1">
            How The Quotation Process Works
          </h2>
          <div className="w-20 h-1 bg-gold-600 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              step: '01',
              title: 'Browse Catalogue',
              desc: 'Explore our range of Prabavalayam, Kalasam, and deity idols.',
            },
            {
              step: '02',
              title: 'Select Products',
              desc: 'Choose individual products or add multiple items to your quotation tray.',
            },
            {
              step: '03',
              title: 'Submit Enquiry',
              desc: 'Provide your location, dimensions, and customization preferences.',
            },
            {
              step: '04',
              title: 'Manufacturer Review',
              desc: 'Our foundry reviews metal weights, craftsmanship hours, and raw material rates.',
            },
            {
              step: '05',
              title: 'Receive Quotation',
              desc: 'Receive an official quotation directly via WhatsApp or phone consultation.',
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="bg-white p-5 rounded-xl border border-gold-600/30 text-center relative group hover:border-gold-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold-600 text-maroon-950 font-serif font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow">
                {item.step}
              </div>
              <h3 className="font-serif font-bold text-sm text-charcoal">{item.title}</h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL ENQUIRY CTA BANNER */}
      <section className="bg-gradient-to-r from-[#260811] via-[#4A1424] to-[#260811] text-[#FAF6ED] py-16 border-t-2 border-gold-600 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-gold-300">
            Equip Your Sacred Temple With Consecrated Metalware
          </h2>
          <p className="text-sm sm:text-base text-[#EDE4D5]/80 max-w-2xl mx-auto leading-relaxed">
            Whether you are commissioning a monumental Raja Gopuram Kalasam, an ornate sanctum Prabavalayam, or pooja ritualware, connect directly with Sri Shakthi Vinayaga Metals in Tirupur.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/request-quote"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-600 hover:bg-gold-500 text-maroon-950 font-serif font-bold text-sm rounded shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Submit Quotation Request
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 border border-gold-500 text-gold-300 hover:bg-gold-500/10 font-serif font-bold text-sm rounded transition-colors"
            >
              Contact Our Tirupur Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
