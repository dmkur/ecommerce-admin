import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productService, userService} from "../../services";

const initialState = {
    stats: [],
    isFetching: false,
    error: null
}

const getStats = createAsyncThunk(
    'userSlice/getStats',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUsersStats();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStats.fulfilled, (state, action) => {
                state.stats = action.payload.sort((a, b) => a._id - b._id)
                state.isFetching = false
            })
            .addCase(getStats.pending, (state) => {
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

const {reducer: userReducer} = userSlice;

const userActions = {
    getStats
}


export {userActions, userReducer}
