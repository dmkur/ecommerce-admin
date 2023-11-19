import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productService} from "../../services";

const initialState = {
    products: [],
    isFetching: false,
    error: null,
    productForUpdate: null,
}

const createProduct = createAsyncThunk(
    'productSlice/createProduct',
    async (newProduct, {rejectWithValue}) => {
        try {
            const {data} = await productService.cerate(newProduct);
            console.log(data,'SLICE')
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await productService.getAllProducts();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const updateProductById = createAsyncThunk(
    'productSlice/updateProductById',
    async ({productId, productForUpdate}, {rejectWithValue}) => {
        try {
            const {data} = await productService.updateById(productId, productForUpdate);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const deleteProductById = createAsyncThunk(
    'productSlice/deleteProductById',
    async (id, {rejectWithValue}) => {
        try {
            await productService.deleteById(id);
            return id
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProductData: (state, action)=>{            
                state.productForUpdate = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
                state.isFetching = false
            })
            .addCase(createProduct.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.isFetching = false
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isFetching = true
            })
            .addCase(updateProductById.fulfilled, (state, action) => {
                const index = state.products.findIndex(item => item._id === action.payload._id);
                state.products[index] = action.payload
                state.productForUpdate = null

                state.isFetching = false
                
            })
            .addCase(updateProductById.pending, (state) => {
                state.isFetching = true
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                const index = state.products.findIndex(item => item._id === action.payload);

                state.products.splice(index, 1)

                state.isFetching = false
            })
            .addCase(deleteProductById.pending, (state) => {
                state.isFetching = true
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);

                if (type === 'rejected') {
                    state.error = action.payload
                    state.isFetching = false
                } else {
                    state.error = null
                }
            })
    }
});

const {reducer: productReducer, actions:{setProductData}} = productSlice;

const productActions = {
    getAllProducts,
    deleteProductById,
    createProduct,
    updateProductById,
    setProductData
}


export {productActions, productReducer}
