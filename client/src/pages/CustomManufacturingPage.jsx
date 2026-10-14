import React from 'react';
import { Link } from 'react-router-dom';
import {
  Hammer,
  Crown,
  Flame,
  DoorClosed,
  Ruler,
  CheckCircle2,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const CustomManufacturingPage = () => {
  const { getWhatsAppLink } = useSettings();

  return (
    <div className="bg-[#FAF6ED] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
            Artisanal Foundry • Sthapati Collaboration
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#262321] mt-2">
            Custom Temple Metalwork & Manufacturing
          </h1>
          <div className="w-24 h-1.5 bg-gold-600 mx-auto mt-4"></div>
          <p className="text-sm sm:text-base text-charcoal-muted mt-4 leading-relaxed">
            Every Hindu temple possesses unique sanctum proportions, architectural heritage, and Agama guidelines. At Sri Shakthi Vinayaga Metals in Tirupur, we manufacture bespoke sacred metalware engineered specifically to your temple's dimensional requirements.
          </p>
        </div>

        {/* 4 Pillars of Custom Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-4">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal">
                Custom Prabavalayam Sizing
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Fabricated to match exact idol height, shoulder width, and pedestal slots. Available in Makara torana, peacock motifs, or flame arches.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gold-700 mt-4 block">
              Brass, Bronze or Copper
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal">
                Monumental Gopuram Kalasams
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                From 18 inches to over 6 feet in height. Engineered for wind resistance, lightning earthing conductors, and hollow grain chambers.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gold-700 mt-4 block">
              99.9% Electrolytic Copper / Brass
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-4">
                <DoorClosed className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal">
                Sanctum Door Brass Cladding
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Heavy gauge brass sheets, Ashtalakshmi embossed medallions, floral borders, and solid handles for Garbhagriha teakwood doors.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gold-700 mt-4 block">
              16 & 18 Gauge Heavy Sheet
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold-600/30 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-maroon-900 text-gold-400 flex items-center justify-center mb-4">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-charcoal">
                Dhwajasthambham & Kavacham
              </h3>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                Custom segmented copper or brass cylinders for temple flagstaff masts, stepped pedestals, and deity armor kavachams.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gold-700 mt-4 block">
              Bespoke Blueprint Fabrication
            </span>
          </div>
        </div>

        {/* Detailed Consultation Process */}
        <div className="bg-white rounded-2xl border border-gold-600/30 p-8 sm:p-12 shadow-card-elevated">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-serif font-bold tracking-widest uppercase text-maroon-800">
              Workflow
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-maroon-950 mt-1">
              How We Execute Custom Temple Orders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="font-serif font-bold text-3xl text-gold-600">01</div>
              <h4 className="font-serif font-bold text-base text-charcoal">
                Dimensional Assessment & Blueprints
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                You provide deity dimensions, sthapati sketches, or site measurements. We clarify mounting clearance and weight allowances.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-serif font-bold text-3xl text-gold-600">02</div>
              <h4 className="font-serif font-bold text-base text-charcoal">
                Quotation & Material Selection
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We formulate an itemized quotation based on raw metal weight, sheet gauge, carving complexity, and wood-crate freight to your destination.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-serif font-bold text-3xl text-gold-600">03</div>
              <h4 className="font-serif font-bold text-base text-charcoal">
                Artisanal Handcrafting & Dispatch
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Our craftsmen in Tirupur forge, chisel, polish, and apply protective anti-tarnish coats. Shipped safely with reinforced crating across India.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-beige flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-700 shrink-0" />
              <div className="text-xs text-charcoal">
                <span className="font-bold block">Trusted by Temple Trusts & Sthapatis</span>
                <span>Direct consultation available for upcoming Kumbhabhishekam projects.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/request-quote"
                className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded shadow transition-all text-center flex-1 sm:flex-initial"
              >
                Submit Custom Requirement
              </Link>
              <a
                href={getWhatsAppLink('Hello Sri Shakthi Vinayaga Metals, I would like to consult with you regarding a custom temple product requirement.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm rounded flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consult</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomManufacturingPage;
