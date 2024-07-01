import multer from 'multer';
import * as Minio from 'minio';

// Adds all images sent from ProductAdd //
// Creates a new pathname which Minio creates new Directory for Minio Insertions

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
        if (req.method === 'POST') {
            await upload.array('images')(req, res, async (err) => {
                if (err) {
                    console.error('Error parsing form data:', err);
                    return res.status(500).json({ message: 'Error uploading image' });
                }

                // Fetch the newest directory path
                const newest_dir_path = await fetchObjects();

                // Submission of images to Minio
                const image_promises = req.files.map(async (element) => {
                    const filePath = element.path;
                    const bucketName = 'projectimages';
                    const objectName = newest_dir_path.toString() + '/' + element.originalname;

                    const minio_result = await minioClient.fPutObject(bucketName, objectName, filePath);
                    return minio_result
                });

                const final = await Promise.all(image_promises);
                console.log(final);
                // Send the response
                return res.status(200).json({ message: 'Image uploaded successfully', productNumber: newest_dir_path });
            });
        }
    } catch (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ message: 'Error uploading image' });
    }
}

async function fetchObjects() {
    const data = [];
    try {
        const stream = minioClient.listObjects('projectimages', '', true);
        stream.on('data', (obj) => data.push(obj));
        await new Promise((resolve) => stream.on('end', resolve));

        // Sort the array and find the newest path
        data.sort((a, b) => parseInt(b.name.split("/")[0]) - parseInt(a.name.split("/")[0]));
        const newest_dir_path = parseInt(data[0].name.split("/")[0]) + 1;

        return newest_dir_path;
    } catch (err) {
        console.error('Error fetching objects:', err);
        throw err; // Propagate the error
    }
}


// export default async function handler(req, res) {
//     try {
//         if (req.method === 'POST') {
//             await upload.array('images')(req, res, async (err) => {
//                 if (err) {
//                     console.error('Error parsing form data:', err);
//                     return res.status(500).json({ message: 'Error uploading image' });
//                 }          
                
//                 // Fetches Minio list of objects.
//                 // returns the largest inventory number.
//                 // responses the new product
//                 async function fetchObjects() {
//                     const data = [];
//                     try {
//                         let newest_dir_path; // Declare it outside the function

//                         const stream = minioClient.listObjects('projectimages', '', true);
//                         stream.on('data', (obj) => data.push(obj));
//                         await new Promise((resolve) => stream.on('end', resolve));

//                         // Sort the array and find the newest path
//                         data.sort((a, b) => parseInt(b.name.split("/")[0]) - parseInt(a.name.split("/")[0]));
//                         newest_dir_path = parseInt(data[0].name.split("/")[0]) + 1; // Remove 'const' here

//                         return newest_dir_path;
//                     } catch (err) {
//                         console.error('Error fetching objects:', err);
//                     }
//                 }
//                 const newest_dir_path = await fetchObjects()

//                 // Submission of images to Minio
//                 const image_promises = req.files.map(async (element) => {
                    
//                     const filePath = element.path;
//                     const bucketName = 'projectimages';
//                     const objectName = newest_dir_path.toString() + '/'+ element.originalname; // Create a unique filename

//                     await minioClient.putObject(bucketName, objectName, filePath);

//                 });

//                 await Promise.all(image_promises);

//                 return res.status(200).json({ message: 'Image uploaded successfully', productNumber: newest_dir_path });
//             });
//         }
//     } catch (err) {
//         console.error('Error uploading image:', err);
//         return res.status(500).json({ message: 'Error uploading image' });
//     }

// }