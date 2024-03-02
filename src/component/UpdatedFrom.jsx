import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const cloudinary_cloud_name = "dffbo5cwe"
const cloudinary_upload_preset = "testing_uplod"
const cloudinary_upload_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`;

const UpdatedFrom = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        // Handle form submission logic here
        const formData = new FormData();
        formData.append('pdf', data.pdf[0]);
        formData.append('upload_preset', cloudinary_upload_preset); // Set the upload preset here

        try {
            const res = await axios.post(cloudinary_upload_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                // now send the menu item data to the server with the image url
                const uploadResource = {
                    pdf: res.data.secure_url,
                    teacherName: data.teacherName,
                    teacherEmail: data.teacherEmail,
                    title: data.title,
                    courseName: data.courseName
                }
                // send data database here 
                const articleRes = await axios.post('http://localhost:5000/upload', uploadResource);
                if (articleRes.data.insertedId) {
                    // show success popup 
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `pdf is added to successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            // Handle errors gracefully (e.g., display error message)
            console.error('Upload error:', error);
        }
        console.log(data);
    };

    return (
        <div>
            <h2 className="text-3xl text-center"> this is aaaaaaaa updated from</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="nameInput" className="label">Name</label>
                    <input
                        type="text"
                        name="teacherName"
                        id="nameInput"
                        placeholder="Enter your name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        {...register("teacherName")}
                    />
                    <label htmlFor="Input email" className="label">Email</label>
                    <input
                        type="email"
                        name="teacher"
                        id="nameInput"
                        placeholder="Enter your name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        {...register("teacherEmail")}
                    />
                    <label htmlFor="titleInput" className="label">Title</label>
                    <input
                        type="text"
                        id="titleInput"
                        name="title"
                        placeholder="Enter Your Title"
                        className="input input-bordered input-primary w-full max-w-xs"
                        {...register("title")}
                    />
                    <label htmlFor="fileInput" className="label">Input PDF file</label>
                    <input
                        type="file"
                        name="pdf"
                        id="fileInput"
                        className="file-input w-full max-w-xs"
                        {...register("pdf")}
                    />
                    <label htmlFor="courseInput" className="label">Course Name</label>
                    <input
                        type="text"
                        id="courseInput"
                        name="courseName"
                        placeholder="Enter Your Course name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        {...register("courseName")}
                    />
                    <button type="submit" className="bg-red-500 py-3 px-2">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatedFrom;