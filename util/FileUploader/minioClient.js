import { MinioClient } from 'minio';

const minioClient = new MinioClient({
  endPoint: 'your-minio-endpoint', // Replace with your Minio endpoint URL
  port: 9000, // Replace with your Minio port (default is 9000)
  useSSL: true, // Set to true if using HTTPS (recommended)
  accessKey: 'your-access-key', // Replace with your Minio access key
  secretKey: 'your-secret-key', // Replace with your Minio secret key
});

export default minioClient;