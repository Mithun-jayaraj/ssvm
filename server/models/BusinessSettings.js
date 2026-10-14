import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'Sri Shakthi Vinayaga Metals',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Traditional Temple Metalware & Sacred Architectural Products',
      trim: true,
    },
    doorAddress: {
      type: String,
      default: 'Near Temple Road, Industrial Estate Area',
      trim: true,
    },
    city: {
      type: String,
      default: 'Tirupur',
      trim: true,
    },
    state: {
      type: String,
      default: 'Tamil Nadu',
      trim: true,
    },
    pincode: {
      type: String,
      default: '641604',
      trim: true,
    },
    country: {
      type: String,
      default: 'India',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 98422 12345',
      trim: true,
    },
    alternativePhone: {
      type: String,
      default: '+91 98422 67890',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '+919842212345',
      trim: true,
    },
    email: {
      type: String,
      default: 'enquiry@srishakthivinayagametals.com',
      trim: true,
    },
    businessHours: {
      type: String,
      default: 'Monday to Saturday: 9:00 AM – 7:30 PM (IST)',
      trim: true,
    },
    announcementText: {
      type: String,
      default: 'Premier Temple Metalware Manufacturer in Tirupur — Accepting Custom Orders & Bulk Enquiries across India',
      trim: true,
    },
    aboutStory: {
      type: String,
      default: 'Sri Shakthi Vinayaga Metals is a dedicated manufacturer of traditional South Indian temple metalware based in Tirupur, Tamil Nadu. Specializing in masterfully crafted Prabavalayam, Temple Kalasam, deity statues, and sacred temple adornments, we work closely with sthapatis, temple trust boards, contractors, and pooja stores across India to deliver durable, architecturally accurate, and spiritually revered metalcraft.',
    },
    manufacturingHighlights: {
      type: [String],
      default: [
        'Master Artisans specializing in traditional Dravidian temple iconography',
        'Custom Prabavalayam fabrication tailored to exact deity dimensions',
        'High-grade virgin brass, bronze, copper, and panchaloha casting',
        'Direct manufacturer quotations without intermediary commissions',
        'Serving temples, pooja stores, and institutions across India',
      ],
    },
    googleMapUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const BusinessSettings = mongoose.model('BusinessSettings', businessSettingsSchema);
export default BusinessSettings;
