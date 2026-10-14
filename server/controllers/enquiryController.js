import Enquiry from '../models/Enquiry.js';
import Product from '../models/Product.js';
import { processImageUpload } from '../middleware/upload.js';

// Generate sequential or random unique reference: SSVM-YYYY-XXXXX
const generateEnquiryRef = async () => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ref = `SSVM-${year}-${randomSuffix}`;
  
  const existing = await Enquiry.findOne({ enquiryRef: ref });
  if (existing) {
    return generateEnquiryRef();
  }
  return ref;
};

/**
 * @desc    Submit public quotation / product enquiry
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = async (req, res, next) => {
  try {
    const {
      customerName,
      organizationName,
      phone,
      email,
      state,
      city,
      customerType,
      items,
      materialPreference,
      sizeRequirements,
      customizationDetails,
      message,
      preferredContactMethod,
      sourcePage,
    } = req.body;

    if (!customerName || !phone || !state || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name, phone number, state, and city.',
      });
    }

    // Process reference image files if uploaded with multipart form
    let referenceImages = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        processImageUpload(file.buffer, file.originalname, 'ssvm_enquiry_refs')
      );
      const uploaded = await Promise.all(uploadPromises);
      referenceImages = uploaded.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    } else if (req.body.referenceImages && Array.isArray(req.body.referenceImages)) {
      referenceImages = req.body.referenceImages;
    }

    // Format items array safely
    let formattedItems = [];
    if (Array.isArray(items)) {
      formattedItems = items.map((item) => ({
        product: item.product || null,
        productName: item.productName || 'Custom Temple Metalware Requirement',
        productCode: item.productCode || '',
        quantity: Math.max(1, Number(item.quantity) || 1),
        requirements: item.requirements || '',
      }));
    } else if (req.body.productId) {
      // Single product shorthand
      const product = await Product.findById(req.body.productId);
      formattedItems.push({
        product: product ? product._id : null,
        productName: product ? product.name : req.body.productName || 'Temple Metal Product',
        productCode: product ? product.productCode : '',
        quantity: Math.max(1, Number(req.body.quantity) || 1),
        requirements: req.body.productRequirements || '',
      });
    }

    const enquiryRef = await generateEnquiryRef();

    const enquiry = await Enquiry.create({
      enquiryRef,
      customerName: customerName.trim(),
      organizationName: organizationName ? organizationName.trim() : '',
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : '',
      state: state.trim(),
      city: city.trim(),
      customerType: customerType || 'Individual',
      items: formattedItems,
      materialPreference: materialPreference || '',
      sizeRequirements: sizeRequirements || '',
      customizationDetails: customizationDetails || '',
      message: message ? message.trim() : '',
      referenceImages,
      preferredContactMethod: preferredContactMethod || 'WhatsApp',
      sourcePage: sourcePage || '',
      status: 'New',
    });

    res.status(201).json({
      success: true,
      enquiryRef: enquiry.enquiryRef,
      message:
        'Thank you for contacting Sri Shakthi Vinayaga Metals. Your quotation request has been received. Our team will review your requirements and contact you.',
      data: {
        id: enquiry._id,
        enquiryRef: enquiry.enquiryRef,
        customerName: enquiry.customerName,
        phone: enquiry.phone,
        itemsCount: enquiry.items.length,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all enquiries for Admin
 * @route   GET /api/admin/enquiries
 * @access  Private (Admin)
 */
export const getAdminEnquiries = async (req, res, next) => {
  try {
    const { status, search, customerType, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (customerType && customerType !== 'all') {
      query.customerType = customerType;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { enquiryRef: searchRegex },
        { customerName: searchRegex },
        { phone: searchRegex },
        { organizationName: searchRegex },
        { city: searchRegex },
        { 'items.productName': searchRegex },
        { 'items.productCode': searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single enquiry details by ID for Admin
 * @route   GET /api/admin/enquiries/:id
 * @access  Private (Admin)
 */
export const getAdminEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('items.product');
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry record not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update enquiry status, quotation details, or add admin notes
 * @route   PATCH /api/admin/enquiries/:id
 * @access  Private (Admin)
 */
export const updateAdminEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    const {
      status,
      quotationAmount,
      quotationCurrency,
      quotationNotes,
      quotationSentAt,
      newNote,
    } = req.body;

    if (status) {
      enquiry.status = status;
      if (status === 'Quotation Sent' && !enquiry.quotationSentAt) {
        enquiry.quotationSentAt = new Date();
      }
    }

    if (quotationAmount !== undefined) {
      enquiry.quotationAmount = quotationAmount === '' ? null : Number(quotationAmount);
    }

    if (quotationCurrency) {
      enquiry.quotationCurrency = quotationCurrency;
    }

    if (quotationNotes !== undefined) {
      enquiry.quotationNotes = quotationNotes;
    }

    if (quotationSentAt) {
      enquiry.quotationSentAt = quotationSentAt;
    }

    if (newNote && newNote.trim()) {
      enquiry.adminNotes.push({
        note: newNote.trim(),
        addedBy: req.admin ? req.admin.name : 'Administrator',
        addedAt: new Date(),
      });
    }

    await enquiry.save();

    res.status(200).json({
      success: true,
      data: enquiry,
      message: 'Enquiry record updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export enquiries to CSV for Excel compatibility
 * @route   GET /api/admin/enquiries/export
 * @access  Private (Admin)
 */
export const exportEnquiriesCSV = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const headers = [
      'Enquiry Ref',
      'Date',
      'Customer Name',
      'Organization / Temple',
      'Phone',
      'Email',
      'City',
      'State',
      'Customer Type',
      'Status',
      'Products Requested',
      'Quotation Amount (INR)',
      'Preferred Contact Method',
    ];

    const rows = enquiries.map((enq) => {
      const productList = enq.items
        .map((it) => `${it.productName} (Qty: ${it.quantity})`)
        .join('; ');

      const escapeCSV = (val) => {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      return [
        escapeCSV(enq.enquiryRef),
        escapeCSV(enq.createdAt.toISOString().split('T')[0]),
        escapeCSV(enq.customerName),
        escapeCSV(enq.organizationName),
        escapeCSV(enq.phone),
        escapeCSV(enq.email),
        escapeCSV(enq.city),
        escapeCSV(enq.state),
        escapeCSV(enq.customerType),
        escapeCSV(enq.status),
        escapeCSV(productList),
        escapeCSV(enq.quotationAmount || 'Pending'),
        escapeCSV(enq.preferredContactMethod),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="SSVM_Enquiries_${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
