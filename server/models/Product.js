import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    tamilName: {
      type: String,
      trim: true,
      default: '',
    },
    nameTranslations: {
      ta: { type: String, default: '' },
      en: { type: String, default: '' },
      ml: { type: String, default: '' },
      te: { type: String, default: '' },
      kn: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    productCode: {
      type: String,
      required: [true, 'Product code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    tamilShortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    shortDescriptionTranslations: {
      ta: { type: String, default: '' },
      en: { type: String, default: '' },
      ml: { type: String, default: '' },
      te: { type: String, default: '' },
      kn: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    fullDescription: {
      type: String,
      trim: true,
      default: '',
    },
    tamilFullDescription: {
      type: String,
      trim: true,
      default: '',
    },
    fullDescriptionTranslations: {
      ta: { type: String, default: '' },
      en: { type: String, default: '' },
      ml: { type: String, default: '' },
      te: { type: String, default: '' },
      kn: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    material: {
      type: String,
      trim: true,
      default: 'Brass',
    },
    dimensions: {
      type: String,
      trim: true,
      default: '', // e.g. "Height: 36 inches, Width: 28 inches"
    },
    weight: {
      type: String,
      trim: true,
      default: '', // e.g. "Approx. 18 kg"
    },
    finish: {
      type: String,
      trim: true,
      default: 'Traditional Antique Brass Finish',
    },
    variants: [
      {
        name: { type: String, trim: true },
        dimensions: { type: String, trim: true },
        material: { type: String, trim: true },
        notes: { type: String, trim: true },
      },
    ],
    imageGallery: [
      {
        url: { type: String, required: true },
        public_id: { type: String, default: '' },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    primaryImage: {
      type: String,
      default: '',
    },
    specifications: [
      {
        label: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],
    customizationAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
    seoTitle: {
      type: String,
      trim: true,
      default: '',
    },
    seoDescription: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast querying
productSchema.index({ category: 1, status: 1 });
productSchema.index({ isFeatured: 1, status: 1 });
productSchema.index({ name: 'text', tamilName: 'text', shortDescription: 'text', tamilShortDescription: 'text', material: 'text', productCode: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
