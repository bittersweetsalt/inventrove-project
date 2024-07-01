import multer from 'multer';
import * as Minio from 'minio';

const upload = multer({ dest: '/tmp' }); // Temporary storage (optional)

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
  if (req.method === 'POST') {
    try {
      // Handle multiple file uploads with Multer
      upload.single('image')(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Upload failed', error: err });
        }
        console.log(req.file);
        const uploadedFile = req.file;
        console.log(uploadedFile);

        const filePath = `/tmp/${uploadedFile.filename}`; // Adjust if temp storage is used
        const objectName = `${Date.now()}-${uploadedFile.originalname}`; // Generate unique name
        const bucketName = 'projectimages';


        await minioClient.fPutObject(bucketName, objectName, filePath, (uploadError) => {
            if (uploadError) {
                console.error('Error uploading to Minio:', uploadError);
                return res.status(500).json({ message: 'Upload to Minio failed' });
            }

            console.log(`File ${objectName} uploaded to Minio successfully: ${uploadedFile.size}`);
            console.log(`File path: ${uploadedFile.path}`);
        });

        // Upload files to Minio one by one using a loop
        // for (const file of uploadedFiles) {
        //   const filePath = `/tmp/${file.filename}`; // Adjust if temp storage is used
        //   const objectName = `${Date.now()}-${file.originalname}`; // Generate unique name

        //   await minioClient.putObject(filePath, objectName, (uploadError) => {
        //     if (uploadError) {
        //       console.error('Error uploading to Minio:', uploadError);
        //       return res.status(500).json({ message: 'Upload to Minio failed' });
        //     }

        //     console.log(`File ${objectName} uploaded to Minio successfully`);
        //   });
        // }

        res.status(200).json({ message: 'Images uploaded successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}