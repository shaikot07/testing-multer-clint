import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const cloudinary_cloud_name = "dffbo5cwe";
const cloudinary_upload_preset = "testing_uplod";
const cloudinary_upload_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`;

const TestOne = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    course: '',
    // Add other form fields here if needed
  });
  const [apiLink, setApiLink] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = event.target.elements.file.files[0];

    if (!file) {
      // Handle error: No file selected
      return console.error('Please select a file to upload');
    }

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', cloudinary_upload_preset);

      // Upload file to Cloudinary
      const response = await axios.post(cloudinary_upload_url, uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Access the uploaded file's secure URL from Cloudinary response
      const uploadedFileUrl = response.data.secure_url;

      // Combine form data and uploaded file URL into a single object
      const finalData = { ...formData, apiLink: uploadedFileUrl };

      // Send the combined data to your backend endpoint
      const backendResponse = await axios.post('http://localhost:5000/upload', finalData);

      if (backendResponse.data.insertedId) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `upload Resource successfully `,
            showConfirmButton: false,
            timer: 1500
      })
        // Handle successful backend response (e.g., reset form, show success message)
        console.log('Data sent to backend successfully:', backendResponse.data);
      } else {
        // Handle failed backend response (e.g., display error message)
        console.error('Error sending data to backend:', backendResponse.data);
      }
    } catch (error) {
      // Handle errors gracefully (e.g., display error message)
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="border border-red-700">
      <div className="max-w-[600px] border border-black">
        <h3>Test one</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameInput" className="label">Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            placeholder="Enter your name"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={handleChange}
          />
          <label htmlFor="titleInput" className="label">Title</label>
          <input
            type="text"
            name="title"
            id="titleInput"
            placeholder="Enter your title"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={handleChange}
          />
          <label htmlFor="fileInput" className="label">Input PDF file</label>
          <input
            type="file"
            name="file"
            id="fileInput"
            className="file-input w-full max-w-xs"
          />
          <label htmlFor="courseInput" className="label">Course</label>
          <input
            type="text"
            name="course"
            id="courseInput"
            placeholder="Enter your course"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={handleChange}
          />
          <button type="submit" className="bg-red-500 py-3 px-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestOne;
