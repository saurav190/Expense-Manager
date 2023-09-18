import {createSlice} from "@reduxjs/toolkit";
interface UserDataState {
  login: string;
  signUp: { username: string; email: string; password: string }[];
  error: string | null;
}

const initialState: UserDataState = {
  login: "",
  signUp: [],
  error: null,
};

const userAuth = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginInfo: (state, action) => {
      state.login = action.payload;
    },
    logOut: (state) => {
      state.login = "";
    },
    signUpInfo: (state, action) => {
      const existingUser = state.signUp.find(
        (user) => user.email === action.payload.email
      );

      if (existingUser) {
        state.error = "Email already exists";
      } else {
        state.signUp.push(action.payload);
        state.error = null;
      }
    }
  },
});

export const { loginInfo, signUpInfo, logOut} = userAuth.actions;
export default userAuth.reducer;
