import "./product.css";
import {Link, useParams} from "react-router-dom";
import {Chart} from "../../components";
import {Publish} from "@mui/icons-material";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {orderService} from "../../services";
import {productActions} from "../../redux";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import {app} from "../../fireBase";

const Product = () => {
    const {isFetching} = useSelector(state => state.productReducer);
    const [inputs, setInputs] = useState({});
    const [additionalParams, setAdditionalParams] = useState([]);
    const [file, setFile] = useState(null);

    const dispatch = useDispatch()
    const {productId} = useParams()

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
                        {name: MONTHS[item._id - 1], Sales: item.total},
                    ]),
                );
            } catch (e) {
                console.log(e);
            }
        };
        getOrderStats();
    }, [productId, MONTHS]);

    const handleClick = (e) => {
        e.preventDefault()
        const updatedObj = {...inputs, ...additionalParams}
        dispatch(productActions.updateProductById({id: productId, dataForUpdate: updatedObj}))

        // const fileName = new Date().getTime() + file.name;
        // const storage = getStorage(app);
        // const storageRef = ref(storage, fileName);
        // const uploadTask = uploadBytesResumable(storageRef, file);
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot) => {
        //         // Observe state change events such as progress, pause, and resume
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress =
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log("Upload is " + progress + "% done");
        //         switch (snapshot.state) {
        //             case "paused":
        //                 console.log("Upload is paused");
        //                 break;
        //             case "running":
        //                 console.log("Upload is running");
        //                 break;
        //             default:
        //         }
        //     },
        //     (error) => {
        //         // Handle unsuccessful uploads
        //     },
        //     () => {
        //         // Handle successful uploads on complete
        //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             const newProduct = { ...input, img: downloadURL, categories: cat };
        //             dispatch(productActions.createProduct(newProduct));
        //         });
        //     },
        // );
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const handleCategory = (e) => {

        setAdditionalParams((prev) => {
            const value = e.target.value.split(",")
            return {...prev, [e.target.name]: value}
        })
    }

    const setImg = (e) => {
        setFile(e.target.files[0]);
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
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product[0].img} alt="" className="productInfoImg"/>
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
                {isFetching ? <h3>Updating...</h3> : <form className="productForm">
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
                        <label>Color</label>
                        <input
                            type="text"
                            placeholder={product[0].color}
                            name={"color"}
                            onChange={handleChange}
                        />
                        <label>Size</label>
                        <input
                            type="text"
                            placeholder={product[0].size}
                            name={"size"}
                            onChange={handleCategory}
                        />
                        <label>Product Desc</label>
                        <input
                            type="text"
                            placeholder={product[0].desc}
                            name={"desc"}
                            onChange={handleChange}
                        />
                        <label>Categories</label>
                        <input
                            type="text"
                            placeholder={product[0].categories}
                            name={"categories"}
                            onChange={handleCategory}
                        />

                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product[0].img} alt="" className="productUploadImg"/>
                            <label htmlFor="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display: "none"}} onChange={setImg}/>
                        </div>
                        <button className="productButton" onClick={handleClick}>
                            Update
                        </button>
                    </div>
                </form>}
            </div>
        </div>
    );
};
export {Product};
