import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Chart } from "../../components";
import { Publish } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { orderService } from "../../services";

const Product = () => {
  const [inputs, setInputs] = useState({});
  console.log(inputs, "INPUTS");

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.productReducer.products.filter((item) => item._id === productId),
  );
  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    [],
  );

  useEffect(() => {
    const getOrderStats = async () => {
      try {
        const res = await orderService.getOrdersStats(productId);
        const data = res.data.sort((a, b) => a._id - b._id);
        data.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]),
        );
      } catch (e) {
        console.log(e);
      }
    };
    getOrderStats();
  }, [productId, MONTHS]);

  const handleClick = () => {};

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product[0].img} alt="" className="productInfoImg" />
            <span className="productName">{product[0].title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product[0]._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product[0].inStock.toString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product[0].title}
              name={"title"}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder={product[0].price}
              name={"price"}
              onChange={handleChange}
            />
            <label>Product Desc</label>
            <input
              type="text"
              placeholder={product[0].desc}
              name={"desc"}
              onChange={handleChange}
            />

            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product[0].img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export { Product };
