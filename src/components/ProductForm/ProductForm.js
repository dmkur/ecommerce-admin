import "./product.css";
import { Publish } from "@mui/icons-material";
import { useForm } from "react-hook-form";


const ProductForm = ({ product, getProductData}) => {
  const { register, handleSubmit, reset } = useForm();

  const handleMainSubmit = (obj) => {
    const addParams = {};
    if (obj.picture[0] === undefined) delete obj.picture;
    for (const item in obj) {
      if (obj[item] === "") delete obj[item];
    }
    if ("categories" in obj) {
      Object.assign(addParams, { categories: obj.categories.split(",") });
      delete obj.categories;
    }
    if ("size" in obj) {
      Object.assign(addParams, { size: obj.size.split(",") });
      delete obj.size;
    }   
    getProductData({ ...obj, ...addParams })
    reset();
  };

  return (
    <div className="productWrapper">
      <form className="productForm" onSubmit={handleSubmit(handleMainSubmit)}>
        <div className="productFormLeft">
          <label>Product Name</label>
          <input
            type="text"
            placeholder={product.title}
            {...register("title")}
          />
          <label>Price</label>
          <input
            type="text"
            placeholder={product.price}
            {...register("price")}
          />
          <label>Color</label>
          <input
            type="text"
            placeholder={product.color}
            {...register("color")}
          />

          <label>Product Desc</label>
          <input
            type="text"
            placeholder={product.desc}
            name={"desc"}
            {...register("desc")}
          />

          <label>In Stock</label>
          <select id="idStock" {...register("inStock")}>
            <option value="">Choose option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="productFormMiddle">
          <label>Categories</label>
          <input
            type="text"
            placeholder={product.categories}
            {...register("categories")}
          />
          <label>Size</label>
          <input type="text" placeholder={product.size} {...register("size")} />
        </div>
        <div className="productFormRight">
          <div className="productUpload">
            <img src={product.img} alt="" className="productUploadImg" />
            <label htmlFor="file">
              <Publish />
            </label>
            <input
              {...register("picture")}
              type="file"
              id="file"
              style={{ display: "none" }}
            />
          </div>

          <button className="productButton">Update</button>
        </div>
      </form>
    </div>
  );
};
export { ProductForm };
