import Category from '../models/Category.js';
import Product from '../models/Product.js';

// Helper to slugify string
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');

/**
 * @desc    Get active categories for public website
 * @route   GET /api/categories
 * @access  Public
 */
export const getPublicCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
    
    // Add product counts for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({
          category: cat._id,
          status: 'published',
        });
        return {
          ...cat.toObject(),
          productCount: count,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      data: categoriesWithCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single category by slug
 * @route   GET /api/categories/:slug
 * @access  Public
 */
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const count = await Product.countDocuments({
      category: category._id,
      status: 'published',
    });

    res.status(200).json({
      success: true,
      data: {
        ...category.toObject(),
        productCount: count,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all categories for admin (including inactive)
 * @route   GET /api/admin/categories
 * @access  Private (Admin)
 */
export const getAdminCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, createdAt: -1 });
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return {
          ...cat.toObject(),
          productCount: count,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      data: categoriesWithCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new category
 * @route   POST /api/admin/categories
 * @access  Private (Admin)
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, tamilName, description, tamilDescription, image, iconName, displayOrder, isPrimary, isActive } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required.',
      });
    }

    let slug = req.body.slug ? slugify(req.body.slug) : slugify(name);

    const existingCat = await Category.findOne({ slug });
    if (existingCat) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const category = await Category.create({
      name,
      tamilName: tamilName || '',
      nameTranslations: req.body.nameTranslations || {},
      slug,
      description,
      tamilDescription: tamilDescription || '',
      descriptionTranslations: req.body.descriptionTranslations || {},
      image,
      iconName: iconName || 'Sparkles',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isPrimary: Boolean(isPrimary),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update category
 * @route   PUT /api/admin/categories/:id
 * @access  Private (Admin)
 */
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    if (req.body.name && req.body.name !== category.name && !req.body.slug) {
      req.body.slug = slugify(req.body.name);
    } else if (req.body.slug) {
      req.body.slug = slugify(req.body.slug);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/admin/categories/:id
 * @access  Private (Admin)
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    const productCount = await Product.countDocuments({ category: category._id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. There are ${productCount} products assigned to it. Please reassign or delete those products first.`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
