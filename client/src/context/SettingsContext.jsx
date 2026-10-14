import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPublicSettings } from '../services/settingsService';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    businessName: 'Sri Shakthi Vinayaga Metals',
    tagline: 'Manufacturers of Sacred Temple Metalware, Prabavalayam & Kalasam',
    doorAddress: 'Near Mariamman Kovil Street, Industrial Metal Estate',
    city: 'Tirupur',
    state: 'Tamil Nadu',
    pincode: '641604',
    country: 'India',
    phone: '+91 98422 12345',
    alternativePhone: '+91 98422 67890',
    whatsappNumber: '+919842212345',
    email: 'enquiry@srishakthivinayagametals.com',
    businessHours: 'Monday to Saturday: 9:00 AM – 7:30 PM (IST)',
    announcementText: 'Direct Temple Metalware Manufacturer in Tirupur — Accepting Custom Orders & Bulk Quotations across India',
    aboutStory:
      'Sri Shakthi Vinayaga Metals is an established manufacturer of traditional South Indian temple metalware based in Tirupur, Tamil Nadu. Dedicated to sacred craftsmanship and strict adherence to Shilpa Shastra proportions, we manufacture masterfully carved Prabavalayam (temple deity arches), monumental Gopuram Kalasams, consecrated deity vigrahams, brass pooja ware, and custom sanctum metal cladding. Serving temples, sthapatis, contractors, dealers, and devotees across India.',
    manufacturingHighlights: [
      'Specialized in authentic Dravidian temple iconography & relief work',
      'Custom Prabavalayam fabrication tailored to exact deity dimensions',
      'Heavy-gauge temple Kalasams engineered for enduring weather resilience',
      'Direct factory pricing and manufacturer quotations with zero middleman markups',
      'Complete pan-India safe logistics and specialized wooden crate packaging',
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getPublicSettings();
        if (res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.warn('Using default business settings:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // WhatsApp link generator with proper URL encoding
  const getWhatsAppLink = (customMessage) => {
    const cleanNumber = (settings.whatsappNumber || '+919842212345').replace(/[^0-9]/g, '');
    const defaultMsg = `Hello ${settings.businessName}, I would like to enquire about your temple products and request a quotation.`;
    const message = customMessage || defaultMsg;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  // Dedicated Product WhatsApp enquiry generator
  const getProductWhatsAppLink = (product) => {
    if (!product) return getWhatsAppLink();
    const productUrl = `${window.location.origin}/products/${product.slug}`;
    const message = `Hello ${settings.businessName}, I would like to enquire about ${product.name}, Product Code: ${product.productCode}. Please share the available specifications and quotation.\n\nProduct Link: ${productUrl}`;
    return getWhatsAppLink(message);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        loading,
        getWhatsAppLink,
        getProductWhatsAppLink,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
