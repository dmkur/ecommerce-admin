import "./product.css";
import { Link, useParams } from "react-router-dom";
import { Chart, ProductForm } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { orderService } from "../../services";
import { productActions } from "../../redux";


const Product = () => {
  const { isFetching, productForUpdate } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const { productId } = useParams();

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
    if(productForUpdate) {      
      dispatch(productActions.updateProductById({id:productId, dataForUpdate:productForUpdate}))      
    } else {
      const getOrderStats = async () => {       
        try {
          // dispatch(orderActions.getOrderStats())
          const res = await orderService.getOrdersStats({pid:productId});                
          const data = res.data.sort((a, b) => a._id - b._id);       
          // console.log(data,"LOL");    
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
    }

    
  }, [productId, productForUpdate]);

  const getProductData = (data)=>{
    console.log(data, "data from child");
  }

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
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <ProductForm product={product[0]} getProductData={getProductData}/>
      )}
    </div>
  );
};
export { Product };
