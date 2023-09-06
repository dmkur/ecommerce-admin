import {Link, useLocation} from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import {Publish} from "@material-ui/icons";
import {useSelector} from "react-redux";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split('/')[2]
    const product = useSelector(state => state.productReducer.products.filter(item => item._id === productId));
    console.log(product)

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
                    <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={product[0].img}
                            alt="" className="productInfoImg"/>
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
                            <span className="productInfoValue">{product[0].inStock.toString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product[0].title}/>
                        <label>Price</label>
                        <input type="text" placeholder={product[0].price}/>
                        <label>Desc</label>
                        <input type="text" placeholder={product[0].desc}/>

                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={product[0].img}
                                alt="" className="productUploadImg"/>
                            <label for="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display: "none"}}/>
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
