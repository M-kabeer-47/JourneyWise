import fetchUserFromClient from "@/hooks/fetchUserFromClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/lib/types/user";

const fetchUser = createAsyncThunk("/fetchUser", async () => {
  const userData = await fetchUserFromClient();
  if (userData) {
    return {
      ...userData,
      createdAt: userData.createdAt.toISOString(),
      updatedAt: userData.updatedAt.toISOString(),
    }
  }
  return null;
})

type UserState = {
  user: User | null;
  isLoading: boolean;
  isError: string;
};

const initialUserState: UserState = {
  user: null,
  isLoading: true,
  isError: ""
};

let user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isError = "";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = "Failed to fetch user";
    });
  }
});

export const { setUser, clearUser, updateUser } = user.actions;
export { fetchUser }
export default user.reducer;
