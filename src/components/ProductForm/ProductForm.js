import "./product.css";
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { orderService } from "../../services";
import { productActions } from "../../redux";
import { useForm } from "react-hook-form";

const ProductForm = () => {
  const { register, handleSubmit } = useForm();
  const { isFetching } = useSelector((state) => state.productReducer);
  const [inputs, setInputs] = useState({});
  console.log(inputs,"INPUTS")
  const [additionalParams, setAdditionalParams] = useState([]);

  const dispatch = useDispatch();
  const productId = "64d900e73aae0ec1e8d3ec55";

  const product = useSelector((state) =>
    state.productReducer.products.filter((item) => item._id === productId),
  );

  useEffect(() => {
    const getOrderStats = async () => {
      try {
        const res = await orderService.getOrdersStats(productId);
      } catch (e) {
        console.log(e);
      }
    };
    getOrderStats();
  }, [productId]);

  const handleClick = (e) => {
    e.preventDefault();
    const updatedObj = { ...inputs, ...additionalParams };
    dispatch(
      productActions.updateProductById({
        id: productId,
        dataForUpdate: updatedObj,
      }),
    );
  };

  const handleMainSubmit = (e) => {
    console.log(e,"OBJ")
    

    // setInputs((prev) => {
    //   return { ...prev, [e.target.name]: e.target.value };
    // });
  };

//   const handleAdditionalSubmit = (e) => {
//     setAdditionalParams((prev) => {
//       const value = e.target.value.split(",");
//       return { ...prev, [e.target.name]: value };
//     });
//   };

  return (
    <div className="product">
      <div className="productBottom">
        {isFetching ? (
          <h3>Updating...</h3>
        ) : (
          <form
            className="productForm"
            onSubmit={handleSubmit(handleMainSubmit)}
          >
            <div className="productFormLeft">
              <label>Product Name</label>
              <input
                type="text"
                placeholder={product[0].title}
                {...register("title")}
              />
              <label>Price</label>
              <input
                type="text"
                placeholder={product[0].price}
                {...register("price")}
              />
              <label>Color</label>
              <input
                type="text"
                placeholder={product[0].color}
                {...register("color")}
              />

              <label>Product Desc</label>
              <input
                type="text"
                placeholder={product[0].desc}
                name={"desc"}
                {...register("desc")}
              />

              <label>In Stock</label>
              <select id="idStock" {...register("inStock")}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="productFormRight">
              <div className="productUpload">
                <img src={product[0].img} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="productButton">
                Update
              </button>
            </div>
          </form>
        )}
        {/* <form onSubmit={handleSubmit(handleAdditionalSubmit)}>
          <div className="productFormLeft">
            <label>Categories</label>
            <input
              type="text"
              placeholder={product[0].categories}
              {...register("categories")}
            />
            <label>Size</label>
            <input
              type="text"
              placeholder={product[0].size}
              {...register("size")}
            />
          </div>
        </form> */}
      </div>
    </div>
  );
};
export { ProductForm };
