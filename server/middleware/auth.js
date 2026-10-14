import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  // 1. Check cookies first (httpOnly)
  if (req.cookies && req.cookies.ssvm_token) {
    token = req.cookies.ssvm_token;
  }
  // 2. Check Authorization Bearer header fallback
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please authenticate as an administrator.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ssvm_secret_fallback');
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'The administrator account no longer exists.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }
};
