import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";

import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../redux";


const ProductList = () => {
    const {products} = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, [])

    const handleDelete = (id) => {
        dispatch(productActions.deleteProductById(id))
    };

    const columns = [
        {field: "_id", headerName: "ID", width: 220},
        {field: "product", headerName: "Product", width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt=""/>
                        {params.row.title}
                    </div>
                );
            },
        },
        {field: "inStock", headerName: "Stock", width: 200},
        {field: "price", headerName: "Price", width: 120},
        {
            field: "action", headerName: "Action", width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <Link to="/newproduct" >
          <button className="productAddButton">Create</button>
        </Link>
            <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
export {ProductList}
