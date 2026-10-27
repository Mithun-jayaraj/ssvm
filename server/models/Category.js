import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
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
    description: {
      type: String,
      trim: true,
      default: '',
    },
    tamilDescription: {
      type: String,
      trim: true,
      default: '',
    },
    descriptionTranslations: {
      ta: { type: String, default: '' },
      en: { type: String, default: '' },
      ml: { type: String, default: '' },
      te: { type: String, default: '' },
      kn: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    image: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'Sparkles',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ isActive: 1, displayOrder: 1 });

const Category = mongoose.model('Category', categorySchema);
export default Category;
