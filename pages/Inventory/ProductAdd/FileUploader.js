import React, { useState, useEffect } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() =>{
    console.log("USEEFFECT:");
    console.log(file);
  }, [file])

  var Minio = require('minio');
  var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: '5Zoyaz0T5xKHzJjslPFt',
    secretKey: '9tSTGB9KPmw0YMOH2qC7dtlGnHXIM6yo27RXVzGD',
  })
  
  // Function to upload image to MinIO
  const uploadImageToMinio = async () => {
        const bucketName = "projectimages"; // Name of the bucket in MinIO
        const objectName = `images/${file.name}`; // Object name (path) in the bucket
        // console.log(file);
        try {
            // Upload file to MinIO
            await minioClient.fPutObject(bucketName, objectName, file.path);
            console.log('Image uploaded successfully.');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    
    // Function to handle file upload
  const handleFileUpload = (e) => {
        const files = e.target.files[0]; // Get the uploaded file
        console.log( e.target.files[0]);
        if (files) {
            uploadImageToMinio(files); // Upload the file to MinIO
        }
    };
    

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Send file to MinIO using Fetch
      const response = await fetch('http://localhost:9000', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      console.log('Upload successful');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImageToMinio} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUploader;
