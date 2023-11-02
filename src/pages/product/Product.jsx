import "./product.css";
import { Link, useParams } from "react-router-dom";
import { Chart, ProductForm } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { orderService, uploadPicture } from "../../services";
import { productActions } from "../../redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../fireBase";

const Product = () => {
  const { productId } = useParams();

  const { isFetching, products } = useSelector((state) => state.productReducer);
  const product = products.filter((item) => item._id === productId);

  const [productForUpdate, setProductForUpdate] = useState({});
  const [picture, setPicture] = useState(null);
  const [isPictureDownload, setIsPictureDownload] = useState(false);

  const dispatch = useDispatch();
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

  useEffect(() => {
    if (picture) {
      // const fileName = new Date().getTime() + picture.name;
      // const storage = getStorage(app);
      // const storageRef = ref(storage, fileName);
      // const uploadTask = uploadBytesResumable(storageRef, picture);

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     // Observe state change events such as progress, pause, and resume
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     setIsPictureDownload(!isPictureDownload)
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case "paused":
      //         console.log("Upload is paused");
      //         break;
      //       case "running":
      //         console.log("Upload is running");
      //         break;
      //       default:
      //     }
      //   },
      //   (error) => {
      //     // Handle unsuccessful uploads
      //   },
      //   () => {
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       const newProduct = { ...productForUpdate, img: downloadURL};           
      //       dispatch(productActions.updateProductById({ productId, productForUpdate:newProduct }));
      //       setIsPictureDownload(!isPictureDownload)
      //     });
      //   },
      // );
      uploadPicture(picture)
    
    } else {
      dispatch(productActions.updateProductById({ productId, productForUpdate }));      
    }
  }, [productForUpdate]);

  const getProductData = (data) => {
    // console.log(data.picture);
    if (data.picture) {
      setPicture(data.picture[0]);
      setProductForUpdate(data);
    } else {
      setProductForUpdate(data);
    }
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
      {(isFetching ) ? (
        <h3>Loading...</h3>
      ) : (
        <ProductForm product={product[0]} getProductData={getProductData} />
      )}
    </div>
  );
};
export { Product };
