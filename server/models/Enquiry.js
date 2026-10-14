import mongoose from 'mongoose';

const enquiryItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productCode: {
    type: String,
    trim: true,
    default: '',
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Quantity must be at least 1'],
  },
  requirements: {
    type: String,
    trim: true,
    default: '',
  },
});

const adminNoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    trim: true,
  },
  addedBy: {
    type: String,
    default: 'Administrator',
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const enquirySchema = new mongoose.Schema(
  {
    enquiryRef: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    organizationName: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    customerType: {
      type: String,
      enum: ['Temple', 'Dealer', 'Wholesaler', 'Pooja Store', 'Contractor', 'Individual', 'Other'],
      default: 'Individual',
    },
    items: {
      type: [enquiryItemSchema],
      default: [],
    },
    materialPreference: {
      type: String,
      trim: true,
      default: '',
    },
    sizeRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    customizationDetails: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    referenceImages: [
      {
        url: { type: String, required: true },
        public_id: { type: String, default: '' },
      },
    ],
    preferredContactMethod: {
      type: String,
      enum: ['Phone', 'WhatsApp', 'Email'],
      default: 'WhatsApp',
    },
    sourcePage: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'New',
        'Contacted',
        'Quotation Prepared',
        'Quotation Sent',
        'Negotiation',
        'Converted',
        'Closed',
      ],
      default: 'New',
      index: true,
    },
    quotationAmount: {
      type: Number,
      default: null,
    },
    quotationCurrency: {
      type: String,
      default: 'INR',
    },
    quotationNotes: {
      type: String,
      trim: true,
      default: '',
    },
    quotationSentAt: {
      type: Date,
      default: null,
    },
    adminNotes: {
      type: [adminNoteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ customerName: 'text', phone: 'text', enquiryRef: 'text' });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
