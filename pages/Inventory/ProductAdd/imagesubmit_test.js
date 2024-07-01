import { useState } from 'react';

export default function ImageSubTest() {
    const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  console.log(selectedFiles)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // for (const file of selectedFiles) {
    //   formData.append('images', file);
    // }
    formData.append('image', selectedFiles[0]);

    try {
      const response = await fetch('/api/minio/upload/upload_test', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload response:', data);
      setSelectedFiles([]); // Clear file selection after successful upload
    } catch (error) {
      console.error('Upload error:', error);
      // Handle upload errors gracefully
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
