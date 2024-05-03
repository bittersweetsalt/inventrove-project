import multer from 'multer';
// import minioClient from '../../utils/minioClient'; // Configure Minio client instance
import * as Minio from 'minio';

const upload = multer({ dest: '/tmp' }); // Configure temporary storage for uploaded files

const minioClient = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT, // Replace with your Minio endpoint URL
    port: 9000, // Replace with your Minio port (default is 9000)
    useSSL: false, // Set to true if using HTTPS (recommended)
    accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY, // Replace with your Minio access key
    secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY, // Replace with your Minio secret key
  });

export const config = {
  api: {
    bodyParser: false, // Disables bodyParser for multer to handle form data
  },
};

export default async function handler(req, res) {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ message: 'Error uploading image' });
      }

      const uploadedFile = req.file;
      const originalFilename = uploadedFile.originalname;

      // Validate file type (optional)
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
        return res.status(400).json({ message: 'Invalid image format' });
      }

      // You don't directly create a new file here, but process the uploaded one

      // Upload the image to Minio (or other processing)
      const filePath = uploadedFile.path;
      const bucketName = 'projectimages';
      const objectName = originalFilename; // Create a unique filename

      await minioClient.putObject(bucketName, objectName, filePath);
      console.log('Image uploaded successfully!');

      return res.status(200).json({ message: 'Image uploaded successfully' });
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    return res.status(500).json({ message: 'Error uploading image' });
  }
}