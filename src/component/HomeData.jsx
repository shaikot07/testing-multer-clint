import axios from "axios";
const cloudinary_cloud_name = "dffbo5cwe"
const cloudinary_upload_preset = "testing_uplod"
const cloudinary_upload_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`;
// const cloudinary_upload_url = "https://api.cloudinary.com/v1_1/dffbo5cwe/upload"

const HomeData = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);

        try {
            // Upload PDF file to Cloudinary
            const cloudinaryResponse = await axios.post(cloudinary_upload_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    upload_preset: cloudinary_upload_preset
                }
            });

            // Extract the URL of the uploaded PDF file from Cloudinary response
            const pdfUrl = cloudinaryResponse.data.secure_url;
            console.log('Uploaded PDF URL:', pdfUrl);

            // Now you can include the PDF URL in the data to be sent to your backend
            formData.append('pdfUrl', pdfUrl);

            // Send form data (including PDF URL) to your backend
            // const response = await axios.post('http://localhost:5000/upload', formData);
            // console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="flex-1 justify-center">
            <div className="max-w-[600px] border border-black">
                <h2>gg</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nameInput" className="label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="nameInput"
                        placeholder="Type here"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <label htmlFor="titleInput" className="label">Title:</label>
                    <input
                        type="text"
                        id="titleInput"
                        name="title"
                        placeholder="Type title"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <label htmlFor="pdfInput" className="label">Upload PDF:</label>
                    <input
                        type="file"
                        name="pdf"
                        id="pdfInput"
                        accept=".pdf"
                        className="file-input w-full max-w-xs"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default HomeData;