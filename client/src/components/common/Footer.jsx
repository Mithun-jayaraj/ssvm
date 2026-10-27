import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Lock,
  Clock,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import GaneshaEmblem from './GaneshaLogo';

const Footer = () => {
  const { isBilingual, currentLanguageObj, t } = useLanguage();

  return (
    <footer className="bg-[#380E1B] text-[#EDE4D5] border-t-2 border-gold-600/50 pt-8 sm:pt-10 pb-5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-7 border-b border-gold-600/20">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center gap-3">
              <GaneshaEmblem className="w-11 h-11 shrink-0" />
              <div>
                <span className="font-serif font-extrabold text-base sm:text-lg text-[#F0CF85] block leading-tight">
                  {t('about.heroTitle')}
                </span>
                {isBilingual && (
                  <span className="font-serif font-bold text-xs text-white tracking-wide block mt-0.5">
                    Sri Shakthi Vinayaga Metals
                  </span>
                )}
              </div>
            </div>
            <p className="text-[11px] text-gold-300 tracking-wide font-medium">
              {t('footer.tagline')}
            </p>
            <p className="text-xs text-[#FAF6ED]/80 leading-relaxed max-w-md">
              {t('footer.aboutFoundry')}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif font-bold text-sm text-[#F0CF85] tracking-wider uppercase mb-3">
              <span>{t('footer.quickLinks')}</span>
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="text-[#EDE4D5]/80 hover:text-white transition-colors">
                  <span>{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#EDE4D5]/80 hover:text-white transition-colors">
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/custom-manufacturing" className="text-[#EDE4D5]/80 hover:text-white transition-colors">
                  <span>{t('nav.custom')}</span>
                </Link>
              </li>
              <li>
                <Link to="/request-quote" className="text-gold-300 hover:text-white font-medium transition-colors">
                  <span>{t('nav.quote')}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#EDE4D5]/80 hover:text-white transition-colors">
                  <span>{t('nav.contact')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us & Address */}
          <div className="lg:col-span-4">
            <h4 className="font-serif font-bold text-sm text-[#F0CF85] tracking-wider uppercase mb-3">
              <span>{t('footer.contactUs')}</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE4D5]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {t('footer.addressTitle')}
                  </span>
                  <span className="block text-gold-200/90 leading-tight">
                    {t('footer.addressLocation')}
                  </span>
                  <span className="text-[11px] text-[#EDE4D5]/70 block">
                    {t('footer.addressDetail')}
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white mr-1.5">
                    {t('footer.phoneLabel')}
                  </span>
                  <a href="tel:+919842212345" className="hover:text-white text-gold-300 font-semibold">
                    +91 98422 12345 / +91 98765 43210
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white mr-1.5">
                    {t('footer.emailLabel')}
                  </span>
                  <a href="mailto:enquiry@srishakthivinayagametals.com" className="hover:text-white text-gold-200">
                    enquiry@srishakthivinayagametals.com
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white mr-1.5">
                    {t('footer.hoursLabel')}
                  </span>
                  <span className="text-[#EDE4D5]/80">
                    {t('footer.hoursDetail')}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#EDE4D5]/60">
          <p>
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-gold-400 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLanguageObj.nativeName}</span>
            </span>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold-300 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>{t('footer.adminLink')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
