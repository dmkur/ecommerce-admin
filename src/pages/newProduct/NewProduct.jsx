import "./newProduct.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../fireBase";
import { productActions } from "../../redux";
import { useDispatch } from "react-redux";

const NewProduct = () => {
  const [input, setInput] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [file, setFile] = useState(null);
  console.log(file);
  const [cat, setCat] = useState([]);
  // console.log(cat);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newProduct = { ...input, img: downloadURL, categories: cat };          
          dispatch(productActions.createProduct(newProduct));
        });
      },
    );
  
        
  };

  const setUpImg = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
         <div > 
          <label>Image</label>
          <input
            type="file"
            id="file"            
            onChange={setUpImg}
          />
          </div>
          {previewImage && <div className="imgStyle">
             <img src={previewImage} alt="Selected"/>
          </div>}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            name={"title"}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description..."
            name={"desc"}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="jeans, skirts"
            name={"cat"}
            onChange={handleCategories}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="White"
            name={"color"}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="22"
            name={"price"}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select id="active" name={"inStock"} onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
};
export { NewProduct };
