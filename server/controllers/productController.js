import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { processImageUpload } from '../middleware/upload.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');

/**
 * @desc    Get published products for public catalogue
 * @route   GET /api/products
 * @access  Public
 */
export const getPublicProducts = async (req, res, next) => {
  try {
    const {
      category,
      material,
      search,
      sort = 'newest',
      page = 1,
      limit = 12,
    } = req.query;

    const query = { status: 'published' };

    // Category filter (support slug or id)
    if (category && category !== 'all') {
      let catDoc = null;
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        catDoc = await Category.findById(category);
      } else {
        catDoc = await Category.findOne({ slug: category });
      }

      if (catDoc) {
        query.category = catDoc._id;
      }
    }

    // Material filter
    if (material && material !== 'all') {
      query.material = { $regex: new RegExp(material, 'i') };
    }

    // Search query
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { productCode: searchRegex },
        { shortDescription: searchRegex },
        { material: searchRegex },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'name_asc') {
      sortOptions = { name: 1 };
    } else if (sort === 'name_desc') {
      sortOptions = { name: -1 };
    } else if (sort === 'featured') {
      sortOptions = { isFeatured: -1, createdAt: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug isPrimary')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured products for homepage
 * @route   GET /api/products/featured
 * @access  Public
 */
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      status: 'published',
      isFeatured: true,
    })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(8);

    // If less than 4 featured, pull additional published products to maintain visual grandeur
    let results = products;
    if (results.length < 4) {
      const existingIds = results.map((p) => p._id);
      const additional = await Product.find({
        status: 'published',
        _id: { $nin: existingIds },
      })
        .populate('category', 'name slug')
        .sort({ createdAt: -1 })
        .limit(8 - results.length);
      results = [...results, ...additional];
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single published product by slug
 * @route   GET /api/products/:slug
 * @access  Public
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: 'published',
    }).populate('category', 'name slug description isPrimary');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or has been unpublished.',
      });
    }

    // Related products in same category
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      status: 'published',
    })
      .limit(4)
      .populate('category', 'name slug');

    res.status(200).json({
      success: true,
      data: product,
      relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products for Admin (all statuses)
 * @route   GET /api/admin/products
 * @access  Private (Admin)
 */
export const getAdminProducts = async (req, res, next) => {
  try {
    const { category, status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { productCode: searchRegex },
        { material: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID for admin editor
 * @route   GET /api/admin/products/:id
 * @access  Private (Admin)
 */
export const getAdminProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/admin/products
 * @access  Private (Admin)
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      productCode,
      category,
      shortDescription,
      fullDescription,
      material,
      dimensions,
      weight,
      finish,
      specifications,
      variants,
      imageGallery,
      primaryImage,
      customizationAvailable,
      isFeatured,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!name || !productCode || !category) {
      return res.status(400).json({
        success: false,
        message: 'Product name, product code, and category are required.',
      });
    }

    // Check unique product code
    const existingCode = await Product.findOne({ productCode: productCode.trim().toUpperCase() });
    if (existingCode) {
      return res.status(400).json({
        success: false,
        message: `Product code "${productCode}" is already in use. Please specify a unique code.`,
      });
    }

    let slug = slugify(name);
    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${productCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    }

    // Determine primary image
    let computedPrimaryImage = primaryImage || '';
    if (!computedPrimaryImage && Array.isArray(imageGallery) && imageGallery.length > 0) {
      const primaryEntry = imageGallery.find((img) => img.isPrimary);
      computedPrimaryImage = primaryEntry ? primaryEntry.url : imageGallery[0].url;
    }

    const product = await Product.create({
      name,
      slug,
      productCode: productCode.trim().toUpperCase(),
      category,
      shortDescription,
      fullDescription,
      material: material || 'Brass',
      dimensions,
      weight,
      finish: finish || 'Traditional Antique Brass Finish',
      specifications: Array.isArray(specifications) ? specifications : [],
      variants: Array.isArray(variants) ? variants : [],
      imageGallery: Array.isArray(imageGallery) ? imageGallery : [],
      primaryImage: computedPrimaryImage,
      customizationAvailable: customizationAvailable !== undefined ? Boolean(customizationAvailable) : true,
      isFeatured: Boolean(isFeatured),
      status: status || 'published',
      seoTitle: seoTitle || `${name} | Sri Shakthi Vinayaga Metals`,
      seoDescription: seoDescription || shortDescription,
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/admin/products/:id
 * @access  Private (Admin)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    if (req.body.productCode && req.body.productCode.toUpperCase() !== product.productCode) {
      const codeExists = await Product.findOne({
        productCode: req.body.productCode.trim().toUpperCase(),
        _id: { $ne: product._id },
      });
      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: `Product code "${req.body.productCode}" is already in use.`,
        });
      }
      req.body.productCode = req.body.productCode.trim().toUpperCase();
    }

    if (req.body.name && req.body.name !== product.name && !req.body.slug) {
      let slug = slugify(req.body.name);
      const slugExists = await Product.findOne({ slug, _id: { $ne: product._id } });
      if (slugExists) {
        slug = `${slug}-${(req.body.productCode || product.productCode).toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      }
      req.body.slug = slug;
    }

    // Set primary image from gallery if not set
    if (Array.isArray(req.body.imageGallery) && req.body.imageGallery.length > 0) {
      const primaryEntry = req.body.imageGallery.find((img) => img.isPrimary);
      req.body.primaryImage = primaryEntry ? primaryEntry.url : req.body.imageGallery[0].url;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Product updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/admin/products/:id
 * @access  Private (Admin)
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted permanently.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload multiple product images
 * @route   POST /api/admin/products/upload-images
 * @access  Private (Admin)
 */
export const uploadProductImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one image file to upload.',
      });
    }

    const uploadPromises = req.files.map((file) =>
      processImageUpload(file.buffer, file.originalname, 'ssvm_products')
    );

    const uploadedImages = await Promise.all(uploadPromises);

    const formatted = uploadedImages.map((img, index) => ({
      url: img.url,
      public_id: img.public_id,
      alt: req.body.alt || 'Sri Shakthi Vinayaga Metals Product',
      isPrimary: index === 0,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
      message: `Successfully uploaded ${uploadedImages.length} image(s).`,
    });
  } catch (error) {
    next(error);
  }
};
