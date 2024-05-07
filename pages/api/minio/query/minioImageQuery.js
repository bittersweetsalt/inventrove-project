import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT, // Replace with your Minio endpoint URL
    port: 9000, // Replace with your Minio port (default is 9000)
    useSSL: false, // Set to true if using HTTPS (recommended)
    accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY, // Replace with your Minio access key
    secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY, // Replace with your Minio secret key
  });

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             const stream = await minioClient.getObject("projectimages", req.body);
//             res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type as per your image format
//             stream.pipe(res);
//             // return res;
//         } catch (err) {
//         console.error('Error getting image:', err);
//         return res.status(500).json({ message: 'Error getting image' });
//         }
//     }
// }

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Get the object as a buffer instead of streaming it
        const object = await minioClient.getObject("projectimages", req.body);
        const buffer = await streamToBuffer(object);
        // Send the buffer as a blob
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
      } catch (err) {
        console.error('Error getting image:', err);
        return res.status(500).json({ message: 'Error getting image' });
      }
    }
  }

  // Helper function to convert a stream to a buffer
function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}