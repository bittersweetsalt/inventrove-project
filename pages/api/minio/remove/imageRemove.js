import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT, // Replace with your Minio endpoint URL
    port: 9000, // Replace with your Minio port (default is 9000)
    useSSL: false, // Set to true if using HTTPS (recommended)
    accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY, // Replace with your Minio access key
    secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY, // Replace with your Minio secret key
  });

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const parsed_data = JSON.parse(req.body);
            // console.log(parsed_data)
            const removeList = [];
            for (const item in parsed_data){
                // console.log(parsed_data[item].headers.name);
                removeList.push({name: parsed_data[item].headers.name});
            }
            await minioClient.removeObjects('projectimages', removeList);
            res.status(200).json({ message: 'Objects removed successfully' });
        }
        
    } catch (err) {
        console.error('Error removing image:', err);
        return res.status(500).json({ message: 'Error removing image' });
    }
}
