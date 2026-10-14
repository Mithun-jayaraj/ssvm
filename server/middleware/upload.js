import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure local uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Memory storage for multer so we can stream to Cloudinary or write to disk
const storage = multer.memoryStorage();

// File filter: accept only standard image types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and AVIF images are permitted.'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
});

/**
 * Upload single buffer to Cloudinary or save to local filesystem
 */
export const processImageUpload = async (fileBuffer, originalName, folder = 'ssvm_products') => {
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
      uploadStream.end(fileBuffer);
    });
  } else {
    // Local storage fallback
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(originalName) || '.jpg';
    const fileName = `${folder.replace('/', '_')}-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.promises.writeFile(filePath, fileBuffer);

    return {
      url: `/uploads/${fileName}`,
      public_id: `local_${uniqueSuffix}`,
    };
  }
};
