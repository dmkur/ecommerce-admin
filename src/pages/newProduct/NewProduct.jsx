import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../fireBase";
import { productActions } from "../../redux";
import { useDispatch } from "react-redux";
import { ProductForm } from "../../components";

const NewProduct = () => {
  const dispatch = useDispatch();

  const getProductData = (data) => {
    if (data.picture) {
      const fileName = new Date().getTime() + data.picture[0].name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, data.picture[0]);

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
            const newProduct = { ...data, img: downloadURL };
            dispatch(productActions.createProduct(newProduct));
            // console.log(newProduct,"SOP");
          });
        },
      );
    } else {
      dispatch(productActions.createProduct({ newProduct: data }));
      // console.log(data,"SOP2");
    }
  };

  return (
    <div className="newProduct">
      {/* <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <div>
            <label>Image</label>
            <input type="file" id="file" onChange={setUpImg} />
          </div>
          {previewImage && (
            <div className="imgStyle">
              <img src={previewImage} alt="Selected" />
            </div>
          )}
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
       */}
      <ProductForm getProductData={getProductData} />
    </div>
  );
};
export { NewProduct };
