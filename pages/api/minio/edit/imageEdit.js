import multer from 'multer';
import * as Minio from 'minio';

// Adds all images sent from ProductAdd //
// Creates a new pathname which Minio creates new Directory for Minio Insertions

const minioClient = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT, // Replace with your Minio endpoint URL
    port: 9000, // Replace with your Minio port (default is 9000)
    useSSL: false, // Set to true if using HTTPS (recommended)
    accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY, // Replace with your Minio access key
    secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY, // Replace with your Minio secret key
});

const upload = multer({ dest: '/tmp' }); // Configure temporary storage for uploaded files


export const config = {
    api: {
        bodyParser: false, // Disables bodyParser for multer to handle form data
    },
};

// Middleware to run Multer
const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  };
  
  export default async function handler(req, res) {
    await runMiddleware(req, res, upload.array('images', 10)); // Adjust the number as needed

    // console.log('Files:', req.files); // Log the files to debug
    // console.log('Body:', req.body); // Log the body to debug

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
        // Upload files to Minio

        const uploadPromises = req.files.map(file => {
            const metaData = {
                'Content-Type': file.mimetype,
            };
            console.log(file)

            return new Promise((resolve, reject) => {
                minioClient.fPutObject('projectimages', req.body.minio_imagepath + "/" + file.originalname, file.path, metaData, (err, etag) => {
                    if (err) {
                        console.error('Error uploading file to Minio:', err);
                        return reject(err);
                    }
                    console.log('File uploaded successfully to Minio. ETag:', etag);
                    resolve(etag);
                });
            });
        });

        await Promise.all(uploadPromises);

        res.status(200).json({ message: 'API REACHED', data: req.body });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
}