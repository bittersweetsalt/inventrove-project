// import minioClient from '../../utils/minioClient'; // Configure Minio client instance
import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT, // Replace with your Minio endpoint URL
    port: 9000, // Replace with your Minio port (default is 9000)
    useSSL: false, // Set to true if using HTTPS (recommended)
    accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY, // Replace with your Minio access key
    secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY, // Replace with your Minio secret key
});

export default async function streamMultipleObjects(req, res) {
    try {
        const objectsList = await new Promise((resolve, reject) => {
            const objects = [];
            const stream = minioClient.listObjects('projectimages', req.body.minio_image_path, true);
            stream.on('data', obj => objects.push(obj));
            stream.on('end', () => resolve(objects));
            stream.on('error', reject);
        });

        let imageStreamArray = [];
        for (const obj of objectsList) {
            if (!obj.name.endsWith('.jpg') && !obj.name.endsWith('.jpeg') && !obj.name.endsWith('.png')) {
                // Skip non-image files (optional)
                continue;
            }
            else{
                imageStreamArray.push(obj.name);
            }
        }
        
        res.status(200).json(imageStreamArray);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}