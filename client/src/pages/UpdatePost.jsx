import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Fierbase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try{
        const fetchPost = async () => {
            const res = await fetch(`/api/post/get/posts?postId=${postId}`)
            const data = await res.json();
            if(!res.ok){
                toast.error(data.message);
                return;
            } else if(res.ok){
                setFormData(data.posts[0]);
            }
        }
        fetchPost();
    } catch(error){
        console.log(error.message)
    }
  },[postId])

  const handleUploadImage = async () => {
    try {
      if (!file) {
        toast.error("please select an image!!");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          toast.error("image Upload failed!!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL, userid: currentUser._id });
          });
        }
      );
    } catch (error) {
      toast.error("Internal Server Error!!");
      setImageUploadProgress(null);
      console.log(error.message);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await fetch(`/api/post/update/post/${formData._id}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();

        if(!res.ok){
            toast.error(data.message);
            return;
        }
        else{
            toast.success('Post Updated Successfully!!')
            navigate(`/post/${data.slug}`)
        }
    } catch(error){
        toast.error('Internal Server Error!!');
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">javascript</option>
            <option value="MongoDB">MongoDB</option>
            <option value="reactjs">React.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something"
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost
