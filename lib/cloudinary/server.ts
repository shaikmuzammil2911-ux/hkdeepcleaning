import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'nzauhpok',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

export type FolderCategory = 'posts' | 'services' | 'gallery' | 'testimonials' | 'site';

export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  category: FolderCategory = 'posts'
): Promise<{ secure_url: string; public_id: string }> {
  const folder = `hari-krishna-cleaning/${category}`;

  return new Promise((resolve, reject) => {
    if (typeof fileBuffer === 'string' && fileBuffer.startsWith('data:')) {
      cloudinary.uploader.upload(
        fileBuffer,
        {
          folder,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Cloudinary upload failed'));
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
    } else if (Buffer.isBuffer(fileBuffer)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Cloudinary stream upload failed'));
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
      uploadStream.end(fileBuffer);
    } else {
      reject(new Error('Invalid file format for Cloudinary upload'));
    }
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary deletion failed:', error);
    return false;
  }
}

export async function listCloudinaryResources(folderPrefix = 'hari-krishna-cleaning') {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPrefix,
      max_results: 100,
    });
    return result.resources || [];
  } catch (error) {
    console.error('Error fetching Cloudinary resources:', error);
    return [];
  }
}

export { cloudinary };
