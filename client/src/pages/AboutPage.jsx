import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Crown,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const AboutPage = () => {
  const { settings } = useSettings();

  return (
    <div className="bg-[#FAF6ED] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            About Our Foundry
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#262321] mt-2">
            Sri Shakthi Vinayaga Metals
          </h1>
          <div className="w-24 h-1.5 bg-gold-600 mx-auto mt-4"></div>
          <p className="text-sm sm:text-base text-charcoal-muted mt-4 leading-relaxed font-light">
            Manufacturers of traditional South Indian temple metalware, handcrafted Prabavalayam arches, consecrated Gopuram Kalasams, deity vigrahams, and sacred temple adornments based in Tirupur, Tamil Nadu.
          </p>
        </div>

        {/* Narrative & Craftsmanship Story */}
        <div className="bg-white rounded-2xl border border-gold-600/30 p-8 sm:p-12 shadow-card-elevated grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-maroon-950">
              Devotion in Metallurgy & Sacred Iconography
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {settings.aboutStory ||
                'Sri Shakthi Vinayaga Metals was established with a singular dedication: to preserve and elevate traditional South Indian temple metalcraft. Operating from Tirupur, Tamil Nadu—a prominent industrial and cultural center—we combine authentic Shilpa Shastra proportions with high-grade virgin metallurgy.'}
            </p>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              From monumental Gopuram Kalasams installed on towering temple gopurams to intricately chiseled Prabavalayams flanking sanctum deities, our metalworks are engineered to withstand continuous outdoor weather, daily milk and panchamirtham abhishekam rituals, and ceremonial sacred fires.
            </p>

            <div className="pt-2">
              <h4 className="font-serif font-semibold text-sm text-maroon-900 mb-3">
                Core Foundry Principles:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0" />
                  <span>Strict adherence to traditional Agama iconometry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0" />
                  <span>High-grade virgin brass, bronze, and copper</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0" />
                  <span>Tailored sizing for unique deity sanctums</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0" />
                  <span>Direct manufacturer quotations & no intermediaries</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-600/40 shadow-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80"
                alt="Sacred Brass Temple Metalware"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#260811]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <p className="font-serif font-bold text-base text-gold-300">
                  Tirupur Foundry & Works
                </p>
                <p className="text-[#EDE4D5]/80 mt-1">
                  Serving temples, dealers, and patrons across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing Highlights List from Settings */}
        {settings.manufacturingHighlights && settings.manufacturingHighlights.length > 0 && (
          <div className="bg-beige-light/60 rounded-2xl border border-gold-600/30 p-8 sm:p-12">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
                Capabilities
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#262321] mt-1">
                Manufacturing Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settings.manufacturingHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-gold-600/20 shadow-xs flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Quick CTA */}
        <div className="bg-gradient-to-r from-[#260811] via-[#4A1424] to-[#260811] text-white rounded-2xl p-8 sm:p-12 border-2 border-gold-600 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif font-bold text-2xl text-gold-300">
              Visiting Our Foundry in Tirupur
            </h3>
            <p className="text-xs sm:text-sm text-[#EDE4D5]/80 max-w-xl">
              We welcome temple trust delegations, sthapatis, architects, and pooja store proprietors to review our craftsmanship and discuss upcoming temple projects in person.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/contact"
              className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded text-center shadow"
            >
              Get Works Address & Hours
            </Link>
            <Link
              to="/request-quote"
              className="px-6 py-3 border border-gold-400 text-gold-300 hover:bg-gold-400/10 font-serif font-bold text-xs sm:text-sm rounded text-center"
            >
              Request a Quotation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
