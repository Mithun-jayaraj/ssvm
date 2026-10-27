import React from 'react';
import { MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { useLanguage } from '../../context/LanguageContext';

const WhatsAppFloatingBtn = () => {
  const { getWhatsAppLink } = useSettings();
  const { language, isBilingual, getWhatsAppMessage, t } = useLanguage();

  const whatsappMessage = getWhatsAppMessage();

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-emerald-400"
          title="வாட்ஸ்அப் மூலம் தொடர்புகொள்ள | Chat directly on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
          <span className="font-semibold text-xs tracking-wide hidden lg:inline">
            {isBilingual ? (
              <>
                <span className="font-tamil">வாட்ஸ்அப் விசாரணை</span> | WhatsApp
              </>
            ) : (
              <span>{t('common.enquireWhatsApp')}</span>
            )}
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#260811] border-t-2 border-gold-600 p-2 shadow-2xl flex gap-2">
        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-2.5 rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span className="truncate">
            {isBilingual ? 'வாட்ஸ்அப் | WhatsApp' : 'WhatsApp'}
          </span>
        </a>

        <Link
          to="/request-quote"
          className="flex-1 bg-gold-600 hover:bg-gold-500 text-maroon-950 py-2 px-2.5 rounded text-xs font-serif font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span className="truncate">
            {isBilingual ? 'விலைப்புள்ளி | Quote' : t('common.quote')}
          </span>
        </Link>
      </div>
    </>
  );
};

export default WhatsAppFloatingBtn;
