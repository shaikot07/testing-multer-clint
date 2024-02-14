import axios from 'axios';
const cloudinary_cloud_name = "dffbo5cwe"
const cloudinary_upload_preset = "testing_uplod"
const cloudinary_upload_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`;
const NewFrom = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = e.target.elements.file.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinary_upload_preset);

        try {
            const response = await axios.post(cloudinary_upload_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const apiLink = response.data.secure_url;
            console.log('Uploaded successfully:', apiLink);
            // Send the apiLink to your backend endpoint
            await axios.post('http://localhost:5000/upload', { apiLink });
        } catch (error) {
            // Handle errors gracefully (e.g., display error message)
            console.error('Upload error:', error);
        }


    };
    return (
        <div className="mx-w-[800] mx-auto">
            <div className="max-w-[600px] border border-black">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nameInput" className="label">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="nameInput"
                        placeholder="Enter your name"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <label htmlFor="titleInput" className="label">Title </label>
                    <input
                        type="text"
                        id="titleInput"
                        name="title"
                        placeholder="Inter Your Title"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <label htmlFor="fileInput" className="label">Input PDF file</label>
                    <input
                        type="file"
                        name="file"
                        id="fileInput"
                        className="file-input w-full max-w-xs"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewFrom;