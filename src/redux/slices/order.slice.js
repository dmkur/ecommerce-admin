import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "../../services";

const initialState = {
  isFetching: false,
  error: null,
  orderStats: null,
};

const getOrderStats = createAsyncThunk(
  "orderSlice/getOrderStats",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getOrdersStats();
      console.log(data, "SLICE");
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderStats.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.orderStats = action.payload;
        state.isFetching = false;
        state.error = null;
      })
      .addDefaultCase((state, action) => {
        const [type] = action.type.split("/").splice(-1);
        if (type === "rejected") {
          state.error = action.payload;
          state.isFetching = false;
        } else {
          state.error = null;
        }
      });
  },
});

const {
  reducer: orderReducer,
  actions: {},
} = orderSlice;

const orderActions = { getOrderStats };

export { orderReducer, orderActions };
