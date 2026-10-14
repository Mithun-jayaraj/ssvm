import BusinessSettings from '../models/BusinessSettings.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Enquiry from '../models/Enquiry.js';

/**
 * @desc    Get public business settings
 * @route   GET /api/settings/public
 * @access  Public
 */
export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin business settings
 * @route   GET /api/admin/settings
 * @access  Private (Admin)
 */
export const getAdminSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update business settings
 * @route   PUT /api/admin/settings
 * @access  Private (Admin)
 */
export const updateAdminSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = new BusinessSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();

    res.status(200).json({
      success: true,
      data: settings,
      message: 'Business settings updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard metrics & activity overview
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin)
 */
export const getDashboardMetrics = async (req, res, next) => {
  try {
    const [
      publishedProductsCount,
      draftProductsCount,
      totalCategoriesCount,
      newEnquiriesCount,
      pendingQuotationCount,
      convertedEnquiriesCount,
      recentEnquiries,
    ] = await Promise.all([
      Product.countDocuments({ status: 'published' }),
      Product.countDocuments({ status: 'draft' }),
      Category.countDocuments({ isActive: true }),
      Enquiry.countDocuments({ status: 'New' }),
      Enquiry.countDocuments({
        status: { $in: ['New', 'Contacted', 'Quotation Prepared'] },
      }),
      Enquiry.countDocuments({ status: 'Converted' }),
      Enquiry.find().sort({ createdAt: -1 }).limit(6),
    ]);

    res.status(200).json({
      success: true,
      data: {
        publishedProductsCount,
        draftProductsCount,
        totalProductsCount: publishedProductsCount + draftProductsCount,
        totalCategoriesCount,
        newEnquiriesCount,
        pendingQuotationCount,
        convertedEnquiriesCount,
        recentEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};
