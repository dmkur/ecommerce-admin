import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService, userService } from "../../services";

const initialState = {
  stats: [],
  users: [],
  isFetching: false,
  error: null,
};

const getStats = createAsyncThunk(
  "userSlice/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userService.getUsersStats();
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const getAllUsers = createAsyncThunk(
  "userSlice/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userService.getAllUsers();
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isFetching = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload.sort((a, b) => a._id - b._id);
        state.isFetching = false;
      })
      .addCase(getStats.pending, (state) => {
        state.isFetching = true;
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

const { reducer: userReducer } = userSlice;

const userActions = {
  getStats,
  getAllUsers,
};

export { userActions, userReducer };
