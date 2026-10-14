import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Award,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { settings, getWhatsAppLink } = useSettings();

  const categoriesList = [
    { name: 'Prabavalayam (Temple Arch)', path: '/products?category=prabavalayam' },
    { name: 'Gopuram Kalasam (Stupi)', path: '/products?category=kalasam' },
    { name: 'Goddess Statues', path: '/products?category=goddess-statues' },
    { name: 'Hindu Deity Statues', path: '/products?category=deity-statues' },
    { name: 'Temple Accessories & Bells', path: '/products?category=temple-accessories' },
    { name: 'Brass Pooja Ritualware', path: '/products?category=brass-pooja-products' },
    { name: 'Custom Temple Metalwork', path: '/custom-manufacturing' },
  ];

  return (
    <footer className="bg-[#260811] text-[#EDE4D5] border-t-4 border-gold-600 relative pt-16 pb-8">
      {/* Subtle traditional temple motif accent */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-6 bg-gold-600 clip-temple-pinnacle flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-maroon-900"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold-600/20">
          {/* Col 1: Brand & Craftsmanship */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-gold-500 bg-maroon-900 flex items-center justify-center p-1">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <circle cx="32" cy="32" r="30" fill="#4A1424" stroke="#C5A15B" strokeWidth="2"/>
                  <path d="M18 48 C18 22, 46 22, 46 48" stroke="#C5A15B" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="32" cy="14" r="3" fill="#C5A15B"/>
                  <path d="M32 20 L35 27 L29 27 Z" fill="#C5A15B"/>
                  <ellipse cx="32" cy="33" rx="8" ry="6" fill="#C5A15B"/>
                </svg>
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400 tracking-wider">
                SRI SHAKTHI VINAYAGA METALS
              </h3>
            </div>
            <p className="text-sm text-[#FAF6ED]/75 leading-relaxed mb-5">
              Premier manufacturer of traditional South Indian temple metalware, handcrafted Prabavalayam arches, consecrated Gopuram Kalasams, deity vigrahams, and sacred architectural metalworks based in Tirupur, Tamil Nadu.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>Direct Manufacturer Pricing & Custom Sizing</span>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div>
            <h4 className="font-serif font-semibold text-base text-gold-400 tracking-wide mb-4 border-b border-gold-600/30 pb-2">
              Primary Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categoriesList.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-[#EDE4D5]/80 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif font-semibold text-base text-gold-400 tracking-wide mb-4 border-b border-gold-600/30 pb-2">
              Customer Information
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/request-quote" className="hover:text-gold-300 transition-colors text-[#EDE4D5]/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Request a Quotation</span>
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="hover:text-gold-300 transition-colors text-[#EDE4D5]/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Custom Temple Specifications</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors text-[#EDE4D5]/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>About Our Foundry</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors text-[#EDE4D5]/80 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Contact & Factory Location</span>
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Enquiry</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Tirupur Works & Contact */}
          <div>
            <h4 className="font-serif font-semibold text-base text-gold-400 tracking-wide mb-4 border-b border-gold-600/30 pb-2">
              Works & Factory
            </h4>
            <ul className="space-y-3 text-sm text-[#EDE4D5]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                <span>
                  {settings.doorAddress ? `${settings.doorAddress}, ` : ''}
                  {settings.city}, {settings.state} - {settings.pincode}, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-gold-300">
                  {settings.phone}
                </a>
              </li>
              {settings.alternativePhone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                  <a href={`tel:${settings.alternativePhone}`} className="hover:text-gold-300">
                    {settings.alternativePhone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-300">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-xs text-gold-300/90">{settings.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF6ED]/60">
          <p>
            © {new Date().getFullYear()} Sri Shakthi Vinayaga Metals, Tirupur. All rights reserved.
          </p>

          <p className="text-center md:text-right text-[11px] text-gold-400/80">
            * Direct manufacturer platform. All quotations are tailored and confirmed directly with the manufacturer. No online payment checkout.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="text-gold-500/70 hover:text-gold-400 flex items-center gap-1 transition-colors"
              title="Administrator Management Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
