// Import MinIO client
import Minio from 'minio';

// Initialize MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT, // MinIO server endpoint
  port: process.env.MINIO_PORT, // MinIO server port (default is 9000)
  useSSL: false, // Whether to use SSL (default is false)
  accessKey: process.env.MINIO_ACCESS_KEY, // MinIO access key
  secretKey: process.env.MINIO_SECRET_KEY, // MinIO secret key
});

// Function to upload image to MinIO
const uploadImageToMinio = async (file) => {
    const bucketName = 'your-bucket-name'; // Name of the bucket in MinIO
    const objectName = `images/${file.name}`; // Object name (path) in the bucket
  
    try {
      // Upload file to MinIO
      await minioClient.putObject(bucketName, objectName, file.path);
      console.log('Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  // Function to handle file upload
const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      uploadImageToMinio(file); // Upload the file to MinIO
    }
  };
  
  // Render file input for uploading images
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );