import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'ssvm_secret_fallback', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);

  // Cookie options
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res
    .status(statusCode)
    .cookie('ssvm_token', token, options)
    .json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
};

/**
 * @desc    Authenticate admin & get token
 * @route   POST /api/admin/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.',
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.',
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log out admin / clear cookie
 * @route   POST /api/admin/auth/logout
 * @access  Private
 */
export const logoutAdmin = async (req, res, next) => {
  try {
    res.cookie('ssvm_token', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Administrator logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently logged in admin
 * @route   GET /api/admin/auth/me
 * @access  Private
 */
export const getAdminMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
};
