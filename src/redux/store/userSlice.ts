import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  name: string;
  linkedAccount: string;
  _id: string;
}

const initialState: UserState = {
  email: "",
  name: "",
  linkedAccount: "",
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.linkedAccount = action.payload.linkedAccount;
      state._id = action.payload._id;
    },
    clearUser: (state) => {
      state.email = "";
      state.name = "";
      state.linkedAccount = "";
      state._id = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
